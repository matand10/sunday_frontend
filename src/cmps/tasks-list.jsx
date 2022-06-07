import React from 'react'
import { useEffect, useRef, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { AvatarGroup } from '@mui/material'

import { TaskMenu } from './task-menu';
import { StatusModal } from '../modal/status-modal'
import { SidePanel } from "./side-panel"
import { useParams } from "react-router-dom";
import { boardService } from '../services/board.service'
import { FaCaretDown } from 'react-icons/fa'
import { groupService } from '../services/group.service';
import { InviteToTaskModal } from '../modal/invite-to-task-menu';
import { TaskTitleChange } from './task-title-change';


import { MemberCol } from '../cmps/member-col'
import { StatCol } from '../cmps/status-col'
import { DateCol } from '../cmps/date-col'
import { TextCol } from '../cmps/text-col'
import { TimelineCol } from '../cmps/timeline-col'
import { PriorityCol } from '../cmps/priority-col'
import { is } from 'date-fns/locale';




export const TasksList = ({ snapshot, provided, updateBoard, updateGroup, updates, taskIdx, onUpdateGroupBar, task, backgroundColor, onHandleRightClick, menuRef, updateTask, group, board, removeTask }) => {
    const [modal, setModal] = useState({})
    const [arrowTask, setArrowTask] = useState({})
    const [updateIsClick, setUpdateIsClick] = useState({})
    const [modalPos, setModalPos] = useState({ x: null, y: null })
    const [statusActive, setStatusActive] = useState(false)
    const [inviteUserModal, setInviteUserModal] = useState(false)
    const [modalData, setModalData] = useState(null)
    const [isConfetti,setIsConfetti]=useState(false)




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

    const toggleStatus = (ev, value, colIdx, labels) => {
        const x = ev.pageX
        const y = ev.pageY
        setModalPos({ x: x, y: y })
        setStatusActive({ value, colIdx, labels })
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

    const specialUpdateTask = (value, colIdx, status = null) => {
        const newGroup = { ...group }
        const newTask = { ...task }
        const col = newTask.columns[colIdx]
        const previewCol = { ...col }
        col.value = value
        newGroup.tasks[taskIdx] = newTask
        if (status === 'status') {
            newGroup.progress = groupService.getProgress(newGroup)
            if(value.title==='Done') {
                setIsConfetti(newTask.id)
                setTimeout(()=>setIsConfetti(false),3000)
            }
        }
        const activity = boardService.documentActivities(col, previewCol.value, task.title)
        newTask.activities.unshift(activity)
        board.activities.unshift(activity)
        updateGroup(newGroup)
    }

    if (!task) return <h1>Loading...</h1>
    let columns = task.columns

    return <section ref={provided.innerRef}
        snapshot={snapshot}
        {...provided.draggableProps}
        {...provided.dragHandleProps} className="task-row-component">
        <div className="task-row-wrapper" onContextMenu={(ev) => onHandleRightClick(ev, task, true)} >
            <div className="task-row-title">
                <div className="task-title-cell-component" onClick={() => onOpenModal({ boardId: board._id, groupId: group.id, task: task })}>
                    <div className="left-indicator-cell" style={{ backgroundColor }}></div>
                    <div className="task-arrow-container" onClick={(event) => event.stopPropagation()}>
                        <div className="task-arrow-div" onClick={(ev) => onOpenMenu(ev, { taskId: task.id, groupId: group.id, board: board })} > <FaCaretDown className="task-arrow" /></div>
                        {arrowTask.board && arrowTask.groupId === group.id && arrowTask.taskId === task.id &&
                            <TaskMenu statusRef={statusRef} setArrowTask={setArrowTask} setUpdateIsClick={setUpdateIsClick} task={task} board={board} removeTask={removeTask} arrowTask={arrowTask} onOpenMenu={onOpenMenu} />}
                    </div>
                    <TaskTitleChange setUpdateIsClick={setUpdateIsClick} updateTask={updateTask} updateIsClick={updateIsClick} taskIdx={taskIdx} statusRef={statusRef} task={task} group={group} onUpdateTask={onUpdateTask} onOpenModal={onOpenModal} board={board} />
                </div>
                <div className="task-column-rows">
                    <div className="task-row-items">
                        {columns.map((col, idx) => {
                            return <DynamicCmp key={idx} col={col} idx={idx} task={task} group={group} board={board} setInviteUserModal={setInviteUserModal} statusRef={statusRef} specialUpdateTask={specialUpdateTask}
                                InviteToTaskModal={InviteToTaskModal} updateTask={updateTask} inviteUserModal={inviteUserModal} toggleStatus={toggleStatus} isConfetti={isConfetti}/>
                        })
                        }
                    </div>
                    <div className="right-finish-row"></div>
                    <div className="right-indicator-row"></div>

                </div>
                <div className="add-colomn-column"></div>
            </div>
        </div >
        {statusActive.value && <StatusModal setStatusActive={setStatusActive} updateGroup={updateGroup} onUpdateGroupBar={onUpdateGroupBar} specialUpdateTask={specialUpdateTask} statusActive={statusActive} statusRef={statusRef} modalPos={modalPos} />}
        {modal.boardId && <SidePanel board={board} updateGroup={updateGroup} updateBoard={updateBoard} group={group} task={task} taskIdx={taskIdx} statusRef={statusRef} modal={modal} onCloseModal={onCloseModal} onOpenModal={onOpenModal} />}
        {provided.placeholder}
    </section >
}



function DynamicCmp({ col, board, task, group, toggleStatus, idx, colIdx, setInviteUserModal, inviteUserModal, InviteToTaskModal, specialUpdateTask, statusRef, updateTask,isConfetti }) {
    switch (col.type) {
        case 'person':
            return <MemberCol col={col} idx={idx} colIdx={colIdx} board={board} group={group} task={task} setInviteUserModal={setInviteUserModal} inviteUserModal={inviteUserModal}
                InviteToTaskModal={InviteToTaskModal} specialUpdateTask={specialUpdateTask} statusRef={statusRef} updateTask={updateTask} />
        case 'status':
            return <StatCol col={col} toggleStatus={toggleStatus} idx={idx} isConfetti={isConfetti} taskId={task.id}/>
        case 'date':
            return <DateCol col={col} idx={idx} specialUpdateTask={specialUpdateTask} />
        case 'text':
            return <TextCol col={col} idx={idx} specialUpdateTask={specialUpdateTask} />
        case 'timeline':
            return <TimelineCol idx={idx} task={task} group={group} updateTask={updateTask} specialUpdateTask={specialUpdateTask} />
        case 'priority':
            return <PriorityCol col={col} idx={idx} toggleStatus={toggleStatus} />
    }
}
