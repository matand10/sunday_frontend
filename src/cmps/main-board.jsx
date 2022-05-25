import { GroupList } from '../cmps/group-list.jsx'
import { SidePanel } from '../cmps/side-panel'

export const MainBoard = ({ board,onAddTask }) => {
    return <section className="group-main-container">
<<<<<<< HEAD
        {board.groups.map(group => <GroupList key={group.id} group={group} onAddTask={onAddTask}/>)}
=======
        {board.groups.map(group => <GroupList key={group.id} group={group} />)}


        <SidePanel />
>>>>>>> 01c272eacc5af9440ed923a499b033adb47b8ecf
    </section>
}