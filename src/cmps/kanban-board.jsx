import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { kanbanService } from '../services/kanban.service'
import { KanbanList } from '../cmps/kanban-list'
import { boardService } from '../services/board.service'

export const KanbanBoard = () => {
    const { board, onAddTask, updateBoard } = useOutletContext()
    const [kanban, setKanban] = useState(false)


    useEffect(() => {
        setKanban(kanbanService.getKanban(board))
    }, [])

    if (!kanban['Done']) return <h1>Loading...</h1>
    return (
        <section className="kanban-board-container">
            {boardService.getLabels().map((status, idx) => <KanbanList updateBoard={updateBoard} key={idx} kanban={kanban} status={status} onAddTask={onAddTask} board={board} />)}
        </section>
    )
}