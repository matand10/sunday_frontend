import { utilService } from "../services/util.service";
import { FaChevronCircleDown, FaCaretDown } from 'react-icons/fa'
import { BsPlusCircleFill } from 'react-icons/bs'
import { TaskMenu } from './task-menu';
import React from 'react'
import { useEffect, useRef, useState } from 'react';
import { StatusModal } from '../modal/status-modal'
import { SidePanel } from "./side-panel"
import { useParams } from "react-router-dom";
import { boardService } from '../services/board.service'
import { useDispatch } from "react-redux";
import { saveBoard } from '../store/board/board.action'

export const TasksList = ({ task, backgroundColor, onHandleRightClick, menuRef, updateTask, group, board, removeTask }) => {
    const [modal, setModal] = useState({})
    const [arrowTask, setArrowTask] = useState({})
    const [updateIsClick, setUpdateIsClick] = useState({})
    const [taskUpdate, setTaskUpdate] = useState(task)
    const [modalPos, setModalPos] = useState({ x: null, y: null })
    const [isStatusActive, setIsStatusActive] = useState(false)
    let statusRef = useRef()
    const { boardId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        updateTask(taskUpdate, group.id, board)
        setUpdateIsClick({})
    }, [taskUpdate])

    const onOpenMenu = (params) => {
        setArrowTask(params)
    }

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

    const dragStarted = (ev, taskId) => {
        ev.dataTransfer.setData("taskId", taskId)
    }

    const draggingOver = (ev) => {
        ev.preventDefault()
    }

    const dragDropped = (ev, toIndex) => {
        ev.preventDefault()
        const transferedTaskId = ev.dataTransfer.getData("taskId")
        const newBoard = boardService.changeTaskPosition(transferedTaskId, group.id, board, toIndex)
        dispatch(saveBoard(newBoard))
    }

    if (!task) return <h1>Loading...</h1>

    let columns = task.columns
    columns = columns.sort((a, b) => a.importance - b.importance)

    return <section className="task-row-component" onContextMenu={(ev) => onHandleRightClick(ev, task, true)} ref={menuRef} onDragOver={(ev) => draggingOver(ev)} onDrop={(ev) => dragDropped(ev, task.id)}>
        <div className="task-row-wrapper" draggable onDragStart={(ev) => dragStarted(ev, task.id)}>
            <div className="task-row-title">
                <div className="task-title-cell-component" onClick={() => onOpenModal({ boardId: board._id, groupId: group.id, task: task })}>
                    <div className="task-arrow-div" onClick={(event) => onOpenMenu({ taskId: task.id, groupId: group.id, board: board })} ><FaCaretDown className="task-arrow" /></div>
                    <div className="left-indicator-cell" style={{ backgroundColor }}></div>
                    <div className="task-title-content" >
                        {(updateIsClick.boardId && updateIsClick.groupId === group.id && updateIsClick.task.id === task.id) ?
                            <div className="title-update-input">
                                <input type="text" defaultValue={task.title} onChange={handleChange} name="title" onClick="event.stopPropagation()" />
                            </div>
                            :
                            <div className="task-title-cell">
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
                    {columns.map((col, idx) => {
                        switch (col.type) {
                            case 'person':
                                return col.value?.length ? <div key={idx} className="flex-row-items">{col.value.map((user, idx) => {
                                    return <img key={idx} className="user-image-icon-assign" src={user.imgUrl} alt="user image" />
                                })}</div> : <div key={idx} className="flex-row-items"><img className="user-image-icon-assign" src="https://cdn.monday.com/icons/dapulse-person-column.svg" alt="user image" /></div>
                            case 'status':
                                return <div key={idx} className="flex-row-items status" style={{ backgroundColor: col.value.color }} onClick={(ev) => toggleStatus(ev, true)}>{col.value.title}</div>
                            case 'date':
                                return <div key={idx} className="flex-row-items">{col.value ? utilService.getCurrTime(col.value) : ''}</div>
                            case 'text':
                                return <div key={idx} className="flex-row-items">{col.value}</div>
                        }
                    })

                    }

                    {/* {task.assignedTo?.length ? <div className="flex-row-items">{task.assignedTo.map((user, idx) => {
                        return <img key={idx} className="user-image-icon-assign" src={user.imgUrl} alt="user image" />
                    })}</div> : <div className="flex-row-items"><img className="user-image-icon-assign" src="https://cdn.monday.com/icons/dapulse-person-column.svg" alt="user image" /></div>} */}


                    {/* <div className="flex-row-items status" style={{ backgroundColor: task.status.color }} onClick={(ev) => toggleStatus(ev, true)}>{task.status.title}</div> */}
                    {/* <div className="flex-row-items">{task.archivedAt ? utilService.getCurrTime(task.archivedAt) : ''}</div> */}
                </div>
            </div>

            {arrowTask.board && arrowTask.groupId === group.id && arrowTask.taskId === task.id && <TaskMenu removeTask={removeTask} arrowTask={arrowTask} onOpenMenu={onOpenMenu} />}
        </div >




        {isStatusActive && <StatusModal changeStatus={changeStatus} task={task} statusRef={statusRef} modalPos={modalPos} />}
        {modal.boardId && <SidePanel modal={modal} onCloseModal={onCloseModal} onOpenModal={onOpenModal} />}
    </section >
}

