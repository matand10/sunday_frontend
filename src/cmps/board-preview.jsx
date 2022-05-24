


export const BoardPreview = ({ group }) => {








    return <section className="group-table">
        <table>

            <thead>
                <tr>
                    <th>{group.title}</th>
                    <th>Person</th>
                    <th>Status</th>
                    <th>Date</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>{group.groups.map(task => task.title)}</td>
                </tr>
            </tbody>

        </table>

    </section>
}