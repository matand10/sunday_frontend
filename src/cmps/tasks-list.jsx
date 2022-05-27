
import { utilService } from "../services/util.service";
import { useEffect, useState } from 'react';

export const TasksList = ({ task, backgroundColor, onHandleRightClick, menuRef, onOpenModal, updateTask, group, board }) => {
    const [updateIsClick, setUpdateIsClick] = useState({})
    const [taskUpdate, setTaskUpdate] = useState(task)

    useEffect(() => {
        updateTask(taskUpdate, group.id,board)
        setUpdateIsClick({})
        
    }, [taskUpdate])
    
    const handleChange = ({ target }) => {
        document.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault()
                const value = target.value
                const field = target.name
                setTaskUpdate((prevTask) => ({ ...prevTask, [field]: value }))
            }
        })
    }

    const onUpdateTask = (ev, params) => {
        ev.stopPropagation()
        setUpdateIsClick(params)
    }

    return <section className="task-row-component" onContextMenu={(ev) => onHandleRightClick(ev, task, true)} ref={menuRef}>
        <div className="task-row-wrapper">
            <div className="task-row-title">
                {/* <div className="task-arrow-div" onClick={(event) => onOpenMenu(task.id, event)} ><FaCaretDown className="task-arrow" /></div> */}
                <div className="task-title-cell-component">
                    <div className="left-indicator-cell" style={{ backgroundColor:group.style.color }}></div>
                    <div className="task-title-content">
                        {(updateIsClick.boardId && updateIsClick.groupId === group.id && updateIsClick.task.id === task.id) ?
                            <div className="title-update-input">
                                <input type="text" defaultValue={task.title} onChange={handleChange} name="title" />
                            </div>
                            :
                            <div className="task-title-cell" onClick={() => onOpenModal({ boardId: board._id, groupId: group.id, task: task })}>
                                <div>
                                    {task.title}
                                </div>
                                <div>
                                    <button onClick={(event) => onUpdateTask(event, { boardId: board._id, groupId: group.id, task: task })} className="edit-button">Edit</button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className="task-row-items">
                    <div className="flex-row-items">{task.assignedTo.map(user => user.fullname)}</div>
                    <div className="flex-row-items status" style={{ backgroundColor: task.status.color }}>{task.status.title}</div>
                    <div className="flex-row-items">{task.archivedAt ? utilService.getCurrTime(task.archivedAt) : ''}</div>
                </div>
            </div>
        </div>
    </section>
}

