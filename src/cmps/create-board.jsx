import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export function CreatBoard({ setIsClick, isClick, onAddBoard }) {
    const [board, setBoard] = useState({ title: '' })
    const navigate = useNavigate()

    const handleChange = ({ target }) => {
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setBoard((prevBoard) => ({ ...prevBoard, title: value }))

    }

    const addBoard = () => {
        onAddBoard(board)
    }

    return <div id="myModal" className="create-board-modal-container">
            <div className="create-board-modal-content">
                <span className="close" onClick={() => setIsClick(!isClick)}>&times;</span>
                <div className='add-modal-content'>
                    <h2>Create board</h2>
                    <div className='new-board-input'>
                        <label>Board name</label>
                        <input type="text" onChange={handleChange} defaultValue="New Board" />
                    </div>
                    <div className='create-board-button'>
                        <div>
                        <button onClick={() => setIsClick(!isClick)}>Cancel</button>
                        </div>
                        <div className='create-btn'>
                        <button onClick={addBoard}>Create Board</button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
  
}