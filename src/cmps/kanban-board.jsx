import { useEffect } from "react"
import { useOutletContext, useParams } from "react-router-dom"


export const KanbanBoard = () => {
    const { board } = useOutletContext()
    let { boardId } = useParams()
    console.log('boardId', boardId)
    console.log('boardId', board)

    // useEffect(()=>{

    // },[])
    return (
        <section>
            <div className="kanban-container">
                {/* {board.groups.map((group, idx) => {
                    return group.tasks.map(task => {
                        return task.columns.map((col, idx) => {
                            return <div key={idx} className="kanban-columns-container"> */}
                {/* <div className="kanban-column-type" style={{backgroundColor:`{col.value.color}`}}>{col.value.title}</div> */}
                <div className="kanban-column-content">
                    <div className="kanban-column-name">Working on it</div>
                    <div className="kanban-tasks-container">
                        <div className="kanban-task-content">
                            <div>
                                <div>task name</div>
                                <div>persons</div>
                                <div>group</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="kanban-column-content">
                    <div className="kanban-column-name">Stuck</div>
                    <div className="kanban-tasks-container">
                        <div className="kanban-task-content">
                            <div className="task-details">
                                <div>task name</div>
                                <div>persons</div>
                                <div>group</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="kanban-column-content">
                    <div className="kanban-column-name">Done</div>
                    <div className="kanban-tasks-container">
                        <div className="kanban-task-content">
                            <div className="task-details">
                                <div>task name</div>
                                <div>persons</div>
                                <div>group</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="kanban-column-content">
                    <div className="kanban-column-name">Empty</div>
                    <div className="kanban-tasks-container">
                        <div className="kanban-task-content">
                            <div className="task-details">
                                <div>task name</div>
                                <div>persons</div>
                                <div>group</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* </div> */}
                {/* }) */}
                {/* })
                })} */}
            </div>
        </section>
    )
}