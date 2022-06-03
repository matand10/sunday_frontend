import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { kanbanService } from '../services/kanban.service'
import { KanbanList } from '../cmps/kanban-list'
import { boardService } from '../services/board.service'

export const KanbanBoard = () => {
    const { board, onAddTask, updateBoard, updateTask } = useOutletContext()
    const [kanban, setKanban] = useState(false)
    const [kanbanBoard, setKanbanBoard] = useState(board)


    useEffect(() => {
        if (!kanbanBoard) return
        setKanban(kanbanService.getKanban(board))
    }, [kanbanBoard])

    const onUpdatTaskName = (newBoard) => {
        setKanbanBoard(newBoard)
    }
    console.log('kanbanBoard',kanbanBoard)
    console.log('kanban', kanban)
    if (!kanban['Done']) return <h1>Loading...</h1>
    return (
        <section className="kanban-board-container">
            {boardService.getLabels().map((status, idx) => <KanbanList onUpdatTaskName={onUpdatTaskName} setKanbanBoard={setKanbanBoard} updateBoard={updateBoard} key={idx} kanban={kanban} status={status} onAddTask={onAddTask} board={board} updateTask={updateTask} />)}
        </section>
    )
}