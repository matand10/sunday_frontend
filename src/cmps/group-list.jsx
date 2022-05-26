import { useState } from "react";
import { utilService } from "../services/util.service";
import { Menu } from '../hooks/right-click-menu'
import { RightClickMenu } from '../modal/right-click-menu'
import { useRef, useEffect } from 'react';

export const GroupList = ({ group, onAddTask }) => {
    const [task, setTask] = useState({ title: '' })

    const [showMenu, setShowMenu] = useState(false)
    const { x, y, handleContextMenu } = Menu()
    let menuRef = useRef()

    const addTask = (ev) => {
        ev.preventDefault()
        onAddTask(task, group.id)
    }

    const onHandleCange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setTask((prevTask) => ({ ...prevTask, [field]: value }))
    }

    useEffect(() => {
        document.addEventListener("mousedown", (event) => {
            if (!menuRef.current?.contains(event.target)) {
                document.removeEventListener('contextmenu', handleContextMenu)
                setShowMenu(false)
            }
        })
    })

    const onHandleRightClick = (ev, task, value) => {
        // If you want to use taskId or more manipulation...
        setShowMenu(value)
    }


    return <div className="group">
        {/* <h1>{group.title}</h1> */}
        <div className="head">
            <div>{group.title}</div>
            <div>Person</div>
            <div>Status</div>
            <div>Date</div>
        </div>
        {group.tasks.map((task, idx) => {
            return <section key={idx} className="group-row" ref={menuRef} onContextMenu={(ev) => onHandleRightClick(ev, task, true)}>
                <div>{task.title}</div>
                <div>{task.assignedTo.map(member => member.fullname + ' ')}</div>
                <div>{task.status}</div>
                <div>{task.archivedAt ? utilService.getCurrTime(task.archivedAt) : ''}</div>
            </section>
        })}
        <div>
            <form onSubmit={addTask}>
                <input type="text" placeholder="+Add Item" onChange={onHandleCange} name="title" />
                <button>Add</button>
            </form>
        </div>
        <RightClickMenu x={x} y={y} showMenu={showMenu} />
    </div>
}







// return <section className="group">
//     {/* <h1>{group.title}</h1> */}
//     <table>
//         <thead>
//             <tr>
//                 <th>{group.title}</th>
//                 <th>Person</th>
//                 <th>Status</th>
//                 <th>Date</th>
//             </tr>
//         </thead>
//         <tbody>
//             {group.tasks.map((task, idx) => {
//                 return <tr key={idx}>
//                     <td>{task.title}</td>
//                     <td>{task.assignedTo.map(member => member.fullname + ' ')}</td>
//                     <td>{task.status}</td>
//                     <td>{task.archivedAt ? utilService.getCurrTime(task.archivedAt) : ''}</td>
//                 </tr>
//             })}
//         </tbody>
//     </table>
//     <div>
//         <form onSubmit={addTask}>
//             <input type="text" placeholder="+Add Item" onChange={onHandleCange} name="title" />
//             <button>Add</button>
//         </form>
//     </div>
// </section>