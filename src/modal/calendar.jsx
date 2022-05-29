import React, { useState } from 'react';
import Calendar from 'react-calendar'

export const DateCalendar = () => {
    const [date, setDate] = useState(new Date())

    const onChangeDate=(date)=>{
        setDate(date)
    }

    return (
        <section>
            <div className="calendar-container">
                <Calendar onChange={onChangeDate} valu={date}/>
            </div>
        </section>

    )
}