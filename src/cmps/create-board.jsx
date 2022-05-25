import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export function CreatBoard({ setIsClick, isClick,onAddBoard }) {
    const [board,setBoard]=useState({title:''})
    const navigate = useNavigate()

    const handleChange = ({ target }) => {
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setBoard((prevBoard) => ({ ...prevBoard, title: value }))

    }

    const addBoard = () => {
        onAddBoard(board)
    }

    return <section className="add-modal-container">
        <div onClick={() => setIsClick(!isClick)}>X</div>
        <h2>Create board</h2>
        <div className='new-board-input'>
            <label>Board name</label>
            <input type="text" onChange={handleChange} defaultValue="New Board" />
        </div>
        <div className='create-board-button'>
            <button onClick={() => setIsClick(!isClick)}>Cancel</button>
            <button onClick={addBoard}>Create Board</button>
        </div>

    </section>
}