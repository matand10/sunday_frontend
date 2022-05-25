import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadBoards } from "../store/board/board.action"
import { MainBoard } from '../cmps/main-board.jsx'
import { SideNav } from '../cmps/side-nav.jsx'
import { BoardNav } from "../cmps/board-nav"
import { saveTask } from '../store/task/task.action'
import { saveGroup } from "../store/group/group.action"
import { groupService } from "../services/group.service"

import { ExtendedSideNav } from '../cmps/extended-side-nav.jsx'



export const TasksApp = () => {
    const { boards } = useSelector((storeState) => storeState.boardModule)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadBoards())
    }, [])

    const onAddTask = () => {
        dispatch(saveTask())
    }

    const onAddGroup = (group) => {
        
        console.log('from front',group)
        dispatch(saveGroup(group))
    }


    if (!boards.length) return <h1>Loading...</h1>

    return <section className="task-main-container">
        <div className="board-container-left">
            <SideNav />
        </div>
        <div className="board-container-right">
            <ExtendedSideNav />
            {/* Header */}
            <BoardNav onAddTask={onAddTask} onAddGroup={onAddGroup} />
            {/* filter */}
            <MainBoard board={boards[0]} />
        </div>
    </section>
}