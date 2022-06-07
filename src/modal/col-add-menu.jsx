import { AiOutlineUserAdd } from "react-icons/ai";
import { BiTask } from "react-icons/bi";
import { MdDateRange, MdPriorityHigh } from "react-icons/md";
import { RiTimeLine } from "react-icons/ri";
import { GiFinch } from "react-icons/gi";
import React from "react"

export const ColAddMenu = ({ menuRef, onNewCol }) => {

    return <section ref={menuRef} className="col-add-container">
        <div className="task-main-section">
            <div className="task-menu-item">
                <div className="task-content-wrapper" onClick={() => onNewCol('text')}>
                    <div className="task-icon"><AiOutlineUserAdd /></div>
                    <div className="task-title">Text</div>
                </div>
                <div className="task-content-wrapper" onClick={() => onNewCol('status')}>
                    <div className="task-icon"><BiTask /></div>
                    <div className="task-title">Status</div>
                </div>
                <div className="task-content-wrapper" onClick={() => onNewCol('date')}>
                    <div className="task-icon"><MdDateRange /></div>
                    <div className="task-title">Date</div>
                </div>
                <div className="task-content-wrapper" onClick={() => onNewCol('timeline')}>
                    <div className="task-icon"><RiTimeLine /></div>
                    <div className="task-title">Timeline</div>
                </div>
                <div className="task-content-wrapper" onClick={() => onNewCol('priority')}>
                    <div className="task-icon"><MdPriorityHigh /></div>
                    <div className="task-title">Priority</div>
                </div>
                <div className="task-content-wrapper" onClick={() => onNewCol('gif')}>
                    <div className="task-icon"><GiFinch /></div>
                    <div className="task-title">Gifs</div>
                </div>
            </div>
        </div>
    </section >
}