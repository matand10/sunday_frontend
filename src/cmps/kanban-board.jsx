import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { kanbanService } from '../services/kanban.service'
import { KanbanList } from '../cmps/kanban-list'
import { boardService } from '../services/board.service'
import { taskService } from "../services/task.service"
import { GroupKanbanMenu } from "../modal/kanban-group-modal"
import { TaskDetails } from "../modal/kanban-task-details"
import { groupService } from "../services/group.service"

export const KanbanBoard = () => {
    const { board, onAddTask, updateBoard, updateTask } = useOutletContext()
    const [kanban, setKanban] = useState(false)
    const [modalPos, setModalPos] = useState({ x: null, y: null })
    const [task, setTask] = useState({ title: '' })
    const [groupMenuOpen, setGroupMenuOpen] = useState(false)
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)
    const [isWriteNew, setIsWriteNew] = useState(false)


    useEffect(() => {
        // if (!kanbanBoard) return
        console.log(board);
        if (!board) return
        setKanban(kanbanService.getKanban(board))
    }, [])

    const onUpdate = (newBoard) => {
        setKanban(kanbanService.getKanban(newBoard))
    }

    const addTaskKanban = async (ev, status) => {
        ev.preventDefault()
        const groupId = board.groups[0].id
        let newBoard = await taskService.addTask(board, { title: task.title, status }, groupId,)
        updateBoard(newBoard)
        onUpdate(newBoard)
        setIsWriteNew(false)

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
        updateBoard(newBoard)
        onUpdate(newBoard)
    }

    const onOpenDetails = (ev, idx) => {
        ev.stopPropagation()
        // setOpenDetails(params)
        setIsDetailsOpen(idx)
    }

    const updateTaskName = (ev, taskId, groupId, title) => {
        ev.preventDefault()
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        let taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === taskId)
        let newBoard = { ...board }
        newBoard.groups[groupIdx].tasks[taskIdx].title = title
        updateBoard(newBoard)
        onUpdate(newBoard)
    }

    const onChangeGroup = (ev, groupId, taskId) => {
        ev.stopPropagation()
        console.log('hey');
        const currGroupIdx = board.groups.findIndex(group => group.id === groupId)
        const currTask = board.groups[currGroupIdx].tasks.find(task => task.id === taskId)
        const currTaskIdx = board.groups[currGroupIdx].tasks.findIndex(task => task.id === taskId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        let newBoard = { ...board }
        newBoard.groups[groupIdx].tasks.push(currTask)
        newBoard.groups[currGroupIdx].tasks.splice(currTaskIdx, 1)
        updateBoard(newBoard)
        onUpdate(newBoard)
        setGroupMenuOpen(false)
    }

    if (!board) return <h1>Loading...</h1>

    return (
        <section className="kanban-board-container">
            {Object.keys(kanban).map((status, idx) => {
                return <div className="kanban-container">
                    <div className="kanban-column-content" style={{ backgroundColor: kanban[status].color }}>
                        <div className="kanban-column-name">{kanban[status].status} / {(!kanban[status].kanban?.length) ? '0' : kanban[status].kanban.length}</div>


                        <div className="kanban-tasks-container">
                            {kanban[status].kanban.map((item, idx) => {
                                return <section>
                                    <KanbanList onChangeGroup={onChangeGroup} setGroupMenuOpen={setGroupMenuOpen} onOpenDetails={onOpenDetails} idx={idx} item={item} onUpdate={onUpdate} updateBoard={updateBoard} key={idx} kanban={kanban} status={status} onAddTask={onAddTask} board={board} updateTask={updateTask} />
                                    {
                                        groupMenuOpen === item.taskId && <GroupKanbanMenu board={board} taskId={item.taskId} currGroupId={item.groupId} updateBoard={updateBoard}
                                            onUpdatTaskName={onUpdate} modalPos={modalPos} setGroupMenuOpen={setGroupMenuOpen} />
                                    }
                                    {
                                        isDetailsOpen.taskId === item.taskId &&
                                        <TaskDetails onChangeGroup={onChangeGroup} onOpenDetails={onOpenDetails} kanban={kanban[status]} updateStatus={updateStatus} board={board} item={item} updateTaskName={updateTaskName} updateBoard={updateBoard} onUpdatTaskName={onUpdate} modalPos={modalPos} setModalPos={setModalPos} />
                                        // <TaskDetails board={board} taskName={item.taskName} taskId={item.taskId} status={status.title} statusColor={status.color} persons={item.persons} groupName={item.groupName} groupId={item.groupId} groupColor={item.groupColor} onOpenDetails={onOpenDetails} updateTaskName={updateTaskName} updateBoard={updateBoard} onUpdatTaskName={onUpdatTaskName} modalPos={modalPos} setModalPos={setModalPos} />
                                    }
                                </section>
                            })}
                            <div className="column-main-input-container">
                                <form className="main-column-input" onSubmit={(event) => addTaskKanban(event, status)}>
                                    <input className="column-input" type="text" placeholder="+Add Item" name="title" onChange={(event) => handleAddChange(event, status)} />
                                    {task.title && isWriteNew === status && < button className="add-task-button" style={{ backgroundColor: kanban[status].color }}>Add</button>}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            })}
        </section >
    )
}