import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { boardService } from "../services/board.service"
import { saveBoard } from '../store/board/board.action'


export const ProgressBar = ({ group, board }) => {
    // const [progress, setProgress] = useState('')
    const [progress, setProgress] = useState(false)
    const dispatch = useDispatch()

    const getProgress = () => {
        const groupTaskMap = group.tasks.reduce((acc, task) => {
            task.columns.forEach(column => {
                if (column.type === 'status') {
                    if (acc[column.value.title]) acc[column.value.title] += 1
                    else acc[column.value.title] = 1
                } else {
                    return
                }
            })
            return acc
        }, {})
        group.progress = groupTaskMap
        setProgress(groupTaskMap)
        return group
    }

    const updateGroupProgress = (newGroup, board) => {
        const newBoard = boardService.groupUpdate(newGroup, board)
        dispatch(saveBoard(newBoard))
    }

    useEffect(() => {
        getProgress()
    }, [])

    useEffect(() => {
        updateGroupProgress(getProgress(), board)
    }, [progress])

    return <section className="progress-display">
        <div className="progress-bar">
            {progress && progress.Done && <div className="progress-indicator" style={{ backgroundColor: '#00c875', width: (100 * (group?.progress.Done / group.tasks.length) + '%') }}></div>}
            {progress && progress['Working on it'] && <div className="progress-indicator" style={{ backgroundColor: '#fdab3d', width: (100 * (group?.progress['Working on it'] / group.tasks.length) + '%') }}></div>}
            {progress && progress.Stuck && <div className="progress-indicator" style={{ backgroundColor: '#e2445c', width: (100 * (group?.progress.Stuck / group.tasks.length) + '%') }}></div>}
        </div>
    </section>
}