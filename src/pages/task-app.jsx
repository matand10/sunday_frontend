import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadBoards, setFilter } from "../store/board/board.action"
import { MainBoard } from '../cmps/main-board.jsx'
import { SideNav } from '../cmps/side-nav.jsx'
import { BoardHeader } from "../cmps/board-header"
import { saveBoard, removeBoard } from '../store/board/board.action'
import { ExtendedSideNav } from '../cmps/extended-side-nav.jsx'
import { taskService } from "../services/task.service"
import { boardService } from "../services/board.service"
import { useNavigate, useParams } from "react-router-dom"
import {KanbanBoard} from '../cmps/kanban-board'
import { Route, Routes, BrowserRouter,Outlet } from 'react-router-dom'

export const TasksApp = () => {
    // const params = useParams()
    const [board, setBoard] = useState(null)
    const { boards } = useSelector((storeState) => storeState.boardModule)
    const { filterBy } = useSelector((storeState) => storeState.boardModule)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { boardId } = useParams()

    useEffect(() => {
        dispatch(loadBoards())
        if (boardId) if (boardService.isIdOk(boardId, boards)) {
            navigate('/board')
        } else {
            setBoard(activateBoard())
        }
    }, [])

    const activateBoard = async () => {
        const board = await boardService.getById(boardId)
        return board
    }

    useEffect(() => {
        if (!board) loadBoard()
    }, [boardId, filterBy])


    useEffect(() => {
        if (!boardId) {
            if (board) {
                // boardId = board._id
                navigate(`/board/${board._id}`)
            }
            else {
                makeBoard()
            }
        }
    }, [boards, board])

    const makeBoard = async () => {
        let firstBoard
        if (boards.length === 0) firstBoard = await boardService.makeBoard()
        else if (boards.length > 0) firstBoard = boards[0]
        setBoard(firstBoard)
    }

    const loadBoard = async () => {
        const board = await boardService.getById(boardId)
        const filteredBoard = boardService.filterBoard(board, filterBy)
        setBoard(filteredBoard)
    }

    const onAddTask = async (task, groupId) => {
        const newBoard = await taskService.addTask(board, task, groupId)
        dispatch(saveBoard(newBoard))
    }

    const onAddGroup = (group) => {
        board.groups.push(group)
        dispatch(saveBoard(board))
    }

    const onAddBoard = async (board) => {
        let newBoard = await boardService.makeBoard()
        newBoard.title = board.title
        dispatch(saveBoard(newBoard))
        // navigate(`/board/${newBoard._id}`)
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

    // const updateTask = (updateTask, groupId, board) => {
    const updateTask = (updateTask, groupId) => {
        const newBoard = boardService.taskUpdate(updateTask, groupId, board)
        dispatch(saveBoard(newBoard))
    }

    const updateGroup = (newdGroup) => {
        const newBoard = boardService.groupUpdate(newdGroup, board)
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
        newBoard.groups[groupIdx].tasks.splice(taskIdx, 1)
        dispatch(saveBoard(newBoard))
    }

    const updateTaskDate = (updateDate, groupId, board) => {
        const newBoard = boardService.taskUpdate(updateDate, groupId, board)
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
                <Outlet context={{board ,removeTask, onAddTask ,onRemoveGroup, updateTask ,updateGroup ,updateTaskDate}} />
                {/* <MainBoard board={board} removeTask={removeTask} onAddTask={onAddTask} onRemoveGroup={onRemoveGroup} updateTask={updateTask} updateGroup={updateGroup} updateTaskDate={updateTaskDate} />
                <KanbanBoard/> */}
                {/* <Routes>
                <Route path="Table" component={MainBoard} board={board} removeTask={removeTask} onAddTask={onAddTask} onRemoveGroup={onRemoveGroup} updateTask={updateTask} updateGroup={updateGroup} updateTaskDate={updateTaskDate} />
                <Route path="Kanban" component={KanbanBoard} />
                </Routes> */}
            </div>
        </div>
    </section>

}