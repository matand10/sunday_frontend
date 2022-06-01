import { FaRegUserCircle, FaRegCircle } from 'react-icons/fa'
import { useState } from 'react'
import { taskService } from '../services/task.service'


export const KanbanList = ({ kanban, status, onAddTask, board, updateBoard, setKanbanBoard }) => {
    const [task, setTask] = useState({ title: '', status })

    const handleAddChange = ({ target }) => {
        const field = target.name
        const value = target.value
        setTask((prevTask) => ({ ...prevTask, [field]: value }))
    }

    const addTaskKanban = async (ev) => {
        ev.preventDefault()
        const groupId = board.groups[0].id
        // let newBoard = { ...board }
        // let newTask = taskService.getEmptyTask(board.groups[0].columns)
        // newTask.title = task.title
        // newTask.columns[1].value = status
        // newBoard.groups[0].tasks.push(newTask)
        // setKanbanBoard(newBoard)

        let newBoard = await taskService.addTask(board, task, groupId)
        updateBoard(newBoard)

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
                                    <div>{item.taskName}</div>
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