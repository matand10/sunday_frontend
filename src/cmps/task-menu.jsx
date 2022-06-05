import { AiOutlineUserAdd } from "react-icons/ai";
import { BsGraphUp, BsTrash } from "react-icons/bs";
import React from "react"

export const TaskMenu = ({ arrowTask, statusRef, removeTask, setUpdateIsClick, task, board, setArrowTask }) => {

    const onRemoveTask = (event, taskId, groupId) => {
        removeTask(taskId, groupId)
    }

    const onChangeTaskTitle = (groupId) => {
        setUpdateIsClick({ task, groupId, boardId: board._id })
        setArrowTask({})
    }

    return <section ref={statusRef} className="task-arrow-modal">
        <div className="task-arrow">
            <div className="task-menu-item">
                <div className="task-content-wrapper" onClick={(ev) => onChangeTaskTitle(arrowTask.groupId)}>
                    <div className="task-icon"><AiOutlineUserAdd /></div>
                    <div className="task-title">Rename item</div>
                </div>
                <div className="task-content-wrapper" onClick={(event) => onRemoveTask(event, arrowTask.taskId, arrowTask.groupId)}>
                    <div className="task-icon"><BsTrash /></div>
                    <div className="task-title">Delete</div>
                </div>
            </div>
        </div>
    </section>

}