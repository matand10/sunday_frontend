import { utilService } from "../services/util.service";
import { Menu } from '../hooks/right-click-menu'
import { RightClickMenu } from '../modal/right-click-menu'
import React, { useRef, useEffect, useState } from 'react';
import { FaChevronCircleDown, FaCaretDown, FaSort } from 'react-icons/fa'
import { GroupMenu } from './group-menu'
import { TaskMenu } from './task-menu'
import { TasksList } from './tasks-list.jsx'
import { useParams } from "react-router-dom";
import { EditableColumn } from "../cmps/editable-input";
import { boardService } from "../services/board.service";
import { saveBoard } from '../store/board/board.action'
import { useDispatch } from "react-redux";
import { groupService } from "../services/group.service";
import { ColMenu } from "../modal/col-menu";
import { ProgressBar } from '../features/progress-bar'


export const GroupList = ({ updateTask, board, group, onAddTask, onRemoveGroup, removeTask, updateGroup, updateTaskDate }) => {
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



    const { x, y, handleContextMenu } = Menu()
    let menuRef = useRef()
    let groupUpdateRef = useRef()
    // let groupRef = useRef()
    const { boardId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        updateGroup(groupUpdate)
        // updateGroup(groupUpdate, board)
        setGroupIsClick({})
    }, [groupUpdate])

    const addTask = (ev) => {
        ev.preventDefault()
        onAddTask(task, group.id)
    }

    const onHandleCange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setTask((prevTask) => ({ ...prevTask, [field]: value }))
    }

    useEffect(() => {
        document.addEventListener("mousedown", eventListeners)
        return () => {
            document.removeEventListener("mousedown", eventListeners)
        }
    })

    const eventListeners = (ev) => {
        if (!menuRef.current?.contains(ev.target)) {
            document.removeEventListener('contextmenu', handleContextMenu)
            setIsClickGroup(false)
            setShowMenu(false)
            // setGroupIsClick({})
            setColActions(false)
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

    const onNewCol = () => {
        const newGroup = groupService.groupColAdd(group)
        updateGroup(newGroup)
    }

    const removeCol = (colIdx) => {
        console.log(group);
        const newGroup = groupService.groupColRemove(colIdx, group)
        updateGroup(newGroup)
    }

    const handleGroupCange = ({ target }) => {
        document.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault()
                const value = target.value
                const field = target.name
                setGroupUpdate((prevGroup) => ({ ...prevGroup, [field]: value }))
            }
        })
    }

    const onHeaderSort = (sortValue, colIdx) => {
        setIsReversedSort(!isReversedSort)
        const newGroup = boardService.groupHeadSort(sortValue, group, isReversedSort, colIdx)
        updateGroup(newGroup)
    }

    const onOpenColActions = (colIdx, groupId) => {
        setColActions({ colIdx: colIdx, groupId: groupId })
    }

    let columns = group.columns
    columns = columns.sort((a, b) => a.importance - b.importance)

    return <div className="board-content-wrapper">
        <div className="group-header-wrapper">
            <div className="group-header-component">
                <div className="group-header-title">
                    <div className="group-arrow-div" style={{ color: group.style.color }}>
                        <FaChevronCircleDown className="group-arrow" onClick={() => setIsClickGroup(!isClickGroup)} />
                    </div>
                    <div>{isClickGroup && <GroupMenu menuRef={menuRef} group={group} onRemoveGroup={onRemoveGroup} />}</div>
                    {(groupIsClick.boardId && groupIsClick.groupId === group.id) ?
                        <div>
                            <input type="text" ref={menuRef} defaultValue={group.title} onChange={handleGroupCange} name="title" style={{ color: group.style.color }} />
                        </div>
                        :
                        <div className="column-header column-header-title">
                            <h3 style={{ color: group.style.color }} onClick={(event) => onUpdateGroup(event, { boardId: board._id, groupId: group.id })}>{group.title}</h3>
                            <div onClick={() => onHeaderSort('title')} className="sort-header-menu hide-sort"><FaSort /></div>
                        </div>
                    }
                </div>

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
                    <button className="add-colomn-column-button" onClick={() => onNewCol()}><span>+</span></button>
                </div>
            </div>

            {group.tasks.map((task, idx) => {
                return <TasksList key={idx} boardId={boardId} task={task} /*menuRef={menuRef}*/ backgroundColor={group.style.color}
                    onHandleRightClick={onHandleRightClick} updateTask={updateTask} group={group} board={board} removeTask={removeTask} updateTaskDate={updateTaskDate} />
            })}

            <div className="group-main-input-container">
                <form onSubmit={addTask} className="main-group-input">
                    <div className="left-indicator-cell group-input-indicator" style={{ backgroundColor: group.style.color }}></div>
                    <input className="group-input" type="text" placeholder="+Add Item" onChange={onHandleCange} name="title" />
                    {task.title && <button className="submit-task-button">Add</button>}
                    <div className="right-indicator-input"></div>
                </form>
            </div>




            <div className="columns-footer-component">
                <div className="group-header-component">
                    <div className="group-header-title">
                        <div className="group-arrow-div" style={{ color: group.style.color }}>
                        </div>
                    </div>

                    <div className="group-footer-items">
                        {group.columns && group.columns.map((col, idx) => {
                            if (col.type === 'status') return <div key={idx} className="column-footer">
                                <ProgressBar group={group} board={board} />
                            </div>
                            else return <div key={idx}></div>
                        })}
                    </div>
                    <div className="add-colomn-column-button-container">
                        {/* <button className="add-colomn-column-button" onClick={() => onNewCol()}><span>+</span></button> */}
                    </div>
                </div>
            </div>



            {clickTask.isOpen && <TaskMenu clickTask={clickTask} />}
            <RightClickMenu x={x} y={y} showMenu={showMenu} />
        </div>
    </div>

}
