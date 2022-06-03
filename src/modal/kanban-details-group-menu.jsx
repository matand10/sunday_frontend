import { AiOutlineUserAdd } from "react-icons/ai";
import { BsGraphUp, BsTrash } from "react-icons/bs";
import { useState } from "react"
import React from "react"

export const DetailsGroupKanbanMenu = ({ board, groupMenuRef, taskId, currGroupId, updateBoard, onUpdatTaskName, setGroupMenuOpen }) => {
    const [modalPos, setModalPos] = useState({ x: null, y: null })

    const onChangeGroup = (groupId) => {
        const currGroupIdx = board.groups.findIndex(group => group.id === currGroupId)
        const currTask = board.groups[currGroupIdx].tasks.find(task => task.id === taskId)
        const currTaskIdx = board.groups[currGroupIdx].tasks.findIndex(task => task.id === taskId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        let newBoard = { ...board }
        newBoard.groups[groupIdx].tasks.push(currTask)
        newBoard.groups[currGroupIdx].tasks.splice(currTaskIdx, 1)
        updateBoard(newBoard)
        onUpdatTaskName(newBoard)
        setGroupMenuOpen(false)
    }


    return <React.Fragment>
        <section className="group-main-menu-inner" ref={groupMenuRef}>
            <div className="group-main-section">
                <div className="group-menu-item" onClick={(event) => (event.stopPropagation())}>
                    {board.groups.map((group, idx) => {
                        return <div key={idx} className="group-content-wrapper" onClick={() => onChangeGroup(group.id)}>
                            <div className="group-color" style={{ backgroundColor: group.style.color }}></div>
                            <div className="group-title">{group.title}</div>
                        </div>
                    })}
                </div>
            </div>
        </section>
    </React.Fragment>
}