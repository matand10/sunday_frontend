import React, { useEffect, useRef, useState } from "react"
import { gifService } from "../services/gif.service"


export const GiphyCol = ({ col, idx, updateTask, specialUpdateTask, setIsGifModal, isGifModal, toggleGif }) => {


    const onAddGif = (ev, gif) => {
        ev.preventDefault()
        specialUpdateTask(gif, idx)
    }

    return <div className="flex-row-items" onClick={(ev) => toggleGif(ev, true, idx, gifService.getGifs())}>
        {col.value.url && <img className="gif" src={col.value.url} />}
    </div>
}