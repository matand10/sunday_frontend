import { utilService } from "../services/util.service";
import { useEffect, useRef, useState } from 'react';
import { StatusModal } from '../modal/status-modal'
import { SidePanel } from "./side-panel"

export const TasksList = ({ task, boardId, backgroundColor, onHandleRightClick, menuRef, updateTask, group, board }) => {
    const [modal, setModal] = useState({})
    const [updateIsClick, setUpdateIsClick] = useState({})
    const [taskUpdate, setTaskUpdate] = useState(task)
    const [modalPos, setModalPos] = useState({ x: null, y: null })
    const [isStatusActive, setIsStatusActive] = useState(false)
    let statusRef = useRef()

    useEffect(() => {
        updateTask(taskUpdate, group.id, board)
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

    useEffect(() => {
        document.addEventListener("mousedown", (event) => {
            if (!statusRef.current?.contains(event.target)) {
                setIsStatusActive(false)
            }
        })
    })

    const toggleStatus = (ev, value) => {
        const x = ev.pageX
        const y = ev.pageY
        setModalPos({ x: x, y: y })
        setIsStatusActive(value)
    }

    const changeStatus = (status) => {
        task.status = status
        updateTask(task, group.id, board)
        setIsStatusActive(false)
    }

    const onUpdateTask = (ev, params) => {
        ev.stopPropagation()
        setUpdateIsClick(params)
    }

    const onOpenModal = () => {
        setModal(prevState => ({ ...prevState, boardId: boardId, task: task }))
    }

    const onCloseModal = () => {
        setModal({ boardId: null })
    }


    return <section className="task-row-component" onContextMenu={(ev) => onHandleRightClick(ev, task, true)} ref={menuRef}>
        <div className="task-row-wrapper">
            <div className="task-row-title">
                <div className="task-title-cell-component" onClick={onOpenModal}>
                    <div className="left-indicator-cell" style={{ backgroundColor }}></div>
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
                    <div className="flex-row-items status" onClick={(ev) => toggleStatus(ev, true)} style={{ backgroundColor: task.status.color }}>{task.status.title}</div>
                    <div className="flex-row-items">{utilService.getCurrTime(task.archivedAt)}</div>
                </div>
            </div>
        </div>
        {isStatusActive && <StatusModal changeStatus={changeStatus} task={task} statusRef={statusRef} modalPos={modalPos} />}
        {modal.boardId && <SidePanel modal={modal} onCloseModal={onCloseModal} onOpenModal={onOpenModal} />}
    </section>
}

