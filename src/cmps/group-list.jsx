import { useState } from "react";
import { utilService } from "../services/util.service";


export const GroupList = ({ group, onAddTask }) => {
    const [task, setTask] = useState({ title: '' })

    const addTask = (ev) => {
        ev.preventDefault()
        onAddTask(task,group.id)
    }

    const onHandleCange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setTask((prevTask) => ({ ...prevTask, [field]: value }))
    }

    return <section>
        <table>
            <thead>
                <tr>
                    <th>{group.title}</th>
                    <th>Person</th>
                    <th>Status</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
            {group.tasks.map((task,idx) => {
                return <tr key={idx}>
                    
                        <td>{task.title}</td>
                        <td>{task.assignedTo.map(member => member.fullname + ' ')}</td>
                        <td>{task.status}</td>
                        <td>{task.archivedAt ? utilService.getCurrTime(task.archivedAt) : ''}</td>
                    </tr>
            })}
            </tbody>
        </table>
        <div>
            <form onSubmit={addTask}>
                <input type="text" placeholder="+Add Item" onChange={onHandleCange} name="title" />
                <button>Add</button>
            </form>
        </div>
    </section>
}

