

export const KanbanList = ({kanban}) => {


    return (
        <section>
            <div className="kanban-container">
                <div className="kanban-column-content" style={{ backgroundColor: {} }}>
                    <div className="kanban-column-name">Done / {kanban['Done'].length}</div>
                    <div className="kanban-tasks-container">

                        {kanban['Done'] && kanban['Done'].map((doneItem, idx) => {
                            return <div key={idx} className="kanban-task-content">
                                <div>{doneItem.taskName}</div>
                                <div>{doneItem.persons?.length ?
                                    <div className="flex-row-items user-image-container">{doneItem.persons.map((user, idx) => {
                                        return <div key={idx} className="user-image-wrapper">
                                            <img key={idx} style={{ left: `${20 * (idx) + 'px'}`, transform: `translateX(${-80 + '%'})` }} className="user-image-icon-assign" src={user.imgUrl} alt="user image" />
                                        </div>
                                    })}
                                    </div>
                                    :
                                    <div className="flex-row-items">
                                        <div className="user-image-wrapper">
                                            <img className="user-image-icon-assign" src="https://cdn.monday.com/icons/dapulse-person-column.svg" alt="user image" />
                                        </div>
                                    </div>}</div>
                                <div>{doneItem.groupName}</div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}