import { GroupList } from '../cmps/group-list.jsx'
import { SidePanel } from '../cmps/side-panel'

export const MainBoard = ({ board,onAddTask }) => {
    return <section className="group-main-container main-layout">
        {board.groups.map((group,idx) => <GroupList key={idx} group={group} onAddTask={onAddTask}/>)}
        <SidePanel />
    </section>
}