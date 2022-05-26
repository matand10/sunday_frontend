import { GroupList } from '../cmps/group-list.jsx'
import { SidePanel } from '../cmps/side-panel'

export const MainBoard = ({ board, onAddTask, onRemoveGroup }) => {

    if (!board) return <h1>Loading...</h1>
    return <section className="group-main-container">
        {board.groups.map(group => <GroupList key={group.id} board={board} group={group} onAddTask={onAddTask} onRemoveGroup={onRemoveGroup} />)}
        {/* {board.groups.map(group => <GroupList key={group.id} group={group} />)} */}
        {/* <SidePanel /> */}
    </section>
}