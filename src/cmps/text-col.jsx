import { useState } from "react"

export const TextCol = ({ col, idx, specialUpdateTask }) => {
    const [txt, setTxt] = useState('')
    const [editText, setEditText] = useState(false)

    const handleChange = ({ target }) => {
        const value = target.value
        setTxt(value)
    }

    const onChangeText = (ev) => {
        ev.preventDefault()
        console.log(idx);
        specialUpdateTask(txt, idx)
        setEditText(false)
    }

    if (editText) {
        return <div className="title-update-input">
            <form onSubmit={onChangeText}>
                <input type="text" value={txt} onChange={handleChange} onClick={(event) => (event.stopPropagation())} />
            </form>
        </div>
    } else return <div onClick={() => setEditText(true)} className="flex-row-items">{col.value}</div>
}