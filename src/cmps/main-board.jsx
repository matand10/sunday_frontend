import { GroupList } from '../cmps/group-list.jsx'
import { SidePanel } from '../cmps/side-panel'

export const MainBoard = ({ board, onAddTask, onRemoveGroup,updateTask }) => {

    if (!board) return <h1>Loading...</h1>
    return <section className="group-main-container">
        {board.groups.map((group,idx) => <GroupList key={idx} board={board} group={group} onAddTask={onAddTask} onRemoveGroup={onRemoveGroup} updateTask={updateTask}/>)}
        {/* {board.groups.map(group => <GroupList key={group.id} group={group} />)} */}
        {/* <SidePanel /> */}
    </section>
}