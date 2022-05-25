import { useEffect } from "react"
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



export const TasksApp = () => {
    const { boards } = useSelector((storeState) => storeState.boardModule)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadBoards())
    }, [])

    const onAddTask = async (task, groupId) => {
        const newTask = taskService.getEmptyTask()
        newTask.title = task.title
        let currGroup = await groupService.getById(groupId)
        boards[0].groups.forEach(group => {
            if (group.id === currGroup.id) {
                group.tasks.push(newTask)
            }
        })
        dispatch(saveBoard(boards[0]))
    }

    const onAddGroup = (group) => {
        boards[0].groups.push(group)
        dispatch(saveBoard(boards[0]))
    }

    const onAddBoard = (board) => {
        console.log(board)
        // const newBoa
        // dispatch(saveBoard(board))
    }


    if (!boards.length) return <h1>Loading...</h1>

    return <section className="task-main-container">
        <div className="board-container-left">
            <SideNav />
        </div>
        <div className="board-container-right">



            <ExtendedSideNav boards={boards} onAddBoard={onAddBoard} />


            <div className="main-app flex-column">
                <BoardHeader onAddTask={onAddTask} onAddGroup={onAddGroup} board={boards[0]} />
                <MainBoard board={boards[0]} onAddTask={onAddTask} />
            </div>
        </div>
    </section>
}