import React, { useState } from "react"
import { IoIosColorPalette } from "react-icons/io";
import { BsTrash } from "react-icons/bs";
import { groupService } from "../services/group.service";

export const GroupMenu = ({ group, menuRef, onRemoveGroup, boardId }) => {
    const [isColorModal, setIsColorModal] = useState(false)
    const deleteGroup = (groupId) => {
        onRemoveGroup(groupId, boardId)
    }

    const onChangeGroupColor = (color) => {
        console.log(color)
    }


    const colors = groupService.getColors(15)
    return <section ref={menuRef} className="group-arrow-modal">
        <div className="group-arrow-modal-container">
            <div className="group-menu-item">
                <div className="group-content-wrapper" onClick={() => deleteGroup(group.id)}>
                    <div className="group-icon"><BsTrash /></div>
                    <div className="group-title">Delete group</div>
                </div>
                <div className="group-content-wrapper" onClick={() => setIsColorModal(true)}>
                    <div className="group-icon"><IoIosColorPalette /></div>
                    <div className="group-title">Change group color</div>
                </div>
            </div>
        </div>

        {isColorModal && <div className="colors-grid-container">
            {colors.map(color => {
                return <div className="color-pallete" key={color.id} style={{ backgroundColor: color.color }} onClick={onChangeGroupColor(color)}></div>
            })}
        </div>}
    </section>
}