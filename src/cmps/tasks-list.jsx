import React from 'react'
import { useEffect, useRef, useState } from 'react';
import { utilService } from "../services/util.service";
import { TaskMenu } from './task-menu';
import { StatusModal } from '../modal/status-modal'
import { SidePanel } from "./side-panel"
import { useParams } from "react-router-dom";
import { boardService } from '../services/board.service'
import { FaCaretDown } from 'react-icons/fa'
import { groupService } from '../services/group.service';
import { InviteToTaskModal } from '../modal/invite-to-task-menu';
import { TaskTitleChange } from './task-title-change';


export const TasksList = ({ updateBoard, updateGroup, updates, taskIdx, onUpdateGroupBar, task, backgroundColor, onHandleRightClick, menuRef, updateTask, group, board, removeTask, updateTaskDate }) => {
    const [modal, setModal] = useState({})
    const [arrowTask, setArrowTask] = useState({})
    const [updateIsClick, setUpdateIsClick] = useState({})
    const [modalPos, setModalPos] = useState({ x: null, y: null })
    const [statusActive, setStatusActive] = useState(false)
    const [inviteUserModal, setInviteUserModal] = useState(false)
    const [editText, setEditText] = useState(false)
    const [modalData, setModalData] = useState(null)
    // {type: 'status', data: {}, pos: {}}


    let statusRef = useRef()
    let dateRef = useRef()
    const { boardId } = useParams()


    useEffect(() => {
        document.addEventListener("mousedown", eventListener)
        return () => {
            document.removeEventListener("mousedown", eventListener)
        }
    }, [])

    const onOpenMenu = (ev, params) => {
        ev.stopPropagation()
        setArrowTask(params)
    }

    const eventListener = (ev) => {
        if (!statusRef.current?.contains(ev.target)) {
            setStatusActive(false)
            setArrowTask({})
            setInviteUserModal(false)
            setUpdateIsClick({})
        }
    }

    const toggleStatus = (ev, value, colIdx) => {
        const x = ev.pageX
        const y = ev.pageY
        setModalPos({ x: x, y: y })
        setStatusActive({ value, colIdx })
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
        updateBoard(newBoard)
    }

    const handleDateChange = ({ target }, colIdx) => {
        specialUpdateTask(target.value, colIdx)
    }



    const specialUpdateTask = (value, colIdx, status = null) => {
        let newTask = { ...task }
        newTask.columns[colIdx].value = value
        group.tasks[taskIdx] = newTask
        if (status === 'status') {
            group.progress = groupService.getProgress(group, [colIdx])
        }
        updateGroup(group)
    }

    const textEdit = (colIdx, value) => {
        setEditText({ colIdx, value })
    }


    if (!task) return <h1>Loading...</h1>
    let columns = task.columns
    columns = columns.sort((a, b) => a.importance - b.importance)
    return <section className="task-row-component" ref={menuRef} onDragOver={(ev) => draggingOver(ev)} onDrop={(ev) => dragDropped(ev, task.id)}>
        <div className="task-row-wrapper" onContextMenu={(ev) => onHandleRightClick(ev, task, true)} draggable onDragStart={(ev) => dragStarted(ev, task.id)}>
            <div className="task-row-title">
                <div className="task-title-cell-component" onClick={() => onOpenModal({ boardId: board._id, groupId: group.id, task: task })}>
                    <div className="left-indicator-cell" style={{ backgroundColor }}></div>
                    <div className="task-arrow-container">
                        <div className="task-arrow-div" onClick={(ev) => onOpenMenu(ev, { taskId: task.id, groupId: group.id, board: board })} > <FaCaretDown className="task-arrow" /></div>
                        {arrowTask.board && arrowTask.groupId === group.id && arrowTask.taskId === task.id && <TaskMenu statusRef={statusRef} removeTask={removeTask} arrowTask={arrowTask} onOpenMenu={onOpenMenu} />}
                    </div>
                    <TaskTitleChange setUpdateIsClick={setUpdateIsClick} updateTask={updateTask} updateIsClick={updateIsClick} taskIdx={taskIdx} statusRef={statusRef} task={task} group={group} onUpdateTask={onUpdateTask} onOpenModal={onOpenModal} board={board} />
                </div>

                <div className="task-column-rows">
                    <div className="task-row-items">
                        {columns.map((col, idx) => {
                            switch (col.type) {
                                case 'person':
                                    return col.value?.length ?
                                        <div onClick={() => setInviteUserModal(true)} key={idx} className="flex-row-items user-image-container">{col.value.map((user, userIdx) => {
                                            return <div key={userIdx} className="user-image-wrapper" >
                                                <img key={userIdx} style={{ left: `${20 * (userIdx) + 'px'}`, transform: `translateX(${-80 + '%'})` }} className="user-image-icon-assign" src={col.value.userImg || 'https://cdn.monday.com/icons/dapulse-person-column.svg'} alt="user image" />
                                                {inviteUserModal && <InviteToTaskModal setInviteUserModal={setInviteUserModal} specialUpdateTask={specialUpdateTask} colIdx={idx} statusRef={statusRef} board={board} task={task} />}
                                            </div>
                                        })}
                                        </div>
                                        :
                                        <div onClick={() => setInviteUserModal(true)} key={idx} className="flex-row-items">
                                            <div className="user-image-wrapper">
                                                <img className="user-image-icon-assign" src="https://cdn.monday.com/icons/dapulse-person-column.svg" alt="user image" />
                                                {inviteUserModal && <InviteToTaskModal setInviteUserModal={setInviteUserModal} specialUpdateTask={specialUpdateTask} colIdx={idx} statusRef={statusRef} board={board} task={task} />}
                                            </div>
                                        </div>
                                case 'status':
                                    return <div key={idx} className="flex-row-items status" style={{ backgroundColor: col.value?.color }} onClick={(ev) => toggleStatus(ev, true, idx)}>{col.value?.title}</div>
                                case 'date':
                                    return <div key={idx} className="flex-row-items">
                                        <label htmlFor="task-date">{col.value ? utilService.getCurrTime(col.value) : ''}</label>
                                        <input id="task-date" type="date" name="archivedAt" defaultValue={col.value} key={idx} onChange={(event) => handleDateChange(event, idx)} ref={dateRef} />
                                    </div>
                                case 'text':
                                    if (editText.value && editText.colIdx) {
                                        return <div key={idx} className="title-update-input">
                                            {/* <input type="text" value={col.value} onChange={(event) => handleTextChange(event, idx)} onClick={(event) => (event.stopPropagation())} /> */}
                                        </div>
                                    }
                                    return <div onClick={() => textEdit(idx, true)} key={idx} className="flex-row-items">{col.value}</div>
                            }
                        })
                        }
                        <div className="right-indicator-row"></div>
                    </div>
                </div>
                <div className="add-colomn-column"></div>
            </div>
        </div >
        {statusActive.value && <StatusModal setStatusActive={setStatusActive} updateGroup={updateGroup} onUpdateGroupBar={onUpdateGroupBar} specialUpdateTask={specialUpdateTask} statusActive={statusActive} statusRef={statusRef} modalPos={modalPos} />}
        {modal.boardId && <SidePanel group={group} task={task} taskIdx={taskIdx} updateGroup={updateGroup} statusRef={statusRef} modal={modal} onCloseModal={onCloseModal} onOpenModal={onOpenModal} />}
    </section >
}

