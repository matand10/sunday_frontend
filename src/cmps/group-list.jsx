import { utilService } from "../services/util.service";


export const GroupList = ({ group }) => {
    return <section className="groups-main-container">
        <table>
            <thead>
                <tr>
                    <th>{group.title}</th>
                    <th>Person</th>
                    <th>Status</th>
                    <th>Date</th>
                </tr>
            </thead>

            {group.tasks.map(task => {
                return <tbody key={task.id}>
                    <tr>
                        <td>{task.title}</td>
                        <td>{task.assignedTo.map(member => member.fullname + ' ')}</td>
                        <td>{task.status}</td>
                        <td>{utilService.getCurrTime(task.archivedAt)}</td>
                    </tr>
                </tbody>
            })}
        </table>
    </section>
}

