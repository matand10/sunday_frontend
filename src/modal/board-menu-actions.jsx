import { BsTrash } from "react-icons/bs";
import { MdDriveFileRenameOutline } from "react-icons/md";
import React from "react"

export const BoardMenuActions = ({ board, menuRef, onDeleteBoard, onRenameIsClick }) => {

    const deleteBoard = (ev, board) => {
        onDeleteBoard(board._id)
    }


    return <div className="board-menu-container">
        <section ref={menuRef} className="board-menu-actions">
            <div className="board-main-section">
                <div className="board-menu-item">
                    {/* <div className="board-menu-content-wrapper">
                    <div className="board-menu-icon"><AiOutlineUserAdd /></div>
                    <div className="board-menutitle">Open Board in New Tab</div>
                </div> */}
                    <div className="board-menu-content-wrapper" onClick={() => onRenameIsClick(board)}>
                        <div className="board-menu-icon"><MdDriveFileRenameOutline /></div>
                        <div className="board-menu-title">Rename Board</div>
                    </div>
                    {/* <div className="board-menu-content-wrapper" onClick={() => onDuplicateBoard()}>
                    <div className="board-menu-icon"><BsTrash /></div>
                    <div className="board-menutitle">Duplicate Board</div>
                </div> */}
                    <div className="board-menu-content-wrapper" onClick={(ev) => deleteBoard(ev, board)}>
                        <div className="board-menu-icon"><BsTrash /></div>
                        <div className="board-menu-title">Delete</div>
                    </div>
                </div>
            </div>
        </section >
    </div>

}