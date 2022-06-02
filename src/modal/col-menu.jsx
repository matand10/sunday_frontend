import { AiOutlineUserAdd } from "react-icons/ai";
import { BsGraphUp, BsTrash } from "react-icons/bs";
import React from "react"

export const ColMenu = ({ removeCol, menuRef, colActions, setcolActions, setGroupIsClick }) => {

    const onRemoveCol = () => {
        removeCol(colActions.colIdx)
        setcolActions({ colIdx: '', groupId: '' })
    }

    return <React.Fragment>
        <section ref={menuRef} className="task-main-menu-inner">
            <div className="task-main-section">
                <div className="task-menu-item">
                    <div className="task-content-wrapper" onClick={() => onRemoveCol()}>
                        <div className="task-icon"><BsTrash /></div>
                        <div className="task-title">Delete</div>
                    </div>
                </div>
            </div>
        </section>
    </React.Fragment>
}