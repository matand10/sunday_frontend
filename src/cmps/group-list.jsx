import { utilService } from "../services/util.service";
import { Menu } from '../hooks/right-click-menu'
import { RightClickMenu } from '../modal/right-click-menu'
import { useRef, useEffect, useState } from 'react';
import { FaChevronCircleDown, FaCaretDown } from 'react-icons/fa'
import { GroupMenu } from './group-menu'
import { TaskMenu } from './task-menu'
import { TasksList } from './tasks-list.jsx'
import { useParams } from "react-router-dom";


export const GroupList = ({ updateTask, board, group, onAddTask, onRemoveGroup, removeTask }) => {
    const [task, setTask] = useState({ title: '' })
    const [isClickGroup, setIsClickGroup] = useState(false)
    const [arrowTask, setArrowTask] = useState({})
    const [clickTask, setClickTask] = useState({ task: '', isOpen: false })
    const [modal, setModal] = useState({})
    const [showMenu, setShowMenu] = useState(false)
    const { x, y, handleContextMenu } = Menu()
    let menuRef = useRef()
    let groupRef = useRef()
    const { boardId } = useParams()


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


    return <div className="board-content-wrapper">
        <div className="board-content-wrapper">
            <div className="group-header-wrapper">
                <div className="group-header-component">
                    <div className="group-header-title">
                        <div className="group-arrow-div" style={{ color: group.style.color }} ref={groupRef}><FaChevronCircleDown className="group-arrow" onClick={() => setIsClickGroup(!isClickGroup)} /></div>
                        <div ref={groupRef}>{isClickGroup && <GroupMenu group={group} onRemoveGroup={onRemoveGroup} />}</div>
                        <div><h3 style={{ color: group.style.color }}>{group.title}</h3></div>
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
