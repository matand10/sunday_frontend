import { Menu } from '../hooks/right-click-menu'
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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { MdDragIndicator } from 'react-icons/md'


export const GroupList = ({ snapshot, provided, onDragColEnd, updateTask, updateBoard, updates, updateStatistics, board, group, onAddTask, onRemoveGroup, removeTask, updateGroup, updateTaskDate }) => {
    const [task, setTask] = useState({ title: '' })
    const [groupIsClick, setGroupIsClick] = useState({})
    const [isClickGroup, setIsClickGroup] = useState(false)
    const [groupUpdate, setGroupUpdate] = useState(group)
    const [boardUpdate, setBoardUpdate] = useState(board)
    const [arrowTask, setArrowTask] = useState({})
    const [clickTask, setClickTask] = useState({ task: '', isOpen: false })
    const [modal, setModal] = useState({})
    const [showMenu, setShowMenu] = useState(false)
    const [isReversedSort, setIsReversedSort] = useState(false)
    const [colActions, setColActions] = useState({ colIdx: '', groupId: '' })
    const [isAddCol, setIsAddCol] = useState(false)
    const [isTitleChange, setIsTitleChange] = useState(false)
    const [colTitle, setColTitle] = useState('')

    const { x, y, handleContextMenu } = Menu()
    let menuRef = useRef()
    let groupUpdateRef = useRef()
    let groupRef = useRef()
    const { boardId } = useParams()
    const dispatch = useDispatch()


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
            setIsTitleChange(false)
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
        const newBoard = groupService.groupColAdd(board, value)
        updateBoard(newBoard)
        setIsAddCol(false)
    }

    const removeCol = (colIdx) => {
        const newBoard = groupService.groupColRemove(colIdx, board)
        updateBoard(newBoard)
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

    const changeColTitle = (ev, colIdx) => {
        ev.preventDefault()
        const newBoard = boardService.changeColTitle(colIdx, colTitle, board)

        updateBoard(board)
        setIsTitleChange(false)
    }

    const handleColTitleChange = ({ target }) => {
        setColTitle(target.value)
    }

    let columns = board.columns

    if (!board) return <h1>Loading...</h1>

    const onDragTaskEnd = (res) => {
        console.log('res', res);
        const newBoard = { ...board }
        const groupSource = newBoard.groups.find(group => group.id === res.source.droppableId)
        console.log('groupSource', groupSource);
        const newTasks = Array.from(group.tasks);
        const [removed] = newTasks.splice(res.source.index, 1);
        newTasks.splice(res.destination.index, 0, removed);
        let newGroup = { ...group }
        newGroup.tasks = newTasks
        setGroupUpdate(newGroup)
        updateGroup(newGroup)
    };

    return <section ref={provided.innerRef}
        snapshot={snapshot}
        {...provided.draggableProps}
        className="board-content-wrapper">
        <div className="group-header-wrapper">
            <div className="group-header-component">
                <div className="group-header-title">
                    <div className="group-arrow-div" style={{ color: group.style.color }}>
                        <FaChevronCircleDown className="group-arrow" onClick={() => setIsClickGroup(!isClickGroup)} />
                    </div>
                    <div>
                        {isClickGroup && <GroupMenu setIsClickGroup={setIsClickGroup} updateGroup={updateGroup} menuRef={menuRef} group={group} onRemoveGroup={onRemoveGroup} />}
                    </div>
                    <div className="column-header column-header-title">
                        <div {...provided.dragHandleProps} className="drag-handle-group"><MdDragIndicator /></div>
                        <h3 style={{ color: group.style.color }} contentEditable={true} suppressContentEditableWarning={true} onBlur={(ev) => changeGroupTitle(ev)}>{group.title}</h3>
                        <div onClick={() => onHeaderSort('title')} className="sort-header-menu hide-sort"><FaSort /></div>
                    </div>
                </div>

                <div className="flex coulmn-main-header-container">
                    <DragDropContext onDragEnd={onDragColEnd}>
                        <Droppable droppableId="droppable" direction="horizontal">
                            {(provided) => (

                                <div className="group-header-items" {...provided.droppableProps} ref={provided.innerRef}>

                                    {columns.map((col, idx) => {
                                        return <Draggable draggableId={col.id.toString()} key={col.id} index={idx}>
                                            {(provided, snapshot) => (

                                                <div ref={provided.innerRef}
                                                    snapshot={snapshot}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps} className="column-header">
                                                    <div onClick={() => onHeaderSort(col.type, idx)} className="sort-header-menu hide-sort">
                                                        <FaSort />
                                                    </div>
                                                    <div className="flex column-header-bottom">
                                                        <div {...provided.dragHandleProps} className="drag-handle-col"><MdDragIndicator /></div>
                                                        {isTitleChange && col.id === isTitleChange ?
                                                            <div className="header-editable-container">
                                                                <form onSubmit={(event) => changeColTitle(event, idx)} className="header-editable-input">
                                                                    <input type="text" name="title" defaultValue={col.title} onChange={handleColTitleChange} ref={menuRef} />
                                                                </form>
                                                            </div>
                                                            :
                                                            <div onClick={() => setIsTitleChange(col.id)}>
                                                                {col.title}
                                                            </div>
                                                        }
                                                        <div className="col-arrow-container">
                                                            <div className="col-arrow-div" onClick={() => onOpenColActions(idx, group.id)} > <FaCaretDown className="col-arrow" /></div>
                                                        </div>
                                                        {colActions.colIdx === idx && colActions.groupId === group.id && <ColMenu setGroupIsClick={setGroupIsClick} setcolActions={setColActions} menuRef={menuRef} removeCol={removeCol} colActions={colActions} />}
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>



                    <div className="add-colomn-column-button-container">
                        <button className="add-colomn-column-button" onClick={() => {
                            setIsAddCol(!isAddCol)
                        }}><span>+</span></button>
                        {isAddCol && <ColAddMenu menuRef={menuRef} onNewCol={onNewCol} />}
                    </div>
                </div>
            </div>

            <DragDropContext onDragEnd={onDragTaskEnd}>
                <Droppable droppableId="list">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {group.tasks.map((task, idx) => {
                                return <Draggable draggableId={task.id.toString()} key={task.id} index={idx}>
                                    {(provided, snapshot) => (
                                        <TasksList provided={provided}
                                            snapshot={snapshot} taskIdx={idx} boardId={boardId} task={task} /*menuRef={menuRef}*/ backgroundColor={group.style.color}
                                            updateGroup={updateGroup} updates={updates} updateBoard={updateBoard} onHandleRightClick={onHandleRightClick} updateTask={updateTask} group={group} board={board} removeTask={removeTask} updateTaskDate={updateTaskDate} />
                                    )}
                                </Draggable>
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            <MainGroupInput onAddTask={onAddTask} group={group} task={task} />
            <div className="columns-footer-component">
                <div className="group-footer-container">
                    <div className="group-footer-items">
                        {columns && columns.map((col, idx) => {
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
                <div style={{ width: '15px', height: '15px' }}></div>
            </div>
            <RightClickMenu x={x} y={y} showMenu={showMenu} />

        </div>
    </section>

}
