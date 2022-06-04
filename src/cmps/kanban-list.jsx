import { FaRegUserCircle, FaRegCircle } from 'react-icons/fa'
import { useEffect, useState, useRef } from 'react'
import { boardService } from '../services/board.service'
import { taskService } from '../services/task.service'
import { GroupKanbanMenu } from '../modal/kanban-group-modal'
import { TaskDetails } from '../modal/kanban-task-details'
import { groupService } from '../services/group.service'


export const KanbanList = ({ kanban, status, onAddTask, board, updateBoard, setKanbanBoard, updateTask, onUpdate }) => {
    const [task, setTask] = useState({ title: '', status })
    // const [taskTitle, setTaskTitle] = useState('')
    const [isTaskNameClick, setIsTaskNameClick] = useState({})
    const [modalPos, setModalPos] = useState({ x: null, y: null })
    const [groupMenuOpen, setGroupMenuOpen] = useState(false)
    const [openDetails, setOpenDetails] = useState({})
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)
    let groupMenuRef = useRef()

    const handleAddChange = ({ target }) => {
        const field = target.name
        const value = target.value
        setTask((prevTask) => ({ ...prevTask, [field]: value }))
    }

    const addTaskKanban = async (ev) => {
        ev.preventDefault()
        const groupId = board.groups[0].id
        let newBoard = await taskService.addTask(board, task, groupId)
        updateBoard(newBoard)
        onUpdate(newBoard)
    }

    // const handleTaskNameChange = ({ target }) => {
    //     const field = target.name
    //     const value = target.value
    //     setTaskTitle((prevTask) => ({ ...prevTask, [field]: value }))
    // }

    const updateTaskName = (ev, taskId, groupId, title) => {
        ev.preventDefault()
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        let taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === taskId)
        let newBoard = { ...board }
        newBoard.groups[groupIdx].tasks[taskIdx].title = title
        updateBoard(newBoard)
        onUpdate(newBoard)
        setIsTaskNameClick({})
    }

    const updateStatus = (taskId, groupId, value) => {
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        let taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === taskId)
        let newBoard = { ...board }
        const colIdx = board.columns.findIndex(col => col.id === 'col2')
        const col = board.groups[groupIdx].tasks[taskIdx].columns[colIdx]
        const previewCol = { ...col }
        col.value = value
        newBoard.groups[groupIdx].tasks[taskIdx].columns[colIdx].value = value
        newBoard.groups[groupIdx].progress = groupService.getProgress(newBoard.groups[groupIdx])
        const activity = boardService.documentActivities(col, previewCol.value, task.title)
        board.activities.unshift(activity)
        updateBoard(newBoard)
        onUpdate(newBoard)
    }

    const setUpdateClick = (ev, params) => {
        ev.stopPropagation()
        setIsTaskNameClick(params)
    }

    const toggleGroupMenu = (ev, value) => {
        ev.stopPropagation()
        const x = ev.pageX
        const y = ev.pageY
        setModalPos({ x: x, y: y })
        setGroupMenuOpen(value)
    }

    useEffect(() => {
        document.addEventListener("mousedown", eventListener)
        return () => {
            document.removeEventListener("mousedown", eventListener)
        }
    }, [])

    const eventListener = (ev) => {
        if (!groupMenuRef.current?.contains(ev.target)) {
            setGroupMenuOpen(false)
            setIsTaskNameClick({})
        }
    }

    const onOpenDetails = (ev, idx) => {
        ev.stopPropagation()
        // setOpenDetails(params)
        setIsDetailsOpen(idx)
    }

    const onChangeTaskTitle = (ev, taskId, groupId) => {
        const value = ev.currentTarget.textContent
        updateTaskName(ev, taskId, groupId, value)
    }

    return (
        <section>
            <div className="kanban-container">
                <div className="kanban-column-content" style={{ backgroundColor: kanban[status].color }}>
                    <div className="kanban-column-name">{kanban[status].status} / {(!kanban[status].kanban?.length) ? '0' : kanban[status].kanban.length}</div>
                    <div className="kanban-tasks-container">

                        {kanban[status].kanban.map((item, idx) => {
                            return <div key={idx} className="kanban-task-content" onClick={(event) => onOpenDetails(event, idx/*, { boardId: board._id, groupId: item.groupId, taskId: item.taskId}*/)}>
                                <div className="task-name-content">
                                    <h4 contentEditable suppressContentEditableWarning={true} onBlur={(event) => onChangeTaskTitle(event, item.taskId, item.groupId)} onClick={(event) => (event.stopPropagation())}>{item.taskName}</h4>
                                </div>
                                <div className="task-down-phase">
                                    <div className='task-person-content'>
                                        <div className='text-component'><FaRegUserCircle /> Persons</div>
                                        <div className="task-person-name">{item.persons.length ?
                                            <div className="task-person-item task-user-image-container">{item.persons.map((user, idx) => {
                                                return <div key={idx} className="user-image">
                                                    <img key={idx} style={{ left: `${20 * (idx) + 'px'}`, transform: `translateX(${-80 + '%'})` }} className="user-img-icon" src={user.imgUrl} alt="user image" />
                                                </div>
                                            })}
                                            </div>
                                            :
                                            <div className="task-person-item">
                                                <div className="user-image">
                                                    <img className="user-image-icon" src="https://cdn.monday.com/icons/dapulse-person-column.svg" alt="user image" />
                                                </div>
                                            </div>}</div>
                                    </div>
                                    <div className="task-group-name">
                                        <div className='text-group-component'><FaRegCircle /> Group</div>
                                        <div className='group-color-container' onClick={(event) => toggleGroupMenu(event, item.taskId)}>
                                            <div className='color-group-component' style={{ backgroundColor: item.groupColor }}></div>
                                            <div className='group-cell-component'>{item.groupName}</div>
                                        </div>
                                    </div>
                                </div>
                                {groupMenuOpen === item.taskId && <GroupKanbanMenu board={board} groupMenuRef={groupMenuRef} taskId={item.taskId} currGroupId={item.groupId} updateBoard={updateBoard}
                                    onUpdatTaskName={onUpdate} modalPos={modalPos} setGroupMenuOpen={setGroupMenuOpen} />}
                                {isDetailsOpen === idx &&
                                    <TaskDetails updateStatus={updateStatus} board={board} item={item} kanban={kanban[status]} onOpenDetails={onOpenDetails} updateTaskName={updateTaskName} updateBoard={updateBoard} onUpdatTaskName={onUpdate} modalPos={modalPos} setModalPos={setModalPos} />
                                    // <TaskDetails board={board} taskName={item.taskName} taskId={item.taskId} status={status.title} statusColor={status.color} persons={item.persons} groupName={item.groupName} groupId={item.groupId} groupColor={item.groupColor} onOpenDetails={onOpenDetails} updateTaskName={updateTaskName} updateBoard={updateBoard} onUpdatTaskName={onUpdatTaskName} modalPos={modalPos} setModalPos={setModalPos} />
                                }
                            </div>
                        })}
                        <div className="column-main-input-container">
                            <form className="main-column-input" onSubmit={addTaskKanban}>
                                <input className="column-input" type="text" placeholder="+Add Item" name="title" onChange={handleAddChange} />
                                {task.title && <button className="add-task-button" style={{ backgroundColor: kanban[status].color }}>Add</button>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
    // return (
    //     <section>
    //         <div className="kanban-container">
    //             <div className="kanban-column-content" style={{ backgroundColor: status.color }}>
    //                 <div className="kanban-column-name">{status.type} / {(!kanban[status.type]?.length) ? '0' : kanban[status.type].length}</div>
    //                 <div className="kanban-tasks-container">

    //                     {kanban[(status.type === 'Working on it') ? status.type = 'WorkingOnIt' : status.type] && kanban[(status.type === 'Working on it') ? status.type = 'WorkingOnIt' : status.type].map((item, idx) => {
    //                         return <div key={idx} className="kanban-task-content" onClick={(event) => onOpenDetails(event, idx/*, { boardId: board._id, groupId: item.groupId, taskId: item.taskId}*/)}>
    //                             <div className="task-name-content">
    //                                 <h4 contentEditable suppressContentEditableWarning={true} onBlur={(event) => onChangeTaskTitle(event, item.taskId, item.groupId)} onClick={(event) => (event.stopPropagation())}>{item.taskName}</h4>
    //                             </div>
    //                             <div className="task-down-phase">
    //                                 <div className='task-person-content'>
    //                                     <div className='text-component'><FaRegUserCircle /> Persons</div>
    //                                     <div className="task-person-name">{item.persons.length ?
    //                                         <div className="task-person-item task-user-image-container">{item.persons.map((user, idx) => {
    //                                             return <div key={idx} className="user-image">
    //                                                 <img key={idx} style={{ left: `${20 * (idx) + 'px'}`, transform: `translateX(${-80 + '%'})` }} className="user-img-icon" src={user.imgUrl} alt="user image" />
    //                                             </div>
    //                                         })}
    //                                         </div>
    //                                         :
    //                                         <div className="task-person-item">
    //                                             <div className="user-image">
    //                                                 <img className="user-image-icon" src="https://cdn.monday.com/icons/dapulse-person-column.svg" alt="user image" />
    //                                             </div>
    //                                         </div>}</div>
    //                                 </div>
    //                                 <div className="task-group-name">
    //                                     <div className='text-group-component'><FaRegCircle /> Group</div>
    //                                     <div className='group-color-container' onClick={(event) => (event.stopPropagation())}>
    //                                         <div className='color-group-component' style={{ backgroundColor: item.groupColor }}></div>
    //                                         <div className='group-cell-component' onClick={(ev) => toggleGroupMenu(ev, true)} >{item.groupName}</div>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                             {groupMenuOpen && <GroupKanbanMenu board={board} groupMenuRef={groupMenuRef} taskId={item.taskId} currGroupId={item.groupId} updateBoard={updateBoard}
    //                                 onUpdatTaskName={onUpdatTaskName} modalPos={modalPos} setGroupMenuOpen={setGroupMenuOpen} />}
    //                             {isDetailsOpen === idx &&
    //                                 <TaskDetails board={board} taskName={item.taskName} taskId={item.taskId} status={status.title} statusColor={status.color} persons={item.persons} groupName={item.groupName} groupId={item.groupId} groupColor={item.groupColor} onOpenDetails={onOpenDetails} updateTaskName={updateTaskName} updateBoard={updateBoard} onUpdatTaskName={onUpdatTaskName} modalPos={modalPos} setModalPos={setModalPos} />
    //                             }
    //                         </div>
    //                     })}
    //                     <div className="column-main-input-container">
    //                         <form className="main-column-input" onSubmit={addTaskKanban}>
    //                             <input className="column-input" type="text" placeholder="+Add Item" name="title" onChange={handleAddChange} />
    //                             {task.title && <button className="add-task-button" style={{ backgroundColor: status.color }}>Add</button>}
    //                         </form>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </section>
    // )
}