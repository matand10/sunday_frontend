import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadBoards } from "../store/board/board.action"
import { MainBoard } from '../cmps/main-board.jsx'
import { SideNav } from '../cmps/side-nav.jsx'
import { BoardNav } from "../cmps/board-nav"
import { saveTask } from '../store/task/task.action'
import { groupService } from "../services/group.service"
import { BoardHeader } from "../cmps/board-header"
import { saveBoard } from '../store/board/board.action'
import { ExtendedSideNav } from '../cmps/extended-side-nav.jsx'
import { taskService } from "../services/task.service"
import { boardService } from "../services/board.service"
import { useNavigate, useParams } from "react-router-dom"
import { removeGroup } from '../store/group/group.action'


export const TasksApp = () => {
    const params = useParams()
    const [board, setBoard] = useState(null)

    const { boards } = useSelector((storeState) => storeState.boardModule)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    let { boardId } = useParams()
    if (!boardId && boards.length) {
        boardId = boards[0]._id
        navigate(boardId)
    }

    useEffect(() => {
        loadBoard()
        dispatch(loadBoards())

    }, [params.boardId])


    const loadBoard = async () => {
        const board = await boardService.getById(params.boardId)
        setBoard(board)
    }

    const onAddTask = async (task, groupId) => {
        const newBoard = { ...board }
        const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)
        const newTask = taskService.getEmptyTask()
        newTask.title = task.title
        newBoard.groups[groupIdx].tasks.push(newTask)
        dispatch(saveBoard(newBoard))
    }

    const onAddGroup = (group) => {
        board.groups.push(group)
        dispatch(saveBoard(board))
    }

    const onAddBoard = (board) => {
        const newBoard = boardService.getEmptyBoard()
        newBoard.title = board.title
        dispatch(saveBoard(newBoard))
    }

    const onRemoveGroup = (groupId) => {
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        board.groups.splice(groupIdx,1)
        dispatch(saveBoard(board))
    }

    const updateTask = (value, task, groupId, boardId) => {
        task.title = value
        dispatch(saveTask(task, groupId, boardId))
    }

    console.log(boards);

    if (!boards.length) return <h1>Loading...</h1>
    return <section className="task-main-container">
        <div className="board-container-left">
            <SideNav />
        </div>
        <div className="board-container-right">
            <ExtendedSideNav boards={boards} onAddBoard={onAddBoard} />
            <div className="main-app flex-column">
                <BoardHeader onAddTask={onAddTask} onAddGroup={onAddGroup} board={board} />
                <MainBoard board={board} onAddTask={onAddTask} onRemoveGroup={onRemoveGroup} updateTask={updateTask} />
            </div>
        </div>
    </section>
}