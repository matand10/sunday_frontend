import { Menu } from '../hooks/right-click-menu'
// import { socketService, SOCKET_EMIT_SEND_MSG } from '../services/socket.service.js'
import { RightClickMenu } from '../modal/right-click-menu'
import React, { useRef, useEffect, useState } from 'react';
import { FaChevronCircleDown, FaCaretDown, FaSort } from 'react-icons/fa'
import { GroupMenu } from './group-menu'
import { TasksList } from './tasks-list.jsx'
import { useParams } from "react-router-dom";
import { EditableColumn } from "./editable-colum";
import { boardService } from "../services/board.service";
import { useDispatch } from "react-redux";
import { groupService } from "../services/group.service";
import { ColMenu } from "../modal/col-menu";
import { ProgressBar } from '../features/progress-bar';
import { ColAddMenu } from "../modal/col-add-menu";
import { MainGroupInput } from "./main-group-menu";
import { useEffectUpdate } from "../hooks/useEffectUpdate";


export const GroupList = ({ updateTask, updateBoard, updates, updateStatistics, board, group, onAddTask, onRemoveGroup, removeTask, updateGroup, updateTaskDate }) => {
    const [task, setTask] = useState({ title: '' })
    const [groupIsClick, setGroupIsClick] = useState({})
    const [isClickGroup, setIsClickGroup] = useState(false)
    const [groupUpdate, setGroupUpdate] = useState(group)
    const [arrowTask, setArrowTask] = useState({})
    const [clickTask, setClickTask] = useState({ task: '', isOpen: false })
    const [modal, setModal] = useState({})
    const [showMenu, setShowMenu] = useState(false)
    const [isReversedSort, setIsReversedSort] = useState(false)
    const [colActions, setColActions] = useState({ colIdx: '', groupId: '' })
    const [isAddCol, setIsAddCol] = useState(false)


    const { x, y, handleContextMenu } = Menu()
    let menuRef = useRef()
    let groupUpdateRef = useRef()
    let groupRef = useRef()
    const { boardId } = useParams()
    const dispatch = useDispatch()



    // useEffectUpdate(() => {
    //     updateGroup(groupUpdate)
    //     setGroupIsClick({})
    // }, [groupUpdate])

    const onUpdateGroupBar = () => {
        // const newGroup = groupService.getProgress(group)
        // updateGroup(newGroup)
    }


    useEffect(() => {
        document.addEventListener("mousedown", eventListeners)
        return () => {
            document.removeEventListener("mousedown", eventListeners)
        }
    }, [])

    const eventListeners = (ev) => {
        if (!menuRef.current?.contains(ev.target)) {
            document.removeEventListener('contextmenu', handleContextMenu)
            setIsClickGroup(false)
            setShowMenu(false)
            // setGroupIsClick({})
            setColActions(false)
            setIsAddCol(false)
        }
    }

    const onHandleRightClick = (ev, task, value) => {
        setShowMenu(value)
    }

    const onOpenMenu = (params) => {
        setArrowTask(params)
    }

    const onUpdateGroup = (ev, params) => {
        ev.stopPropagation()
        setGroupIsClick(params)
    }

    const onNewCol = (value) => {
        const newGroup = groupService.groupColAdd(group, value)
        updateGroup(newGroup)
        setIsAddCol(false)
    }

    const removeCol = (colIdx) => {
        const newGroup = groupService.groupColRemove(colIdx, group)
        updateGroup(newGroup)
    }

    const onHeaderSort = (sortValue, colIdx) => {
        setIsReversedSort(!isReversedSort)
        const newGroup = boardService.groupHeadSort(sortValue, group, isReversedSort, colIdx)
        updateGroup(newGroup)
    }

    const onOpenColActions = (colIdx, groupId) => {
        setColActions({ colIdx: colIdx, groupId: groupId })
    }

    const changeGroupTitle = (ev) => {
        const value = ev.currentTarget.textContent
        const newGroup = { ...group }
        newGroup.title = value
        updateGroup(newGroup)
    }

    let columns = group.columns
    columns = columns.sort((a, b) => a.importance - b.importance)

    if (!board) return <h1>Loading...</h1>

    return <div className="board-content-wrapper">
        <div className="group-header-wrapper">
            <div className="group-header-component">
                <div className="group-header-title">
                    <div className="group-arrow-div" style={{ color: group.style.color }}>
                        <FaChevronCircleDown className="group-arrow" onClick={() => setIsClickGroup(!isClickGroup)} />
                    </div>
                    <div>{isClickGroup && <GroupMenu menuRef={menuRef} group={group} onRemoveGroup={onRemoveGroup} />}</div>
                    <div className="column-header column-header-title">
                        <h3 style={{ color: group.style.color }} contentEditable={true} suppressContentEditableWarning={true} onBlur={(ev) => changeGroupTitle(ev)}>{group.title}</h3>
                        <div onClick={() => onHeaderSort('title')} className="sort-header-menu hide-sort"><FaSort /></div>
                    </div>
                </div>
                <div className="flex coulmn-main-header-container">
                    <div className="group-header-items">
                        {columns.map((col, idx) => {
                            return <div key={idx} className="column-header">
                                <div onClick={() => onHeaderSort(col.type, idx)} className="sort-header-menu hide-sort">
                                    <FaSort />
                                </div>
                                <span className="editable-column-header">
                                    <EditableColumn colIdx={idx} group={group} updateGroup={updateGroup} text={col.title} />
                                </span>
                                <div className="col-arrow-container">
                                    <div className="col-arrow-div" onClick={() => onOpenColActions(idx, group.id)} > <FaCaretDown className="col-arrow" /></div>
                                </div>
                                {colActions.colIdx === idx && colActions.groupId === group.id && <ColMenu setGroupIsClick={setGroupIsClick} setcolActions={setColActions} menuRef={menuRef} removeCol={removeCol} colActions={colActions} />}
                            </div>
                        })}
                    </div>
                    <div className="add-colomn-column-button-container">
                        <button className="add-colomn-column-button" onClick={() => {
                            setIsAddCol(!isAddCol)
                        }}><span>+</span></button>
                        {isAddCol && <ColAddMenu menuRef={menuRef} onNewCol={onNewCol} />}
                    </div>
                </div>
            </div>
            {group.tasks.map((task, idx) => {
                return <TasksList key={idx} taskIdx={idx} boardId={boardId} task={task} /*menuRef={menuRef}*/ backgroundColor={group.style.color}
                    updateGroup={updateGroup} updates={updates} updateBoard={updateBoard} onUpdateGroupBar={onUpdateGroupBar} onHandleRightClick={onHandleRightClick} updateTask={updateTask} group={group} board={board} removeTask={removeTask} updateTaskDate={updateTaskDate} />
            })}
            <MainGroupInput onAddTask={onAddTask} group={group} task={task} />
            <div className="columns-footer-component">
                <div className="group-footer-container">
                    {/* <div className="group-header-title">
                        <div className="group-arrow-div" style={{ color: group.style.color }}>
                        </div>
                    </div> */}

                    <div className="group-footer-items">
                        {group.columns && group.columns.map((col, idx) => {
                            if (col.type === 'status') return <div key={idx} className="column-footer">
                                <ProgressBar group={group} colIdx={idx} />
                            </div>
                            else return <div key={idx}></div>
                        })}
                    </div>
                    <div className="add-colomn-column-button-container">
                        {/* <button className="add-colomn-column-button" onClick={() => onNewCol()}><span>+</span></button> */}
                    </div>
                </div>
            </div>
            <RightClickMenu x={x} y={y} showMenu={showMenu} />
        </div>
    </div>

}
