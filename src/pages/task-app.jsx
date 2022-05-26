import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadBoards } from "../store/board/board.action"
import { MainBoard } from '../cmps/main-board.jsx'
import { SideNav } from '../cmps/side-nav.jsx'
import { BoardNav } from "../cmps/board-nav"
import { saveTask } from '../store/task/task.action'
import { saveGroup } from "../store/group/group.action"
import { groupService } from "../services/group.service"
import { BoardHeader } from "../cmps/board-header"
import { saveBoard } from '../store/board/board.action'
import { ExtendedSideNav } from '../cmps/extended-side-nav.jsx'
import { taskService } from "../services/task.service"
import { boardService } from "../services/board.service"
import { useNavigate, useParams } from "react-router-dom"


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
        const newTask = taskService.getEmptyTask()
        newTask.title = task.title
        let currGroup = await groupService.getById(groupId)
        console.log('curr', currGroup)
        // boards[0].groups.forEach(group => {
        board.groups.forEach(group => {
            console.log('group', group)
            // boards[0].groups.forEach(group => {
            if (group.id === currGroup.id) {
                group.tasks.push(newTask)
            }

        })
        // dispatch(saveBoard(boards[0]))
        dispatch(saveBoard(board))
    }

    const onAddGroup = (group) => {
        board.groups.push(group)
        // boards[0].groups.push(group)
        dispatch(saveBoard(board))
        // dispatch(saveBoard(boards[0]))
    }

    const onAddBoard = (board) => {
        console.log(board)
        const newBoard = boardService.getEmptyBoard()
        newBoard.title = board.title
        dispatch(saveBoard(newBoard))
    }


    if (!boards.length) return <h1>Loading...</h1>
    return <section className="task-main-container">
        <div className="board-container-left">
            <SideNav />
        </div>
        <div className="board-container-right">
            <ExtendedSideNav boards={boards} onAddBoard={onAddBoard} />
            <div className="main-app flex-column">
                <BoardHeader onAddTask={onAddTask} onAddGroup={onAddGroup} board={board} />
                <MainBoard board={board} onAddTask={onAddTask} />
            </div>
        </div>
    </section>
}