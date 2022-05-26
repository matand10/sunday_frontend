import { AiOutlineUserAdd } from "react-icons/ai";
import { BsGraphUp, BsTrash } from "react-icons/bs";
import { useState } from "react"
import React from "react"

export const GroupMenu= ({ group,menuRef,onRemoveGroup }) => {

const deleteGroup=(groupId)=>{
    onRemoveGroup(groupId)
}


    return <React.Fragment>
        <section ref={menuRef} className="group-main-menu-inner">
            <div className="group-main-section">
                <div className="group-menu-item">
                    <div className="group-content-wrapper" onClick={()=>deleteGroup(group.id)}>
                        <div className="group-icon"><BsTrash /></div>
                        <div className="group-title">Delete board</div>
                    </div>
                </div>
            </div>
        </section>
    </React.Fragment>
}