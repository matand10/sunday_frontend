import { AiOutlineUserAdd } from "react-icons/ai";
import { BsGraphUp, BsTrash } from "react-icons/bs";
import React from "react"

export const ColAddMenu = ({ menuRef, onNewCol }) => {

    return <React.Fragment>
        <section ref={menuRef} className="col-add-container">
            <div className="task-main-section">
                <div className="task-menu-item">
                    <div className="task-content-wrapper" onClick={() => onNewCol('text')}>
                        <div className="task-icon"><AiOutlineUserAdd /></div>
                        <div className="task-title">Text</div>
                    </div>
                    <div className="task-content-wrapper" onClick={() => onNewCol('status')}>
                        <div className="task-icon"><BsTrash /></div>
                        <div className="task-title">Status</div>
                    </div>
                    <div className="task-content-wrapper" onClick={() => onNewCol('date')}>
                        <div className="task-icon"><BsTrash /></div>
                        <div className="task-title">Date</div>
                    </div>
                </div>
            </div>
        </section>
    </React.Fragment>
}