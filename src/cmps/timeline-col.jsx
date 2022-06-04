import { useEffect, useRef, useState } from 'react'
import { DateRange } from 'react-date-range'
import { addDays } from 'date-fns'


import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

export const TimelineCol = () => {
    const [range, setRange] = useState([{
        startDate: new Date(),
        endDate: addDays(new Date(), 7),
        key: 'selection'
    }])
    const [hover, setHover] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const refOne = useRef(null)

    useEffect(() => {
        document.addEventListener("mousedown", handleOnClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleOnClickOutside)
        }
    }, [])

    const handleOnClickOutside = (ev) => {
        if (refOne.current && !refOne.current.contains(ev.target)) {
            setIsOpen(false)
        }
    }

    // console.log(range.startDate)
    // const Diffrence_In_Time = range[0].endDate.getTime() - range[0].startDate.getTime()
    // const Difference_In_Days = Diffrence_In_Time / (1000 * 3600 * 24);
    // console.log(Difference_In_Days);

    const target = new Date(range[0].endDate.getTime()).getDay()
    const currDay = new Date(range[0].startDate.getTime()).getDay()
    const daysToGo = Math.ceil((target - currDay) / (1000 * 60 * 60 * 24))
    const percent = (currDay / target) * 100
    const totalDays = target - currDay
    // console.log('Total days to work: ', totalDays);
    // console.log('current day : ', currDay);


    return <section className="timeline">
        <div onClick={() => setIsOpen(true)} className="timeline-bar-container" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <div className="timeline-bar-wrapper">
                <div className="timeline-bar" style={{ backgroundcolor: 'red', width: `${percent}` + '%' }}>
                    {hover ? daysToGo + ' d' : ''}
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
                    months={1}
                    direction="horizontal"
                    className="calendarElement"
                />}
        </div>
    </section>
}



