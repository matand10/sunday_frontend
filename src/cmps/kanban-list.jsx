import { FaRegUserCircle, FaRegCircle } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { boardService } from '../services/board.service'
import { taskService } from '../services/task.service'


export const KanbanList = ({ kanban, status, onAddTask, board, updateBoard, setKanbanBoard, updateTask,onUpdatTaskName }) => {
    const [task, setTask] = useState({ title: '', status })
    const [taskTitle, setTaskTitle] = useState('')
    const [isTaskNameClick, setIsTaskNameClick] = useState({})


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
        onUpdatTaskName(newBoard)
    }

    const handleTaskNameChange = ({ target }) => {
        const field = target.name
        const value = target.value
        setTaskTitle((prevTask) => ({ ...prevTask, [field]: value }))
    }

    const updateTaskName = (ev, taskId, groupId) => {
        ev.preventDefault()
        const groupIdx=board.groups.findIndex(group=>group.id===groupId)
        let taskIdx=board.groups[groupIdx].tasks.findIndex(task=>task.id===taskId)
        let newBoard = {...board}
        newBoard.groups[groupIdx].tasks[taskIdx].title=taskTitle.title
        updateBoard(newBoard)
        onUpdatTaskName(newBoard)
        setIsTaskNameClick({})
    }

    const setUpdateClick = (ev, params) => {
        ev.stopPropagation()
        setIsTaskNameClick(params)
    }

    return (
        <section>
            <div className="kanban-container">
                <div className="kanban-column-content" style={{ backgroundColor: status.color }}>
                    <div className="kanban-column-name">{status.title} / {(!kanban[status.title]?.length) ? '0' : kanban[status.title].length}</div>
                    <div className="kanban-tasks-container">

                        {kanban[(status.title === 'Working on it') ? status.title = 'WorkingOnIt' : status.title] && kanban[(status.title === 'Working on it') ? status.title = 'WorkingOnIt' : status.title].map((item, idx) => {
                            return <div key={idx} className="kanban-task-content">
                                <div className="task-name-content">
                                    {(isTaskNameClick.boardId && isTaskNameClick.groupId === item.groupId && isTaskNameClick.taskId === item.taskId) ?
                                        <div>
                                            <form onSubmit={(event) => updateTaskName(event, item.taskId, item.groupId)}>
                                                <input type="text" name="title" defaultValue={item.taskName} onChange={handleTaskNameChange} onClick={(event) => (event.stopPropagation())}/>
                                            </form>
                                        </div>
                                        :
                                        <div>
                                            <div onClick={(event) => setUpdateClick(event, { boardId: board._id, groupId: item.groupId, taskId: item.taskId })}>{item.taskName}</div>
                                        </div>
                                    }
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
                                        <div className='group-color-container'>
                                            <div className='color-group-component' style={{ backgroundColor: item.groupColor }}></div>
                                            <div className='group-cell-component'>{item.groupName}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })}
                        <div className="column-main-input-container">
                            <form className="main-column-input" onSubmit={addTaskKanban}>
                                <input className="column-input" type="text" placeholder="+Add Item" name="title" onChange={handleAddChange} />
                                {task.title && <button className="add-task-button" style={{ backgroundColor: status.color }}>Add</button>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}