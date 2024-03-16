import React from "react";
import "../styles/calendar.css"
import {useCalendar} from '../routes/App.js'
import { useState } from "react";
import Day from "./calendarComponents/Day.jsx";
import CalendarAllList from "./calendarComponents/CalendarAllList.jsx";
import CalendarSelfList from "./calendarComponents/CalendarSelfList.jsx";
import Modal from "./calendarComponents/Modal.jsx";


function Calendar(){
    const [showModal, setShowModal] = useState(false);
    const [daySelected, setDaySelected] = useState();
    const [selfDayChange, setSelfDayChange] = useState();
    const weekDayEs = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const weekDayEn = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const calendar = useCalendar();

    const handleDayClick = (day) => {
        setDaySelected(day);
        setShowModal(true);
    };

    const handleSelfDayChange = (day) =>{
        const date = new Date(calendar.getYear(), calendar.getMonth(), day)
        console.log(date)
        if(date < calendar.getTodayDate())
            return;
        setSelfDayChange(day);
        setShowModal(false);
    }
  
    const getDayName = (index) => {
        return calendar.esFormat ? weekDayEs[index] : weekDayEn[index];
    };

    const onClose = () => {
        setShowModal(false);
    }
    
    let today = new Date();
    const todayMonth = today.getMonth();
    today = today.getDate();

    const firstDayCurrentMonth = new Date(calendar.getYear(), calendar.getMonth(), 1);
    const lasthDayPreviusMonth = new Date(calendar.getYear(), calendar.getMonth(), 0).getDate();
    const lasthDayCurrentMonth = new Date(calendar.getYear(), calendar.getMonth() + 1, 0).getDate();

    const firstDayWeekCurrentMonth = firstDayCurrentMonth.getDay();

    const lastDayPreviusMonth = Array.from({ length: firstDayWeekCurrentMonth - (calendar.esFormat ? 0 : 1)}, (_, index) => lasthDayPreviusMonth - index).reverse();
    const daysCurrentMonth = Array.from({ length: lasthDayCurrentMonth }, (_, index) => index + 1);
    

    const lastDaysInCalendar = 7 -(new Date(calendar.getYear(), calendar.getMonth() + 1, 1).getDay()) + (calendar.esFormat ? 0 : 1) 
    const firstDaysNextMont = Array.from({ length: (lastDaysInCalendar === 7 ? 0 : lastDaysInCalendar) }, (_, index) => index + 1);
    
    const getDayPreviusMonth = (index) => {
        return lastDayPreviusMonth[index];
    }
    const getDayCurrentMonth = (index) => {
        return daysCurrentMonth[index];
    }
    const getDayNextMonth = (index) => {
        return firstDaysNextMont[index];
    }

    return(
    <div className="container-calendar">
        <div className="container-header">
            {calendar.esFormat ?
                weekDayEs.map((dayName, index) => (
                    <div className="container-weekday" key={index}>
                        {getDayName(index)}
                    </div>
                )) :
                weekDayEn.map((dayName, index) => (
                    <div className="container-weekday" key={index}>
                        {getDayName(index)}
                    </div>
                ))
            }
        </div>
        <div className="container-monthday">
        {showModal && (
            <Modal onClose={onClose} day={daySelected} handleSelfDayChange = {handleSelfDayChange}/>
        )}

            {
                lastDayPreviusMonth.map((monthNum, index) => (
                    <div className="container-noCurrentMonth" key={index}>
                        <Day day = {getDayPreviusMonth(index)}/>
                    </div>
                ))
            }
            {
                daysCurrentMonth.map((monthNum, index) => (
                    <div key={index} onClick={() => handleDayClick(index + 1)} className={`container-currentMonth ${calendar.getMonth() === todayMonth && (index + 1) === today ? 'container-today' : ''}`}>
                        <Day day={getDayCurrentMonth(index)} />
                    {calendar.onlyMyCalendar ?
                        <CalendarSelfList index = {index}/>
                    :
                        <CalendarAllList index= {index} handleSelfDayChange = {handleSelfDayChange}/>
                    }
                    </div>
                ))
            }

                {
                firstDaysNextMont ? 
                firstDaysNextMont.map((monthNum, index) => (
                    <div className="container-noCurrentMonth" key={index}>
                        <Day day = {getDayNextMonth(index)}/>
                    </div> 
                )): null
            }
        </div>
    </div>
    );
}

export default Calendar;