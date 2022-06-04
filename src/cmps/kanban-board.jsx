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
        // if (!kanbanBoard) return
        console.log(board);
        if (!board) return
        setKanban(kanbanService.getKanban(board))
    }, [])

    const onUpdate = (newBoard) => {
        setKanban(kanbanService.getKanban(newBoard))
    }


    if (!board) return <h1>Loading...</h1>
    // console.log(kanban);
    return (
        <section className="kanban-board-container">
            {Object.keys(kanban).map((status, idx) => <KanbanList onUpdate={onUpdate} setKanbanBoard={setKanbanBoard} updateBoard={updateBoard} key={idx} kanban={kanban} status={status} onAddTask={onAddTask} board={board} updateTask={updateTask} />)}
            {/* {boardService.getLabels().map((status, idx) => <KanbanList onUpdatTaskName={onUpdatTaskName} setKanbanBoard={setKanbanBoard} updateBoard={updateBoard} key={idx} kanban={kanban} status={status} onAddTask={onAddTask} board={board} updateTask={updateTask} />)} */}
        </section>
    )
}