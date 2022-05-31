import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { kanbanService } from '../services/kanban.service'
import {KanbanList} from '../cmps/kanban-list'

export const KanbanBoard = () => {
    const { board } = useOutletContext()
    const [kanban, setKanban] = useState(false)

    useEffect(() => {
        setKanban(kanbanService.getKanban(board))
    }, [])

    console.log('filter', kanbanService.getKanban(board))
    console.log('done', kanban['Done'])
    if (!kanban['Done']) return <h1>Loading...</h1>
    return (
        <section>
            <KanbanList kanban={kanban}/>
            {/* <div className="kanban-container">
                <div className="kanban-column-content" style={{ backgroundColor: {} }}>
                    <div className="kanban-column-name">Done / {kanban['Done'].length}</div>
                    <div className="kanban-tasks-container">

                        {kanban['Done'] && kanban['Done'].map((doneItem, idx) => {
                            return <div key={idx} className="kanban-task-content">
                                <div>{doneItem.taskName}</div>
                                <div>{doneItem.persons?.length ?
                                    <div className="flex-row-items user-image-container">{doneItem.persons.map((user, idx) => {
                                        return <div key={idx} className="user-image-wrapper">
                                            <img key={idx} style={{ left: `${20 * (idx) + 'px'}`, transform: `translateX(${-80 + '%'})` }} className="user-image-icon-assign" src={user.imgUrl} alt="user image" />
                                        </div>
                                    })}
                                    </div>
                                    :
                                    <div className="flex-row-items">
                                        <div className="user-image-wrapper">
                                            <img className="user-image-icon-assign" src="https://cdn.monday.com/icons/dapulse-person-column.svg" alt="user image" />
                                        </div>
                                    </div>}</div>
                                <div>{doneItem.groupName}</div>
                            </div>
                        })}
                    </div>
                </div> */}
                {/* <div className="kanban-column-content">
                    <div className="kanban-column-name">Working on it / {kanban['WorkingOnIt']}</div>
                    <div className="kanban-tasks-container">
                        {kanban['WorkingOnIt'] && kanban['WorkingOnIt'].map(doneItem => {
                            return <div key={doneItem.taskName} className="kanban-task-content">
                                <div>{doneItem.taskName}</div>
                                <div>{doneItem.persons?.length ?
                                    <div className="flex-row-items user-image-container">{doneItem.persons.map((user, idx) => {
                                        return <div key={idx} className="user-image-wrapper">
                                            <img key={idx} style={{ left: `${20 * (idx) + 'px'}`, transform: `translateX(${-80 + '%'})` }} className="user-image-icon-assign" src={user.imgUrl} alt="user image" />
                                        </div>
                                    })}
                                    </div>
                                    :
                                    <div className="flex-row-items">
                                        <div className="user-image-wrapper">
                                            <img className="user-image-icon-assign" src="https://cdn.monday.com/icons/dapulse-person-column.svg" alt="user image" />
                                        </div>
                                    </div>}</div>
                                <div>{doneItem.groupName}</div>
                            </div>
                        })}
                    </div>
                </div> */}
                {/* <div className="kanban-column-content">
                    <div className="kanban-column-name">Stuck / {kanban['Stuck'].length}</div>
                    <div className="kanban-tasks-container">
                        {kanban['Stuck'] && kanban['Stuck'].map(doneItem => {
                            return <div key={doneItem.taskName} className="kanban-task-content">
                                <div>{doneItem.taskName}</div>
                                <div>{doneItem.persons?.length ?
                                    <div className="flex-row-items user-image-container">{doneItem.persons.map((user, idx) => {
                                        return <div key={idx} className="user-image-wrapper">
                                            <img key={idx} style={{ left: `${20 * (idx) + 'px'}`, transform: `translateX(${-80 + '%'})` }} className="user-image-icon-assign" src={user.imgUrl} alt="user image" />
                                        </div>
                                    })}
                                    </div>
                                    :
                                    <div className="flex-row-items">
                                        <div className="user-image-wrapper">
                                            <img className="user-image-icon-assign" src="https://cdn.monday.com/icons/dapulse-person-column.svg" alt="user image" />
                                        </div>
                                    </div>}</div>
                                <div>{doneItem.groupName}</div>
                            </div>
                        })}
                    </div>
                </div> */}
                {/* <div className="kanban-column-content">
                   <div className="kanban-column-name">Empty / {(kanban['Empty'].length) ? '0' : kanban['Empty'].length}</div>
                    <div className="kanban-tasks-container">
                        {kanban['Empty'] && kanban['Empty'].map(doneItem => {
                            console.log('kanban', kanban['Empty'])
                            return <div key={doneItem.taskName} className="kanban-task-content">
                                <div>{doneItem.taskName}</div>
                                <div>{doneItem.persons?.length ?
                                    <div className="flex-row-items user-image-container">{doneItem.persons.map((user, idx) => {
                                        return <div key={idx} className="user-image-wrapper">
                                            <img key={idx} style={{ left: `${20 * (idx) + 'px'}`, transform: `translateX(${-80 + '%'})` }} className="user-image-icon-assign" src={user.imgUrl} alt="user image" />
                                        </div>
                                    })}
                                    </div>
                                    :
                                    <div className="flex-row-items">
                                        <div className="user-image-wrapper">
                                            <img className="user-image-icon-assign" src="https://cdn.monday.com/icons/dapulse-person-column.svg" alt="user image" />
                                        </div>
                                    </div>}</div>
                                <div>{doneItem.groupName}</div>
                            </div>
                        })}
                    </div>
                </div> */}
            {/* </div> */}
        </section>
    )
}