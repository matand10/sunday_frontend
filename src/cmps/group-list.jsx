import { utilService } from "../services/util.service";
import { Menu } from '../hooks/right-click-menu'
import { RightClickMenu } from '../modal/right-click-menu'
import { useRef, useEffect, useState } from 'react';
import { FaChevronCircleDown, FaCaretDown } from 'react-icons/fa'
import { GroupMenu } from './group-menu'
import { TaskMenu } from './task-menu'
import { TasksList } from './tasks-list.jsx'
import { useParams } from "react-router-dom";


export const GroupList = ({ updateTask, board, group, onAddTask, onRemoveGroup, removeTask,updateGroup }) => {
    const [task, setTask] = useState({ title: '' })
    const [groupIsClick, setGroupIsClick] = useState({})
    const [isClickGroup, setIsClickGroup] = useState(false)
    const [groupUpdate, setGroupUpdate] = useState(group)
    const [arrowTask, setArrowTask] = useState({})
    const [clickTask, setClickTask] = useState({ task: '', isOpen: false })
    const [modal, setModal] = useState({})
    const [showMenu, setShowMenu] = useState(false)
    const { x, y, handleContextMenu } = Menu()
    let menuRef = useRef()
    let groupRef = useRef()
    const { boardId } = useParams()

    useEffect(() => {
        updateGroup(groupUpdate,board)
        setGroupIsClick({})
    }, [groupUpdate])

    const addTask = (ev) => {
        ev.preventDefault()
        onAddTask(board,task, group.id)
    }

    const onHandleCange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setTask((prevTask) => ({ ...prevTask, [field]: value }))
    }

    useEffect(() => {
        document.addEventListener("mousedown", (event) => {
            if (!groupRef.current?.contains(event.target)) {
                setIsClickGroup(false)
            }
            if (!menuRef.current?.contains(event.target)) {
                document.removeEventListener('contextmenu', handleContextMenu)
                setShowMenu(false)
            }
        })
    })

    const onHandleRightClick = (ev, task, value) => {
        // If you want to use taskId or more manipulation...
        setShowMenu(value)
    }

    const onOpenMenu = (params) => {
        setArrowTask(params)
    }

    const onUpdateGroup = (ev, params) => {
        ev.stopPropagation()
        setGroupIsClick(params)
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








    // return <div className="group">
    //     <div className="head">
    //         <div className="group-arrow-div"><FaChevronCircleDown className="group-arrow" onClick={() => setIsClickGroup(!isClickGroup)} /></div>
    //         {isClickGroup && <GroupMenu menuRef={menuRef} group={group} onRemoveGroup={onRemoveGroup} boardId={board._id}/>}
    //         <div>{group.title}</div>
    //         <div>Person</div>
    //         <div>Status</div>
    //         <div>Date</div>
    //     </div>
    //     {group.tasks.map((task, idx) => {
    //         // return <section key={idx} className="group-row" ref={menuRef} onContextMenu={(ev) => onHandleRightClick(ev, task, true)}>
    //         return <div key={task.title} className="group-row"
    //             ref={menuRef} onContextMenu={(ev) => onHandleRightClick(ev, task)}>
    //             <div className="task-arrow-div" onClick={(event) => onOpenMenu(task.id, event)} ><FaCaretDown className="task-arrow" /></div>
    //             {(updateIsClick.boardId && updateIsClick.groupId === group.id && updateIsClick.task.id === task.id ) ?
    //                 <div className="title-update-input">
    //                     <input type="text" defaultValue={task.title} onChange={handleChange}/>
    //                 </div>
    //                 :
    //                 <div onClick={() => onOpenModal({ boardId: board._id, groupId: group.id, task: task })} className="task-title-content">
    //                     {task.title}
    //                     <div>
    //                         <button onClick={(event)=>onUpdateTask(event,{ boardId: board._id, groupId: group.id, task: task })} className="edit-button">Edit</button>
    //                     </div>
    //                 </div>
    //             }
    return <div className="board-content-wrapper">
        <div className="board-content-wrapper">
            <div className="group-header-wrapper">
                <div className="group-header-component">
                    <div className="group-header-title">
                        <div className="group-arrow-div" style={{ color: group.style.color }}><FaChevronCircleDown className="group-arrow" onClick={() => setIsClickGroup(!isClickGroup)} /></div>
                        <div>{isClickGroup && <GroupMenu menuRef={menuRef} group={group} onRemoveGroup={onRemoveGroup} />}</div>
                        {(groupIsClick.boardId && groupIsClick.groupId === group.id) ?
                            <div>
                                <input type="text" defaultValue={group.title} onChange={handleGroupCange} name="title" style={{ color: group.style.color }}/>
                            </div>
                            :
                            <div><h3 style={{ color: group.style.color }} onClick={(event) => onUpdateGroup(event, { boardId: board._id, groupId: group.id })}>{group.title}</h3></div>
                        }
                    </div>
                    <div className="group-header-items">
                        <div>Person</div>
                        <div>Status</div>
                        <div>Date</div>
                    </div>
                </div>

                {group.tasks.map((task, idx) => {
                    return <TasksList key={idx} boardId={boardId} task={task} menuRef={menuRef} backgroundColor={group.style.color}
                        onHandleRightClick={onHandleRightClick} updateTask={updateTask} group={group} board={board} />
                })}

                <div>
                    <form onSubmit={addTask}>
                        <input type="text" placeholder="+Add Item" onChange={onHandleCange} name="title" />
                        {task.title && <button>Add</button>}
                    </form>
                </div>
                {clickTask.isOpen && <TaskMenu clickTask={clickTask} />}
                <RightClickMenu x={x} y={y} showMenu={showMenu} />
            </div>
        </div >
    </div>

}
