
export const BoardHeader = ({ board }) => {
    console.log(board);
    return <div className="board-header main-layout">
        <div>
            <div>{board.title}</div>
            <div>Last Seen</div>
            <div>Invite</div>
            <div>Activity</div>
        </div>

        <div>View</div>

        <div className="table-actions">
            <div>New Task</div>
            <div>Search</div>
            <div>Person</div>
            <div>Filter</div>
            <div>Sort</div>
            <div>Pin</div>
            <div>Hideen</div>
            <div>Height</div>
            <div>color</div>
        </div>
    </div>
}