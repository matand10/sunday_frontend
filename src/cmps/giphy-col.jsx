import React, { useEffect, useRef, useState } from "react"
import { gifService } from "../services/gif.service"


export const GiphyCol = ({ col, idx, updateTask, specialUpdateTask }) => {

    const menuRef = useRef()

    useEffect(() => {
        document.addEventListener("mousedown", eventListener)
        return () => {
            document.removeEventListener("mousedown", eventListener)
        }
    }, [])

    const eventListener = (ev) => {
        if (!menuRef.current?.contains(ev.target)) {
            // setEditText(false)
        }
    }

    const onAddGif = (ev, gif) => {
        ev.preventDefault()
        specialUpdateTask(gif, idx)
    }

    const onRemoveGif = (gifId) => {

    }


    return <div className="flex-row-items">
        Hello from gif
    </div>
}