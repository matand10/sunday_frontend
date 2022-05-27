import { BsChat } from 'react-icons/bs';
import { utilService } from "../services/util.service";
import { FaChevronCircleDown, FaCaretDown } from 'react-icons/fa'
import { useState } from 'react';
import { TaskMenu } from './task-menu';

export const TasksList = ({ task, backgroundColor, onHandleRightClick, menuRef, group, board, removeTask }) => {
    const [arrowTask, setArrowTask] = useState({})


    const onOpenMenu = (params) => {
        setArrowTask(params)
    }

    return <section className="task-row-component" onContextMenu={(ev) => onHandleRightClick(ev, task, true)} ref={menuRef}>
        <div className="task-row-wrapper">
            <div className="task-row-title">
                <div className="task-title-cell-component">
                    <div className="task-arrow-div" onClick={(event) => onOpenMenu({ taskId: task.id, groupId: group.id, board: board })} ><FaCaretDown className="task-arrow" /></div>
                    <div className="left-indicator-cell" style={{ backgroundColor }}></div>
                    <div className="task-title-cell">{task.title}</div>
                </div>
                <div className="task-row-items">
                    <div className="flex-row-items">{task.assignedTo.map(user => user.fullname)}</div>
                    <div className="flex-row-items status" style={{ backgroundColor: task.status.color }}>{task.status.title}</div>
                    <div className="flex-row-items">{utilService.getCurrTime(task.archivedAt)}</div>
                </div>
            </div>
        </div>
        {arrowTask.board && arrowTask.groupId === group.id && arrowTask.taskId === task.id && <TaskMenu removeTask={removeTask} arrowTask={arrowTask} onOpenMenu={onOpenMenu} />}
    </section>
}