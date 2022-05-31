import { useState } from "react"


export const MainGroupInput = ({ onAddTask, group }) => {
    const [task, setText] = useState({})


    const handleChange = ({ target }) => {
        const value = target.value
        setText({ title: value })
    }

    const submit = (ev) => {
        ev.preventDefault()
        onAddTask(task, group.id)
        setText({ title: '' })
    }

    return <section className="group-main-input-container">
        <form className="main-group-input" onSubmit={(ev) => submit(ev)}>
            <div className="left-indicator-cell group-input-indicator" style={{ backgroundColor: group.style.color }}></div>
            <input value={task.title} className="group-input" type="text" placeholder="+Add Item" onChange={handleChange} name="title" />
            {task.title && <button className="submit-task-button">Add</button>}
            <div className="right-indicator-input"></div>
        </form>
    </section>
}