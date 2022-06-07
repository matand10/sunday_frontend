import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { kanbanService } from '../services/kanban.service'
import { KanbanList } from '../cmps/kanban-list'
import { boardService } from '../services/board.service'
import { taskService } from "../services/task.service"
import { GroupKanbanMenu } from "../modal/kanban-group-modal"
import { TaskDetails } from "../modal/kanban-task-details"
import { groupService } from "../services/group.service"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { MdDragIndicator } from 'react-icons/md'


export const KanbanBoard = () => {
    const { board, onAddTask, updateBoard, updateTask, kanban, setKanban } = useOutletContext()
    const [modalPos, setModalPos] = useState({ x: null, y: null })
    const [task, setTask] = useState({ title: '' })
    const [groupMenuOpen, setGroupMenuOpen] = useState(false)
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)
    const [isWriteNew, setIsWriteNew] = useState(false)
    const [isEditNewTask, setIsEditNewTask] = useState(false)
    const [updatedadBoard, setUpdatedBoard] = useState(board)


    useEffect(() => {
        // if (!board) return
        setKanban(kanbanService.getKanban(board))
        return () => {
            updateBoard(updatedadBoard)
        }
    }, [])

    const onUpdate = (newBoard) => {
        setKanban(kanbanService.getKanban(newBoard))
    }

    const addTaskKanban = async (ev, status) => {
        ev.preventDefault()
        const groupId = board.groups[0].id
        let newBoard = await taskService.addTask(board, { title: task.title, status: status.status }, groupId,)
        // updateBoard(newBoard)
        onUpdate(newBoard)
        setIsEditNewTask(false)
        setUpdatedBoard(newBoard)
    }

    const handleAddChange = ({ target }, status) => {
        const field = target.name
        const value = target.value
        setTask((prevTask) => ({ ...prevTask, [field]: value }))
        setIsWriteNew(status)
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
        // updateBoard(newBoard)
        onUpdate(newBoard)
        setUpdatedBoard(newBoard)
    }

    const onOpenDetails = (ev, idx) => {
        ev.stopPropagation()
        setIsDetailsOpen(idx)
    }

    const updateTaskName = (ev, taskId, groupId, title) => {
        ev.preventDefault()
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        let taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === taskId)
        let newBoard = { ...board }
        newBoard.groups[groupIdx].tasks[taskIdx].title = title
        // updateBoard(newBoard)
        onUpdate(newBoard)
        setUpdatedBoard(newBoard)

    }

    const onChangeGroup = (ev, groupId, taskId) => {
        ev.stopPropagation()
        const currGroupIdx = board.groups.findIndex(group => group.id === groupId)
        const currTask = board.groups[currGroupIdx].tasks.find(task => task.id === taskId)
        const currTaskIdx = board.groups[currGroupIdx].tasks.findIndex(task => task.id === taskId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        let newBoard = { ...board }
        newBoard.groups[groupIdx].tasks.push(currTask)
        newBoard.groups[currGroupIdx].tasks.splice(currTaskIdx, 1)
        // updateBoard(newBoard)
        onUpdate(newBoard)
        setGroupMenuOpen(false)
        setUpdatedBoard(newBoard)
    }

    const onDragEnd = (res) => {
        if (!res.destination) return
        let newKanban
        if (res.type === 'droppableStatus') newKanban = kanbanService.onDragStatus(res, kanban)
        else if (res.type === 'droppableCard') {
            const { dragKanban, newBoard } = kanbanService.onDragCard(res, board, kanban)
            newKanban = dragKanban
            setUpdatedBoard(newBoard)
        }
        setKanban(newKanban)
    }

    if (!kanban) return <h1>Loading...</h1>
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal" type="droppableStatus">
                {(provided, snapshot) => (
                    <div className="kanban-board-container" ref={provided.innerRef}>
                        {kanban.map((status, idx) => {
                            return <Draggable draggableId={status.id} key={status.id} index={idx}  >
                                {(provided, snapshot) => (
                                    <section ref={provided.innerRef}
                                        snapshot={snapshot}
                                        {...provided.draggableProps}>
                                        <div className="kanban-container" >
                                            <div className="kanban-column-content" style={{ backgroundColor: status.color }}>
                                                <div className="kanban-column-name">
                                                    <div {...provided.dragHandleProps} className="drag-handle-status"><MdDragIndicator /></div>
                                                    <div className="kanban-status-title">{status.status} / {(!status.kanban?.length) ? '0' : status.kanban.length}</div>
                                                </div>
                                                <Droppable droppableId={idx.toString()} type='droppableCard' >
                                                    {(provided, snapshot) => (
                                                        <div className="kanban-tasks-wrapper" ref={provided.innerRef}>
                                                            <div className="kanban-tasks-container">
                                                                <div className="kanban-task-list">
                                                                    {status.kanban.map((item, idx) => {
                                                                        return <Draggable draggableId={item.taskId.toString()} key={item.taskId.id} index={idx}>
                                                                            {(provided, snapshot) => (
                                                                                <div>
                                                                                    <KanbanList provided={provided}
                                                                                        snapshot={snapshot} onChangeGroup={onChangeGroup} setGroupMenuOpen={setGroupMenuOpen} onOpenDetails={onOpenDetails} idx={idx} item={item} onUpdate={onUpdate} setUpdatedBoard={setUpdatedBoard} key={idx} kanban={kanban} status={status} onAddTask={onAddTask} board={board} updateTask={updateTask} />
                                                                                    {
                                                                                        groupMenuOpen === item.taskId && <GroupKanbanMenu board={board} taskId={item.taskId} currGroupId={item.groupId} setUpdatedBoard={setUpdatedBoard}
                                                                                            onUpdatTaskName={onUpdate} modalPos={modalPos} setGroupMenuOpen={setGroupMenuOpen} />
                                                                                    }
                                                                                    {/* {
                                                                                    isDetailsOpen.taskId === item.taskId &&
                                                                                    <TaskDetails onChangeGroup={onChangeGroup} onOpenDetails={onOpenDetails} kanban={kanban[status]} updateStatus={updateStatus} board={board} item={item} updateTaskName={updateTaskName} onUpdatTaskName={onUpdate} modalPos={modalPos} setModalPos={setModalPos} />
                                                                                    // <TaskDetails board={board} taskName={item.taskName} taskId={item.taskId} status={status.title} statusColor={status.color} persons={item.persons} groupName={item.groupName} groupId={item.groupId} groupColor={item.groupColor} onOpenDetails={onOpenDetails} updateTaskName={updateTaskName} updateBoard={updateBoard} onUpdatTaskName={onUpdatTaskName} modalPos={modalPos} setModalPos={setModalPos} />
                                                                                } */}
                                                                                </div>
                                                                            )}
                                                                        </Draggable>
                                                                    })}
                                                                    {provided.placeholder}
                                                                </div>
                                                                <div className="column-main-input-container">
                                                                    {isEditNewTask !== status && <div className="kanban-add-pulse-component" onClick={() => setIsEditNewTask(status)}>
                                                                        <div className="kanban-add-pulse-component kanban-add-pulse-text">
                                                                            +Add Item
                                                                        </div>
                                                                    </div>}
                                                                    {isEditNewTask === status && <form className="kanban-add-pulse-input" onSubmit={(event) => addTaskKanban(event, status)}>
                                                                        <input className="column-input kanban-input" type="text" name="title" onChange={(event) => handleAddChange(event, status)} />
                                                                        {< button className="add-task-button kanban-add-button" style={{ backgroundColor: status.color }}>+Add</button>}
                                                                        {/* {task.title && isWriteNew === status && < button className="add-task-button" style={{ backgroundColor: kanban[status].color }}>Add</button>} */}
                                                                    </form>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Droppable>
                                            </div>
                                        </div>
                                    </section>
                                )}
                            </Draggable>
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext >
    )
}