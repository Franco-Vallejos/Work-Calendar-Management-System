import React from "react";
import "../styles/calendar.css"
import {useCalendar} from '../routes/App.js'
import { useState } from "react";

function TM({dni}){
    return(
        <div className="container-TM">
            <span>{dni ? dni : 'TM'}</span>
        </div>
    );
}

function TT({dni}){
    return(
        <div className="container-TT">
            <span>{dni ? dni : 'TT'}</span>
        </div>
    );
}

function Day({ day, today, onDayClick }) {
    return (
      <div
        className={`container-day ${today ? " container-today" : ""}`}
      >
        <p>{day}</p>
      </div>
    );
  }
  

  function Modal({ onClose, onConfirm, day}) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal">
        <p>Day selected: {day}</p>
        <CalendarList index = {day}/>
          <div className="modal-buttons">
            <button onClick={onConfirm}>Sí</button>
            <button onClick={onClose}>No</button>
          </div>
        </div>
      </div>
    );
  }

function Calendar(){
    const [showModal, setShowModal] = useState(false);
    const [daySelected, setDaySelected] = useState();
    const weekDayEs = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const weekDayEn = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const calendar = useCalendar();


    const handleDayClick = (day) => {
        setDaySelected(day);
        setShowModal(true);
        console.log(day)
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };
  
    const handleConfirmChange = () => {
      // Lógica para cambiar el turno
      setShowModal(false);
    };
    
    const getDayName = (index) => {
        return calendar.esFormat ? weekDayEs[index] : weekDayEn[index];
    };
    
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
            <Modal onClose={handleCloseModal} onConfirm={handleConfirmChange} day={daySelected} />
        )}

            {
                lastDayPreviusMonth.map((monthNum, index) => (
                    <div className="container-noCurrentMonth" key={index}>
                        <Day day = {getDayPreviusMonth(index)}/>
                    </div>
                ))
            }
            {
                daysCurrentMonth.map((day, index) => (
                    <div key={index} onClick={() => handleDayClick(index)} className={`container-currentMonth ${calendar.getMonth() === todayMonth && (index + 1) === today ? 'container-today' : ''}`}>
                        <Day day={getDayCurrentMonth(index)} />
                    {calendar.onlyMyCalendar ?
                        <PersonalList index = {index}/>
                    :
                        <CalendarList index= {index}/>
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

function PersonalList({index}){
    const calendar = useCalendar()
    const calendarList = calendar.getCalendarList();
    return(
        <>
            {calendarList && !!calendarList[0] ? (
                calendarList[0][index] === "TTM" ? (
                    <TM />
                ) : calendarList[0][index] === "TTT" ? (
                    <TT />
                ) : null
            ) : null}
        </>
    );
}

function CalendarList({index}){
    const calendar = useCalendar();
    const calendarList = calendar.getCalendarListAll();
    if(calendarList && index){
        const filteredElements = calendarList.filter(element => element[index]);
        console.log(filteredElements)
        return (
            <div className="container-names">{
            filteredElements.map(element => {
                if(element[index] === 'TTM'){
                    return <div key = {element['dni']}><TM dni = {calendar.getNameByDNI(element['dni'])}/></div>
                }
                else if(element[index] === 'TTT'){
                    return <div key = {element['dni']}><TT dni = {calendar.getNameByDNI(element['dni'])}/></div>
                }
                else{
                    return null
                }
                }) 
        }
        </div>
        );
    }
}

export default Calendar;