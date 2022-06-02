import { AiOutlineUserAdd } from "react-icons/ai";
import { BsGraphUp, BsTrash } from "react-icons/bs";
import React from "react"

export const TaskMenu = ({ arrowTask, statusRef, onOpenMenu, removeTask }) => {

    // const deleteTask = (ev) => {
    //     ev.preventDefault()
    //     console.log('hey');
    //     removeTask(arrowTask.taskId, arrowTask.groupId)
    // }


    return <React.Fragment>
        <section ref={statusRef} className="task-main-menu-inner">
            <div className="task-main-section">
                <div className="task-menu-item">
                    <div className="task-content-wrapper">
                        <div className="task-icon"><AiOutlineUserAdd /></div>
                        <div className="task-title">Rename item</div>
                    </div>
                    {/* <div className="group-content-wrapper" onClick={() => deleteTask(task.id)}> */}
                    <div className="task-content-wrapper" onClick={() => removeTask(arrowTask.taskId, arrowTask.groupId)}>
                        <div className="task-icon"><BsTrash /></div>
                        <div className="task-title">Delete</div>
                    </div>
                </div>
            </div>
        </section>
    </React.Fragment>
}