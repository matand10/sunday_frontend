import { useState, useRef, useEffect } from 'react'
import { FaCircle, FaRegUserCircle, FaStream } from 'react-icons/fa'
import { DetailsGroupKanbanMenu } from './kanban-details-group-menu'
import { GroupKanbanMenu } from './kanban-group-modal'
import { StatusModal } from './status-modal'


export function TaskDetails({ board, updateStatus, kanban, item, groupColor, onOpenDetails, updateTaskName, modalPos, setModalPos, onChangeGroup }) {
    const [isTaskClick, setIsTaskClick] = useState(false)
    const [groupMenuOpen, setGroupMenuOpen] = useState(false)
    const [statusActive, setStatusActive] = useState(false)


    const detailsRef = useRef()

    useEffect(() => {
        document.addEventListener("mousedown", eventListener)
        return () => {
            document.removeEventListener("mousedown", eventListener)
        }
    })

    const eventListener = (ev) => {
        if (!detailsRef.current?.contains(ev.target)) {
            setIsTaskClick(false)
            setGroupMenuOpen(false)
            setStatusActive(false)
        }
    }

    const onChangeTaskTitle = (ev) => {
        const value = ev.currentTarget.textContent
        updateTaskName(ev, item.taskId, item.groupId, value)
    }

    const toggleGroupMenu = (ev, value) => {
        const x = ev.pageX
        const y = ev.pageY
        setModalPos({ x: x, y: y })
        setGroupMenuOpen(value)
    }

    const specialUpdateTask = (value, colIdx = null, status = null) => {
        updateStatus(item.taskId, item.groupId, value)
    }

    return <div id="myModal" className="task-details-modal-container">
        <div className="task-details-modal-content">
            <span className="close" onClick={(event) => onOpenDetails(event, false, {})}>&times;</span>
            <div className="upper-area-modal">
                <div className="task-title-container">
                    <h2 ref={detailsRef} contentEditable suppressContentEditableWarning={true} className="task-title" onBlur={(event) => onChangeTaskTitle(event)}>{item.taskName}</h2>
                </div>
                <div className="task-board-details">
                    <h3>in → {board.title} board</h3>
                </div>
            </div>
            <div className="down-area-modal">
                <div className="group-details-container">
                    <div className="group-cell">
                        <div className="group-icon"><FaCircle /></div>
                        <div className="group-title">Group</div>
                    </div>
                    <div className="group-details-content" onClick={(ev) => toggleGroupMenu(ev, true)}>
                        <div style={{ backgroundColor: groupColor }} className="group-cell-color"></div>
                        <div className="group-name">{item.groupName}</div>
                    </div>
                    {groupMenuOpen && <GroupKanbanMenu board={board} taskId={item.taskId} onChangeGroup={onChangeGroup} />}
                </div>
                <div className="persons-details-container">
                    <div className="persons-cell">
                        <div className="persons-icon"><FaRegUserCircle /></div>
                        <div className="presons-title">Persons</div>
                    </div>
                    <div className='persons-details-content'>
                        <div className="task-person-name">{item.persons.length ?
                            <div className="task-person-item task-user-image-container">{item.persons.map((user, idx) => {
                                return <div key={idx} className="user-image">
                                    <img key={idx} style={{ left: `${20 * (idx) + 'px'}`, transform: `translateX(${-80 + '%'})` }} className="person-img-icon" src={user.imgUrl} alt="user image" />
                                </div>
                            })}
                            </div>
                            :
                            <div className="task-person-item">
                                <div className="user-image">
                                    <img className="person-image-icon" src="https://cdn.monday.com/icons/dapulse-person-column.svg" alt="user image" />
                                </div>
                            </div>}</div>
                    </div>
                </div>
                <div className="status-details-container">
                    <div className="status-cell">
                        <div className="status-icon"><FaStream /></div>
                        <div className="status-title">Status</div>
                    </div>
                    <div className="status-details-content" onClick={() => setStatusActive({ colIdx: 'colIdx' })}>
                        <div className="status-type" style={{ backgroundColor: kanban.color }}>{kanban.status}</div>
                    </div>
                </div>
            </div>
        </div>
        {statusActive && <StatusModal setStatusActive={setStatusActive} specialUpdateTask={specialUpdateTask} statusActive={statusActive} statusRef={detailsRef} modalPos={modalPos} />}
    </div>

}