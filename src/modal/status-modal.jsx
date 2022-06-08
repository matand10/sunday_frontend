import { utilService } from '../services/util.service'
import { boardService } from '../services/board.service'


export const StatusModal = ({ statusActive, setStatusActive, statusRef, modalPos, specialUpdateTask }) => {

    const onChangeStatus = (value) => {
        specialUpdateTask(value, statusActive.colIdx)
        setStatusActive(false)
    }

    const labels = statusActive.labels
    return <section className="main-status-modal" style={{ left: modalPos.x - 75, top: modalPos.y + 15 }} ref={statusRef}>
        <div className="status-modal-container">
            {labels.map(label => {
                if (label.type === 'gif') return <div key={label.id} className="status-label-cell" >
                    <img src={label.url} onClick={() => onChangeStatus(label)} />
                </div>
                return <div onClick={() => onChangeStatus(label)} key={label.id} className="status-label-cell" style={{ backgroundColor: label.color }}>{label.title}</div>
            })}
        </div>
        <div className="arrow-up"></div>
    </section>
}