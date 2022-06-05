import { useState } from "react"
import { boardService } from "../services/board.service"


export const PriorityCol = ({ col, toggleStatus, idx }) => {

    const priorities = boardService.getPriority()
    return <div
        className="flex-row-items status "
        style={{ backgroundColor: col.value?.color }}
        onClick={(ev) => toggleStatus(ev, true, idx, priorities)}>
        {col.value?.title}
    </div >

}