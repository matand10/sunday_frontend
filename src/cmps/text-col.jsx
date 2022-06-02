


export const TextCol = ({ col, editText, idx, setEditText }) => {

    const textEdit = (colIdx, value) => {
        setEditText({ colIdx, value })
    }


    if (editText.value && editText.colIdx) {
        return <div className="title-update-input">
            <input type="text" value={col.value} onClick={(event) => (event.stopPropagation())} />
        </div>
    }
    return <div onClick={() => textEdit(idx, true)} className="flex-row-items">{col.value}</div>
}