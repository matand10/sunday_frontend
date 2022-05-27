import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadBoards, setFilter } from "../store/board/board.action"
import { MainBoard } from '../cmps/main-board.jsx'
import { SideNav } from '../cmps/side-nav.jsx'
import { saveTask } from '../store/task/task.action'
import { BoardHeader } from "../cmps/board-header"
import { saveBoard, removeBoard } from '../store/board/board.action'
import { ExtendedSideNav } from '../cmps/extended-side-nav.jsx'
import { taskService } from "../services/task.service"
import { boardService } from "../services/board.service"
import { useNavigate, useParams } from "react-router-dom"


export const TasksApp = () => {
    const params = useParams()
    const [board, setBoard] = useState(null)

    const { boards } = useSelector((storeState) => storeState.boardModule)
    const { filterBy } = useSelector((storeState) => storeState.boardModule)
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
    }, [params.boardId, filterBy])

    const loadBoard = async () => {
        const board = await boardService.getById(params.boardId)
        const filteredBoard = boardService.filterBoard(board, filterBy)
        setBoard(filteredBoard)
    }

    const onAddTask = async (board, task, groupId) => {
        const newBoard = await taskService.addTask(board, task, groupId)
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
        navigate(`/board/${newBoard._id}`)
    }

    const onDeleteBoard = (boardId) => {
        dispatch(removeBoard(boardId))
        navigate(`/board`)
    }

    const updateBoard = (board) => {
        dispatch(saveBoard(board))
    }

    const onRemoveGroup = (groupId) => {
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        board.groups.splice(groupIdx, 1)
        dispatch(saveBoard(board))
    }

    const updateTask = (updateTask, groupId, board) => {
        const newBoard = boardService.taskUpdate(updateTask, groupId, board)
        dispatch(saveBoard(newBoard))
    }

    const updateGroup = (updatedGroup, board) => {
        const newBoard = boardService.groupUpdate(updatedGroup, board)
        dispatch(saveBoard(newBoard))

    }

    const onFilter = (filterBy) => {
        dispatch(setFilter(filterBy))
    }

    const openBoard = (board) => {
        setBoard(board)
        navigate(board._id)
    }

    const removeTask = (taskId, groupId) => {
        const newBoard = { ...board }
        const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)
        const taskIdx = newBoard.groups[groupIdx].tasks.findIndex(task => task.id === taskId)
        console.log(taskIdx);
        newBoard.groups[groupIdx].tasks.splice(taskIdx, 1)
        console.log(newBoard);
        dispatch(saveBoard(newBoard))
    }

    if (!boards.length) return <h1>Loading...</h1>
    return <section className="task-main-container">
        <div className="board-container-left">
            <SideNav />
        </div>
        <div className="board-container-right">
            <ExtendedSideNav updateBoard={updateBoard} openBoard={openBoard} boards={boards} onAddBoard={onAddBoard} onDeleteBoard={onDeleteBoard} />
            <div className="main-app flex-column">
                <BoardHeader onFilter={onFilter} onAddTask={onAddTask} onAddGroup={onAddGroup} board={board} />
                <MainBoard board={board} removeTask={removeTask} onAddTask={onAddTask} onRemoveGroup={onRemoveGroup} updateTask={updateTask} updateGroup={updateGroup} />
                {/* <MainBoard removeTask={removeTask} board={board} onAddTask={onAddTask} onRemoveGroup={onRemoveGroup} updateTask={updateTask} /> */}
            </div>
        </div>
    </section>

}