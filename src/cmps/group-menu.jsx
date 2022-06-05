import { AiOutlineUserAdd } from "react-icons/ai";
import { BsGraphUp, BsTrash } from "react-icons/bs";
import { useState } from "react"
import React from "react"

export const GroupMenu = ({ group, menuRef, onRemoveGroup, boardId }) => {

    const deleteGroup = (groupId) => {
        onRemoveGroup(groupId, boardId)
    }

    return <section ref={menuRef} className="group-arrow-modal">
        <div className="group-arrow-modal-container">
            <div className="group-menu-item">
                <div className="group-content-wrapper" onClick={() => deleteGroup(group.id)}>
                    <div className="group-icon"><BsTrash /></div>
                    <div className="group-title">Delete group</div>
                </div>
            </div>
        </div>
    </section>
}