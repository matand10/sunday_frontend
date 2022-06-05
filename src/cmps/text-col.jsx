import { useRef, useState, useEffect } from "react"

export const TextCol = ({ col, idx, specialUpdateTask }) => {
    const [txt, setTxt] = useState('')
    const [editText, setEditText] = useState(false)
    const menuRef = useRef()
    const handleChange = ({ target }) => {
        const value = target.value
        setTxt(value)
    }

    useEffect(() => {
        document.addEventListener("mousedown", eventListener)
        return () => {
            document.removeEventListener("mousedown", eventListener)
        }
    }, [])

    const eventListener = (ev) => {
        if (!menuRef.current?.contains(ev.target)) {
            setEditText(false)
        }
    }

    const onChangeText = (ev) => {
        ev.preventDefault()
        specialUpdateTask(txt, idx)
        setEditText(false)
    }

    if (editText) {
        return <div className="col-text-container" ref={menuRef}>
            <form onSubmit={onChangeText}>
                <input className="col-text-input" type="text" onChange={handleChange} onClick={(event) => (event.stopPropagation())} />
            </form>
        </div>
    } else return <div onClick={() => setEditText(true)} className="flex-row-items">{col.value}</div>
}