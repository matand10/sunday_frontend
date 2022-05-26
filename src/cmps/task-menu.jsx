import { AiOutlineUserAdd } from "react-icons/ai";
import { BsGraphUp, BsTrash } from "react-icons/bs";
import React from "react"

// export const TaskMenu = ({  task, menuRef }) => {
export const TaskMenu = ({ arrowTask, menuRef, onOpenMenu }) => {

    // const deleteTask = (taskId) => {
    const deleteTask = () => {
        console.log(arrowTask);
    }


    return <React.Fragment>
        <section style={{ width: '100%' }} ref={menuRef} className="task-main-menu-inner">
            <div className="task-main-section">
                <div className="task-menu-item">
                    <div className="task-content-wrapper">
                        <div className="task-icon"><AiOutlineUserAdd /></div>
                        <div className="task-title">Rename item</div>
                    </div>
                    {/* <div className="group-content-wrapper" onClick={() => deleteTask(task.id)}> */}
                    <div className="group-content-wrapper" onClick={() => deleteTask()}>
                        <div className="group-icon"><BsTrash /></div>
                        <div className="group-title">Delete</div>
                    </div>
                </div>
            </div>
        </section>
    </React.Fragment>
}