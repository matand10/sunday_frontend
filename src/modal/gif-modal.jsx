import { utilService } from '../services/util.service'
import { boardService } from '../services/board.service'


export const GifModal = ({ specialUpdateTask, setIsGifModal, isGifModal }) => {

    const onChangeGifs = (value) => {
        specialUpdateTask(value, isGifModal)
        setStatusActive(false)
    }

    return <section className="main-status-modal" style={{ left: modalPos.x - 75, top: modalPos.y + 15 }} ref={statusRef}>
        <div className="status-modal-container">
            {gifs.map(gifs => {
                return <div className="gifs-label-cell">
                    <img src={gifs.url} onClick={() => onChangeGifs(label)} key={label.id} className="gif" />
                </div>
            })}
        </div>
        <div className="arrow-up"></div>
    </section>
}