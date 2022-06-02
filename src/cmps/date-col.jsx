import { utilService } from '../services/util.service'
export const DateCol = ({ col, specialUpdateTask, dateRef, idx }) => {

    const handleDateChange = ({ target }, colIdx) => {
        specialUpdateTask(target.value, colIdx)
    }

    return <div className="flex-row-items">
        <label htmlFor="task-date">{col.value ? utilService.getCurrTime(col.value) : ''}</label>
        <input id="task-date" type="date" name="archivedAt" defaultValue={col.value} onChange={(event) => handleDateChange(event, idx)} ref={dateRef} />
    </div>
}