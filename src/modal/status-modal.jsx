import { utilService } from '../services/util.service'
import { boardService } from '../services/board.service'


export const StatusModal = ({ statusRef, modalPos, task, changeStatus }) => {

    const onChangeStatus = (status) => {
        changeStatus(status)
    }


    const labels = boardService.getLabels()
    return <section className="main-status-modal" style={{ left: modalPos.x - 75, top: modalPos.y + 15 }} ref={statusRef}>
        <div className="status-modal-container">
            {labels.map(label => {
                return <div onClick={() => onChangeStatus(label)} key={label.id} className="status-label-cell" style={{ backgroundColor: label.color }}>{label.title}</div>
            })}
        </div>
        <div className="arrow-up"></div>
    </section>
}