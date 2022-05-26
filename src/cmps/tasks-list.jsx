import { BsChat } from 'react-icons/bs';
import { utilService } from "../services/util.service";
export const TasksList = ({ task, backgroundColor, onHandleRightClick, menuRef }) => {




    return <section className="task-row-component" onContextMenu={(ev) => onHandleRightClick(ev, task, true)} ref={menuRef}>
        <div className="task-row-wrapper">
            <div className="task-row-title">
                {/* <div className="task-arrow-div" onClick={(event) => onOpenMenu(task.id, event)} ><FaCaretDown className="task-arrow" /></div> */}
                <div className="task-title-cell-component">
                    <div className="left-indicator-cell" style={{ backgroundColor }}></div>
                    <div className="task-title-cell">{task.title}</div>
                </div>
                <div className="task-row-items">
                    <div className="flex-row-items">{task.assignedTo.map(user => user.fullname)}</div>
                    <div className="flex-row-items status" style={{ backgroundColor: task.status.color }}>{task.status.title}</div>
                    <div className="flex-row-items">{utilService.getCurrTime(task.archivedAt)}</div>
                </div>
            </div>
        </div>
    </section>
}