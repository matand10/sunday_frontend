import React from 'react'
import { useEffect, useRef, useState } from 'react';
import { TaskMenu } from './task-menu';
import { StatusModal } from '../modal/status-modal'
import { SidePanel } from "./side-panel"
import { useParams } from "react-router-dom";
import { boardService } from '../services/board.service'
import { FaCaretDown } from 'react-icons/fa'
import { groupService } from '../services/group.service';
import { InviteToTaskModal } from '../modal/invite-to-task-menu';
import { TaskTitleChange } from './task-title-change';
import { Draggable } from "react-beautiful-dnd";


import { MemberCol } from '../cmps/member-col'
import { StatCol } from '../cmps/status-col'
import { DateCol } from '../cmps/date-col'
import { TextCol } from '../cmps/text-col'




export const TasksList = ({ snapshot, provided, updateBoard, updateGroup, updates, taskIdx, onUpdateGroupBar, task, backgroundColor, onHandleRightClick, menuRef, updateTask, group, board, removeTask }) => {
    const [modal, setModal] = useState({})
    const [arrowTask, setArrowTask] = useState({})
    const [updateIsClick, setUpdateIsClick] = useState({})
    const [modalPos, setModalPos] = useState({ x: null, y: null })
    const [statusActive, setStatusActive] = useState(false)
    const [inviteUserModal, setInviteUserModal] = useState(false)
    const [editText, setEditText] = useState(false)
    const [modalData, setModalData] = useState(null)
    const [dragged, setDragged] = useState('')
    const [draggedTarget, setDraggedTarget] = useState('task-row-component')
    const [dropTarget, setDropTarget] = useState('task-row-component')
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
        console.log('start');
        // setDragged('dragged')
    }

    const draggingOver = (ev, toIndex) => {
        ev.preventDefault()
        // setDraggedTarget('target-dragged')
        console.log('over');
        // setDragged('')
        // const transferedTaskId = ev.dataTransfer.getData("taskId")
        // const newBoard = boardService.changeTaskPosition(transferedTaskId, group.id, board, toIndex)
        // updateBoard(newBoard)
    }

    const dragDropped = (ev, toIndex) => {
        ev.preventDefault()
        console.log('dropped');
        setDraggedTarget('task-row-component')
        setDragged('')
        // setDropTarget('task-row-component')
        const transferedTaskId = ev.dataTransfer.getData("taskId")
        const newBoard = boardService.changeTaskPosition(transferedTaskId, group.id, board, toIndex)
        updateBoard(newBoard)
    }


    const specialUpdateTask = (value, colIdx, status = null) => {
        let newGroup = { ...group }
        let newTask = { ...task }
        newTask.columns[colIdx].value = value
        newGroup.tasks[taskIdx] = newTask
        if (status === 'status') {
            newGroup.progress = groupService.getProgress(newGroup)
        }
        updateGroup(newGroup)
    }

    if (!task) return <h1>Loading...</h1>
    let columns = task.columns
    columns = columns.sort((a, b) => a.importance - b.importance)

    // return <section className={`${draggedTarget} ${dropTarget}`} ref={menuRef} onDragOver={(ev) => draggingOver(ev)} onDrop={(ev) => dragDropped(ev, task.id)} >
    //     <div className={`task-row-wrapper ${dragged}`} onContextMenu={(ev) => onHandleRightClick(ev, task, true)} draggable onDragStart={(ev) => dragStarted(ev, task.id)}>
    // return <section className="task-row-component" ref={menuRef} onDragOver={(ev) => draggingOver(ev, task.id)} onDrop={(ev) => dragDropped(ev, task.id)} >
    //     <div className="task-row-wrapper" onContextMenu={(ev) => onHandleRightClick(ev, task, true)} draggable onDragStart={(ev) => dragStarted(ev, task.id)}>

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
                            <TaskMenu statusRef={statusRef} removeTask={removeTask} arrowTask={arrowTask} onOpenMenu={onOpenMenu} />}
                    </div>
                    <TaskTitleChange setUpdateIsClick={setUpdateIsClick} updateTask={updateTask} updateIsClick={updateIsClick} taskIdx={taskIdx} statusRef={statusRef} task={task} group={group} onUpdateTask={onUpdateTask} onOpenModal={onOpenModal} board={board} />
                </div>

                <div className="task-column-rows">
                    <div className="task-row-items">
                        {columns.map((col, idx) => {
                            return <DynamicCmp key={idx} col={col} idx={idx} task={task} board={board} setInviteUserModal={setInviteUserModal} statusRef={statusRef} specialUpdateTask={specialUpdateTask}
                                InviteToTaskModal={InviteToTaskModal} inviteUserModal={inviteUserModal} toggleStatus={toggleStatus} editText={editText} setEditText={setEditText} />
                        })
                        }
                        <div className="right-indicator-row"></div>
                    </div>
                </div>
                <div className="add-colomn-column"></div>
            </div>
        </div >
        {statusActive.value && <StatusModal setStatusActive={setStatusActive} updateGroup={updateGroup} onUpdateGroupBar={onUpdateGroupBar} specialUpdateTask={specialUpdateTask} statusActive={statusActive} statusRef={statusRef} modalPos={modalPos} />}
        {modal.boardId && <SidePanel board={board} updateBoard={updateBoard} group={group} task={task} taskIdx={taskIdx} updateGroup={updateGroup} statusRef={statusRef} modal={modal} onCloseModal={onCloseModal} onOpenModal={onOpenModal} />}
    </section >


    // return <section className="task-row-component" ref={menuRef} onDragOver={(ev) => draggingOver(ev, task.id)} onDrop={(ev) => dragDropped(ev, task.id)} >
    //     <div className="task-row-wrapper" onContextMenu={(ev) => onHandleRightClick(ev, task, true)} draggable onDragStart={(ev) => dragStarted(ev, task.id)}>
    //         <div className="task-row-title">
    //             <div className="task-title-cell-component" onClick={() => onOpenModal({ boardId: board._id, groupId: group.id, task: task })}>
    //                 <div className="left-indicator-cell" style={{ backgroundColor }}></div>
    //                 <div className="task-arrow-container" onClick={(event) => event.stopPropagation()}>
    //                     <div className="task-arrow-div" onClick={(ev) => onOpenMenu(ev, { taskId: task.id, groupId: group.id, board: board })} > <FaCaretDown className="task-arrow" /></div>
    //                     {arrowTask.board && arrowTask.groupId === group.id && arrowTask.taskId === task.id &&
    //                         <TaskMenu statusRef={statusRef} removeTask={removeTask} arrowTask={arrowTask} onOpenMenu={onOpenMenu} />}
    //                 </div>
    //                 <TaskTitleChange setUpdateIsClick={setUpdateIsClick} updateTask={updateTask} updateIsClick={updateIsClick} taskIdx={taskIdx} statusRef={statusRef} task={task} group={group} onUpdateTask={onUpdateTask} onOpenModal={onOpenModal} board={board} />
    //             </div>

    //             <div className="task-column-rows">
    //                 <div className="task-row-items">
    //                     {columns.map((col, idx) => {
    //                         return <DynamicCmp key={idx} col={col} idx={idx} task={task} board={board} setInviteUserModal={setInviteUserModal} statusRef={statusRef} specialUpdateTask={specialUpdateTask}
    //                             InviteToTaskModal={InviteToTaskModal} inviteUserModal={inviteUserModal} toggleStatus={toggleStatus} editText={editText} setEditText={setEditText} />
    //                     })
    //                     }
    //                     <div className="right-indicator-row"></div>
    //                 </div>
    //             </div>
    //             <div className="add-colomn-column"></div>
    //         </div>
    //     </div >
    //     {statusActive.value && <StatusModal setStatusActive={setStatusActive} updateGroup={updateGroup} onUpdateGroupBar={onUpdateGroupBar} specialUpdateTask={specialUpdateTask} statusActive={statusActive} statusRef={statusRef} modalPos={modalPos} />}
    //     {modal.boardId && <SidePanel group={group} task={task} taskIdx={taskIdx} updateGroup={updateGroup} statusRef={statusRef} modal={modal} onCloseModal={onCloseModal} onOpenModal={onOpenModal} />}
    // </section >
}



function DynamicCmp({ col, setEditText, board, task, editText, toggleStatus, idx, colIdx, setInviteUserModal, inviteUserModal, InviteToTaskModal, specialUpdateTask, statusRef }) {
    switch (col.type) {
        case 'person':
            return <MemberCol col={col} idx={idx} colIdx={colIdx} board={board} task={task} setInviteUserModal={setInviteUserModal} inviteUserModal={inviteUserModal}
                InviteToTaskModal={InviteToTaskModal} specialUpdateTask={specialUpdateTask} statusRef={statusRef} />
        case 'status':
            return <StatCol col={col} toggleStatus={toggleStatus} idx={idx} />
        case 'date':
            return <DateCol col={col} idx={idx} specialUpdateTask={specialUpdateTask} />
        case 'text':
            return <TextCol col={col} idx={idx} editText={editText} colIdx={colIdx} setEditText={setEditText} />
    }
}
