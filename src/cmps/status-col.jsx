import { boardService } from "../services/board.service"
import Confetti from "react-confetti"
import React, { useState, useRef, useEffect } from "react"

export const StatCol = ({ col, toggleStatus, idx, isConfetti,taskId }) => {
    const [height, setHeight] = useState(null)
    const [width, setWidth] = useState(null)
    const confettiRef = useRef()

    // useEffect = (() => {
    //     setHeight(confettiRef.current.clientHeight)
    //     setWidth(confettiRef.current.clientWidth)
    //     return ()=>false
    // }, [])

    const labels = boardService.getLabels()
    return <div
        className="flex-row-items status"
        style={{ backgroundColor: col.value?.color }}
        onClick={(ev) => toggleStatus(ev, true, idx, labels)}
        ref={confettiRef}>
        {col.value?.title}
        {isConfetti === taskId && <Confetti
            numberOfPieces={80}
            width={width}
            height={height}
        />}
    </div>

}