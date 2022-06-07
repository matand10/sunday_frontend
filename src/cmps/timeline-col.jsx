import { useEffect, useRef, useState } from 'react'
import { useEffectUpdate } from "../hooks/useEffectUpdate";
import { DateRange } from 'react-date-range'
import { addDays } from 'date-fns'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { utilService } from '../services/util.service';



export const TimelineCol = ({ task, group, updateTask, idx, specialUpdateTask }) => {
    const refOne = useRef(null)
    const [hover, setHover] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [range, setRange] = useState([{
        startDate: new Date(),
        endDate: addDays(new Date(), 7),
        key: 'selection'
    }])

    useEffect(() => {
        document.addEventListener("mousedown", handleOnClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleOnClickOutside)
        }
    }, [])

    useEffectUpdate(() => {
        const start = new Date(range[0].startDate.getTime())
        const target = new Date(range[0].endDate.getTime())
        const today = new Date(Date.now())
        const precent = (today - start) / (target - start) * 100
        const daysToGo = (target - start) / (1000 * 60 * 60 * 24)
        // task.columns[idx].value = { precent, daysToGo }
        let dateStr
        if (start.getMonth() === target.getMonth()) {
            dateStr = `${utilService.getShortMonth(start.getMonth())} ${start.getDate()}-${target.getDate()}`
        } else {
            dateStr = `${utilService.getShortMonth(start.getMonth())} ${start.getDate()}-${utilService.getShortMonth(target.getMonth())} ${target.getDate()}`
        }
        const value = { precent, daysToGo, dateStr }
        task.columns[idx].value = { ...value }
        updateTask(task, group.id)
    }, [range])

    const handleOnClickOutside = (ev) => {
        if (refOne.current && !refOne.current.contains(ev.target)) {
            setIsOpen(false)
        }
    }

    // const colInfo = task.columns[idx].value

    return <section className="flex-row-items timeline">
        {/* <div className="timeline"> */}
            <div onClick={() => setIsOpen(true)} className="timeline-bar-container" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                <div className="timeline-bar-wrapper">
                    <div className="timeline-bar" style={{ backgroundcolor: 'red', width: `${task.columns[idx].value.precent || 0}` + '%' }}></div>
                    <div className="days-indicate">
                        {hover ? (task.columns[idx].value.daysToGo ? task.columns[idx].value.daysToGo + ' d' : 'Set Dates') : task.columns[idx].value.dateStr ? task.columns[idx].value.dateStr : '-'}
                    </div>
                </div>
            </div>

            <div ref={refOne} className="daterange-modal-container">
                {isOpen &&
                    <DateRange
                        onChange={item => setRange([item.selection])}
                        editableDateInputs={true}
                        moveRangeOnFirstSelection={false}
                        ranges={range}
                        months={2}
                        direction="horizontal"
                        className="calendarElement"
                    />}
            </div>
        {/* </div> */}
    </section>
}

