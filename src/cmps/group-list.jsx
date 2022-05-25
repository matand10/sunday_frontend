import { useState } from "react";
import { utilService } from "../services/util.service";
import { SidePanel } from "./side-panel"
import { FaChevronCircleDown, FaCaretDown } from 'react-icons/fa'

export const GroupList = ({ group, onAddTask, board }) => {
    const [task, setTask] = useState({ title: '' })
    const [modal, setModal] = useState({})

    const addTask = (ev) => {
        ev.preventDefault()
        onAddTask(task, group.id)
    }

    const onHandleCange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setTask((prevTask) => ({ ...prevTask, [field]: value }))
    }

    const onOpenModal = (params) => {
        setModal(params)
    }

    console.log(modal.boardId);

    return <div className="group">
        <div className="head">
            <div className="group-arrow-div"><FaChevronCircleDown className="group-arrow"/></div>
            <div>{group.title}</div>
            <div>Person</div>
            <div>Status</div>
            <div>Date</div>
        </div>
        {group.tasks.map((task, idx) => {
            return <div onClick={() => onOpenModal({ boardId: board._id, groupId: group.id, task: task })} key={idx} className="group-row">
            {/* return <section key={idx} className="group-row"> */}
                <div className="task-arrow-div"><FaCaretDown className="task-arrow"/></div>
                <div>{task.title}</div>
                <div>{task.assignedTo.map(member => member.fullname + ' ')}</div>
                <div>{task.status}</div>
                <div>{task.archivedAt ? utilService.getCurrTime(task.archivedAt) : ''}</div>
            </div>
        })}
        <div>
            <form onSubmit={addTask}>
                <input type="text" placeholder="+Add Item" onChange={onHandleCange} name="title" />
                {task.title && <button>Add</button>}
            </form>
        </div>
        {modal.boardId && <SidePanel modal={modal} onOpenModal={onOpenModal} />}
    </div>
}

