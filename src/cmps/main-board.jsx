import { GroupList } from '../cmps/group-list.jsx'
import { SidePanel } from '../cmps/side-panel'

export const MainBoard = ({ board }) => {
    return <section className="group-main-container">
        {board.groups.map(group => <GroupList key={group.id} group={group} />)}


        <SidePanel />
    </section>
}