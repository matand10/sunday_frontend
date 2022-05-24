import { GroupList } from '../cmps/group-list.jsx'



export const MainBoard = ({ board }) => {
    return <section>
        {board.groups.map(group => <GroupList key={group.id} group={group} />)}
    </section>
}