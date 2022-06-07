import { FaRegUserCircle, FaRegCircle } from 'react-icons/fa'
import { useEffect, useState, useRef } from 'react'
import { boardService } from '../services/board.service'
import { taskService } from '../services/task.service'
import { GroupKanbanMenu } from '../modal/kanban-group-modal'
import { TaskDetails } from '../modal/kanban-task-details'
import { groupService } from '../services/group.service'
import { Avatar, AvatarGroup } from '@mui/material'


export const KanbanList = ({ provided, snapshot, status, board, setUpdatedBoard, onUpdate, item, idx, onOpenDetails, setGroupMenuOpen }) => {
    const [task, setTask] = useState({ title: '', status })
    const [isTaskNameClick, setIsTaskNameClick] = useState({})
    const [modalPos, setModalPos] = useState({ x: null, y: null })
    let groupMenuRef = useRef()

    const updateTaskName = (ev, taskId, groupId, title) => {
        ev.preventDefault()
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        let taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === taskId)
        let newBoard = { ...board }
        newBoard.groups[groupIdx].tasks[taskIdx].title = title
        setUpdatedBoard(newBoard)
        onUpdate(newBoard)
        setIsTaskNameClick({})
    }

    const toggleGroupMenu = (ev, value) => {
        ev.stopPropagation()
        const x = ev.pageX
        const y = ev.pageY
        setModalPos({ x: x, y: y })
        setGroupMenuOpen(value)
    }

    const onChangeTaskTitle = (ev, taskId, groupId) => {
        const value = ev.currentTarget.textContent
        updateTaskName(ev, taskId, groupId, value)
    }

    return (
        <section ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}>
            <div key={idx} className="kanban-task-content" onClick={(event) => onOpenDetails(event, item)}>
                <div className="task-name-content">
                    <h4 contentEditable suppressContentEditableWarning={true} onBlur={(event) => onChangeTaskTitle(event, item.taskId, item.groupId)} onClick={(event) => (event.stopPropagation())}>{item.taskName}</h4>
                </div>
                <div className="task-down-phase">
                    <div className="task-person-content">
                        <div className="text-component">
                            <div className="flex align-items gap">
                                <FaRegUserCircle />
                                Members
                            </div>
                        </div>
                        <div className="task-person-name">{item.persons.length ?
                            <AvatarGroup>
                                <div className="task-user-image-container">{item.persons.map((user, idx) => {
                                    return <Avatar style={{ marginLeft: -8 }} className="kanban-user-image" key={idx} alt={user.fullname} src={user.userImg} sx={{ width: 28, height: 28 }} />
                                })}
                                </div>
                            </AvatarGroup>
                            :
                            <div className="task-person-item">
                                <div className="user-image">
                                    <img className="user-image-icon" src="https://cdn.monday.com/icons/dapulse-person-column.svg" alt="user image" />
                                </div>
                            </div>}</div>
                    </div>
                    <div className="task-group-name">
                        <div className="text-group-component"><FaRegCircle /> Group</div>
                        <div className="group-color-container" onClick={(event) => toggleGroupMenu(event, item.taskId)}>
                            <div className="color-group-component" style={{ backgroundColor: item.groupColor }}></div>
                            <div className="group-cell-component">
                                <div className="group-cell-component-items">
                                    {item.groupName}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {provided.placeholder}

        </section >
    )
}