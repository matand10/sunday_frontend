
import { utilService } from "../services/util.service";
import { Menu } from '../hooks/right-click-menu'
import { RightClickMenu } from '../modal/right-click-menu'
import { useRef, useEffect, useState } from 'react';
import { SidePanel } from "./side-panel"
import { FaChevronCircleDown, FaCaretDown } from 'react-icons/fa'
import { GroupMenu } from './group-menu'
import { TaskMenu } from './task-menu'


export const GroupList = ({ updateTask,board, group, onAddTask, onRemoveGroup }) => {
    const [task, setTask] = useState({ title: '' })
    const [isClickGroup, setIsClickGroup] = useState(false)
    const [arrowTask, setArrowTask] = useState({})
    const [modal, setModal] = useState({})
    const [showMenu, setShowMenu] = useState(false)
    const [updateIsClick, setUpdateIsClick] = useState({})
    const { x, y, handleContextMenu } = Menu()
    let menuRef = useRef()

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

    const onOpenModal = (params) => {
        setModal(params)
    }

    const onOpenMenu = (params) => {
        setArrowTask(params)
    }


    const onUpdateTask = (ev,params) => {
        ev.stopPropagation()
        setUpdateIsClick(params)
    }
    
    const handleChange=({target})=>{
        document.addEventListener("keydown",(event)=>{
           if(event.key==="Enter") {
               event.preventDefault()
               const value=target.value
               updateTask(value,updateIsClick.task,updateIsClick.groupId,updateIsClick.boardId)
               setUpdateIsClick({})
           }
        })

    }


    return <div className="group">
        <div className="head">
            <div className="group-arrow-div"><FaChevronCircleDown className="group-arrow" onClick={() => setIsClickGroup(!isClickGroup)} /></div>
            {isClickGroup && <GroupMenu menuRef={menuRef} group={group} onRemoveGroup={onRemoveGroup} boardId={board._id}/>}
            <div>{group.title}</div>
            <div>Person</div>
            <div>Status</div>
            <div>Date</div>
        </div>
        {group.tasks.map((task, idx) => {
            // return <section key={idx} className="group-row" ref={menuRef} onContextMenu={(ev) => onHandleRightClick(ev, task, true)}>
            return <div key={task.title} className="group-row"
                ref={menuRef} onContextMenu={(ev) => onHandleRightClick(ev, task)}>
                <div className="task-arrow-div" onClick={(event) => onOpenMenu(task.id, event)} ><FaCaretDown className="task-arrow" /></div>
                {(updateIsClick.boardId && updateIsClick.groupId === group.id && updateIsClick.task.id === task.id ) ?
                    <div className="title-update-input">
                        <input type="text" defaultValue={task.title} onChange={handleChange}/>
                    </div>
                    :
                    <div onClick={() => onOpenModal({ boardId: board._id, groupId: group.id, task: task })} className="task-title-content">
                        {task.title}
                        <div>
                            <button onClick={(event)=>onUpdateTask(event,{ boardId: board._id, groupId: group.id, task: task })} className="edit-button">Edit</button>
                        </div>
                    </div>
                }

                <div>{task.assignedTo.map(member => member.fullname + ' ')}</div>
                <div className="status" style={{ backgroundColor: task.status.color }}>{task.status.title}</div>
                <div>{task.archivedAt ? utilService.getCurrTime(task.archivedAt) : ''}</div>
                {arrowTask.boardId && arrowTask.groupId === group.id && arrowTask.task.id === task.id && <TaskMenu arrowTask={arrowTask} onOpenMenu={onOpenMenu} />}
            </div>
        })}

        <div>
            <form onSubmit={addTask}>
                <input type="text" placeholder="+Add Item" onChange={onHandleCange} name="title" />
                {task.title && <button>Add</button>}
            </form>
        </div>
        <RightClickMenu x={x} y={y} showMenu={showMenu} />
        {modal.boardId && <SidePanel modal={modal} onOpenModal={onOpenModal} />}
    </div>
}