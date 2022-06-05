import { useEffect, useRef, useState } from 'react'
import { useEffectUpdate } from "../hooks/useEffectUpdate";
import { DateRange } from 'react-date-range'
import { addDays } from 'date-fns'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'



export const TimelineCol = ({ task, group, updateTask, col, idx }) => {
    const refOne = useRef(null)
    const [hover, setHover] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [timelineDate, setTimelineDate] = useState({})
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
        const daysToGo = target.getDay() - today.getDay()
        task.columns[idx].value = { precent, daysToGo }
        updateTask(task, group.id)
    }, [range])

    const handleOnClickOutside = (ev) => {
        if (refOne.current && !refOne.current.contains(ev.target)) {
            setIsOpen(false)
        }
    }

    const colInfo = task.columns[idx].value
    return <section className="timeline">
        <div onClick={() => setIsOpen(true)} className="timeline-bar-container" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <div className="timeline-bar-wrapper">
                <div className="timeline-bar" style={{ backgroundcolor: 'red', width: `${colInfo.precent}` + '%' }}></div>
                <div className="days-indicate">{hover ? colInfo.daysToGo + ' d' : ''}</div>
            </div>
        </div>

        <div ref={refOne} className="daterange-modal-container">
            {isOpen &&
                <DateRange
                    onChange={item => setRange([item.selection])}
                    editableDateInputs={true}
                    moveRangeOnFirstSelection={false}
                    ranges={range}
                    months={1}
                    direction="horizontal"
                    className="calendarElement"
                />}
        </div>
    </section>
}



