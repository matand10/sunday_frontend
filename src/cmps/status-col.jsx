import { boardService } from "../services/board.service"

export const StatCol = ({ col, toggleStatus, idx }) => {

    const labels = boardService.getLabels()
    return <div
        className="flex-row-items status"
        style={{ backgroundColor: col.value?.color }}
        onClick={(ev) => toggleStatus(ev, true, idx, labels)}>
        {col.value?.title}
    </div>
}