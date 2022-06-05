import { AiOutlineUserAdd } from "react-icons/ai";
import { BsGraphUp, BsTrash } from "react-icons/bs";
import { useState } from "react"
import React from "react"

export const GroupKanbanMenu = ({ board, taskId, onChangeGroup }) => {
    
    return <section className="group-main-menu-inner" >
        {/* <section className="group-main-menu-inner" ref={groupMenuRef} style={{ left: modalPos.x - 300, top: modalPos.y -60 }}> */}
        <div className="group-main-section">
            <div className="group-menu-item" onClick={(event) => (event.stopPropagation())}>
                {board.groups.map((group, idx) => {
                    return <div key={idx} className="group-content-wrapper" onClick={(event) => onChangeGroup(event, group.id)}>
                        <div className="group-color" style={{ backgroundColor: group.style.color }}></div>
                        <div className="group-title">{group.title}</div>
                    </div>
                })}
            </div>
        </div>
    </section>
}