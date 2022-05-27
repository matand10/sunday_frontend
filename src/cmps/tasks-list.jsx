import { useRef, useState, useEffect } from "react";
import { utilService } from "../services/util.service";
import { StatusModal } from '../modal/status-modal'
import { useDispatch, useSelector } from "react-redux"
import { saveBoard } from "../store/board/board.action"
import { useParams } from "react-router-dom";
import { boardService } from "../services/board.service";


export const TasksList = ({ group, task, backgroundColor, onHandleRightClick, menuRef }) => {
    const [isStatusActive, setIsStatusActive] = useState(false)
    const [modalPos, setModalPos] = useState({ x: null, y: null })
    const dispatch = useDispatch()
    const { boardId } = useParams()
    let statusRef = useRef()

    useEffect(() => {
        document.addEventListener("mousedown", (event) => {
            if (!statusRef.current?.contains(event.target)) {
                setIsStatusActive(false)
            }
        })
    }, [])

    const changeStatus = async (status) => {
        const board = await boardService.getById(boardId)
        console.log(task);
        task.status = status
        console.log(task);
        dispatch(saveBoard(board))
        setIsStatusActive(false)
    }



    const toggleStatus = (ev, value) => {
        const x = ev.pageX
        const y = ev.pageY
        setModalPos({ x: x, y: y })
        setIsStatusActive(value)
    }

    return <section className="task-row-component" onContextMenu={(ev) => onHandleRightClick(ev, task, true)} ref={menuRef}>
        <div className="task-row-wrapper">
            <div className="task-row-title">
                <div className="task-title-cell-component">
                    <div className="left-indicator-cell" style={{ backgroundColor }}></div>
                    <div className="task-title-cell">{task.title}</div>
                </div>
                <div className="task-row-items">
                    <div className="flex-row-items">{task.assignedTo.map(user => user.fullname)}</div>
                    <div className="flex-row-items status" onClick={(ev) => toggleStatus(ev, true)} style={{ backgroundColor: task.status.color }}>{task.status.title}</div>
                    <div className="flex-row-items">{utilService.getCurrTime(task.archivedAt)}</div>
                </div>
            </div>
        </div>

        {isStatusActive && <StatusModal changeStatus={changeStatus} task={task} statusRef={statusRef} modalPos={modalPos} />}
    </section>
}