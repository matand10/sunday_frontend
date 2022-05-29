import { GroupList } from '../cmps/group-list.jsx'
import { SidePanel } from '../cmps/side-panel'

export const MainBoard = ({ updateBoard, board, onAddTask, onRemoveGroup, updateTask, removeTask, updateGroup, updateTaskDate }) => {

    if (!board) return <h1>Loading...</h1>
    return <section className="group-main-container">
        {board.groups.map((group, idx) => <GroupList updateBoard={updateBoard} removeTask={removeTask} key={idx} board={board} group={group} onAddTask={onAddTask} onRemoveGroup={onRemoveGroup} updateTask={updateTask} updateGroup={updateGroup} updateTaskDate={updateTaskDate} />)}
    </section>
}