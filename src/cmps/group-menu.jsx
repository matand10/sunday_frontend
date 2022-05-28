import { AiOutlineUserAdd } from "react-icons/ai";
import { BsGraphUp, BsTrash } from "react-icons/bs";
import { useState } from "react"
import React from "react"

export const GroupMenu = ({ group, menuRef, onRemoveGroup, boardId }) => {

    const deleteGroup = (groupId, ev) => {
        ev.stopPropagation()
        console.log(groupId);
        onRemoveGroup(groupId, boardId)
    }


    return <React.Fragment>
        <section ref={menuRef} className="group-main-menu-inner">
            <div className="group-main-section">
                <div className="group-menu-item">
                    <div className="group-content-wrapper" onClick={(event) => deleteGroup(group.id, event)}>
                        <div className="group-icon"><BsTrash /></div>
                        <div className="group-title">Delete board</div>
                    </div>
                </div>
            </div>
        </section>
    </React.Fragment>
}