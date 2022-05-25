import { BoardNav } from "./board-nav";


export const BoardHeader = ({ board, onAddTask, onAddGroup }) => {
    console.log(board);
    return <div className="board-header main-layout">
        <div className="header space-between">
            <h1 className="title">{board.title}</h1>
            <div className="board-action flex">
                <button className="panel-button">Last Seen</button>
                <button className="panel-button">Invite</button>
                <button className="panel-button">Activity</button>
            </div>
        </div>

        {/* <div>
            <button className="panel-button">Main Table</button>
        </div> */}

        <div className="board-actions">
            <BoardNav onAddTask={onAddTask} onAddGroup={onAddGroup} />
            <button className="panel-button">Search</button>
            <button className="panel-button">Person</button>
            <button className="panel-button">Filter</button>
            <button className="panel-button">Sort</button>
            <button className="panel-button">Pin</button>
            <button className="panel-button">Hideen</button>
            <button className="panel-button">Height</button>
            <button className="panel-button">color</button>
        </div>
    </div>
}