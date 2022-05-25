import { useState } from 'react'

export function CreatBoard() {
    const [isClick,setIsClick]=useState(false)

    return <section className="add-modal-container">
        <div className="new-board-button">
            <button onClick={()=>setIsClick(!isClick)}>New Board</button>
        </div>
        
    </section>
}