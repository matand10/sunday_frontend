export const StatCol = ({ col, toggleStatus, idx }) => {
    return <div
        className="flex-row-items status"
        style={{ backgroundColor: col.value?.color }}
        onClick={(ev) => toggleStatus(ev, true, idx)}>
        {col.value?.title}
    </div>
}