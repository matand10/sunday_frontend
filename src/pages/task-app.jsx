import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadBoards, setFilter } from "../store/board/board.action"
import { SideNav } from '../cmps/side-nav.jsx'
import { BoardHeader } from "../cmps/board-header"
import { saveBoard, removeBoard } from '../store/board/board.action'
import { ExtendedSideNav } from '../cmps/extended-side-nav.jsx'
import { taskService } from "../services/task.service"
import { boardService } from "../services/board.service"
import { useNavigate, useParams } from "react-router-dom"
import { Outlet } from 'react-router-dom'

export const TasksApp = () => {
    const [board, setBoard] = useState(null)
    const { boards } = useSelector((storeState) => storeState.boardModule)
    const { filterBy } = useSelector((storeState) => storeState.boardModule)
    const [isMake, setIsMake] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { boardId } = useParams()

    useEffect(() => {
        if (board) {
            return
        }

        if (boards.length === 0) {
            setIsMake(true)
        } else {
            if (boards.length > 0) {
                if (boardId) {
                    if (boardService.isIdOk(boardId, boards)) {
                        loadBoard()
                        return
                    }
                    if (boards[0]._id) window.location.href = `/board/${boards[0]._id}`
                    else if (boards[0].length > 0) window.location.href = `/board/${boards[0]}`
                } else window.location.href = `/board/${boards[0]._id}`
            }
        }
    }, [boards])

    useEffect(() => {
        if (isMake) {
            makeBoard()
        }
    }, [isMake])

    useEffect(() => {

        dispatch(loadBoards())

    }, [])

    const activateBoard = async () => {
        const board = await boardService.getById(boardId)
        return board
    }

    // useEffect(() => {
    //     if (!board) loadBoard()
    // }, [boardId, filterBy])


    // useEffect(() => {
    //     if (!boardId) {
    //         if (board) {
    //             // boardId = board._id
    //             navigate(`/board/${board._id}`)
    //         }
    //         else {
    //             makeBoard()
    //         }
    //     }
    // }, [boards, board])

    const makeBoard = async () => {
        console.log('make');
        const firstBoard = await boardService.makeBoard()
        // setBoard(firstBoard)
        dispatch(saveBoard(firstBoard))
    }

    const loadBoard = async () => {
        const currBoard = await boardService.getById(boardId)
        const filteredBoard = boardService.filterBoard(currBoard, filterBy)
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
        let newBoard = boardService.makeBoard()
        newBoard.title = board.title
        newBoard._id = await boardService.save(newBoard)
        dispatch(saveBoard(newBoard))
        console.log(newBoard);
        window.location.href = `/board/${newBoard._id}`
    }

    const onDeleteBoard = (boardId) => {
        dispatch(removeBoard(boardId))
        window.location.href = `/board`
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

    const boardChange = (board) => {
        setBoard(board)
        navigate(`/board/${board._id}`)
    }


    if (!boards.length) return <h1>Loading...</h1>
    return <section className="task-main-container">
        <div className="board-container-left">
            <SideNav />
        </div>
        <div className="board-container-right">
            <ExtendedSideNav boardChange={boardChange} updateBoard={updateBoard} openBoard={openBoard} boards={boards} onAddBoard={onAddBoard} onDeleteBoard={onDeleteBoard} />
            <div className="main-app flex-column">
                <BoardHeader onFilter={onFilter} onAddTask={onAddTask} onAddGroup={onAddGroup} board={board} />
                <Outlet context={{ board, removeTask, onAddTask, onRemoveGroup, updateTask, updateGroup, updateTaskDate }} />
            </div>
        </div>
    </section>

}