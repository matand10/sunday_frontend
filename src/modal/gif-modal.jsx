import { utilService } from '../services/util.service'
import { boardService } from '../services/board.service'
import { useEffect, useState } from 'react'
import { gifService } from '../services/gif.service'


export const GifModal = ({ specialUpdateTask, setIsGifModal, isGifModal, modalPos, statusRef, toggleGif }) => {
    // const [gifs, setGifs] = useState([])

    // useEffect(() => {
    //     setGifs(gifService.getGifs())
    // }, [])

    const onChangeGifs = (value) => {
        specialUpdateTask(value, isGifModal)
        setIsGifModal(false)
    }

    // return <section className="main-status-modal" style={{ left: modalPos.x - 75, top: modalPos.y + 15 }} ref={statusRef}>
    //     <div className="status-modal-container">
    //         {gifs.map(gif => {
    //             return <div key={gif.id} className="gifs-label-cell">
    //                 <img src={gif.url} onClick={() => onChangeGifs(gif)} className="gif" />
    //             </div>
    //         })}
    //     </div>
    //     <div className="arrow-up"></div>
    // </section>
}