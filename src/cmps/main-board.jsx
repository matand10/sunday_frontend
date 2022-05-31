import { useOutletContext } from 'react-router-dom'
import { GroupList } from '../cmps/group-list.jsx'
import { SidePanel } from '../cmps/side-panel'

export const MainBoard = () => {
    const { board, updateBoard, onAddTask, onRemoveGroup, updateTask, removeTask, updateGroup, updateTaskDate } = useOutletContext()

    if (!board) return <h1>Loading...</h1>
    return <section className="group-main-container">
        {board.groups.map((group, idx) => <GroupList updateBoard={updateBoard} removeTask={removeTask} key={idx} board={board} group={group} onAddTask={onAddTask} onRemoveGroup={onRemoveGroup} updateTask={updateTask} updateGroup={updateGroup} updateTaskDate={updateTaskDate} />)}
    </section>
}
