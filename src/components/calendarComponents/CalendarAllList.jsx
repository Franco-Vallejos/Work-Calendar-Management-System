import React from "react";
import { useCalendar } from "../../routes/App.js";
import { TM, TT } from "./DayTypeTurn.jsx";

function CalendarAllList({index, handleSelfDayChange}){
    const calendar = useCalendar();
    const calendarList = calendar.getCalendarListAll();
    if(calendarList && index){
        const filteredElements = calendarList.filter(element => element[index]);
        return (
            <div className="container-names">{
            filteredElements.map(element => {
                if(element[index] === 'TTM'){
                    return <div key = {element['dni']}><TM dni = {calendar.getNameByDNI(element['dni'])} onClickFunction={ calendar.getDni() === element['dni'] ? handleSelfDayChange : undefined } day = {index + 1}/></div>
                }
                else if(element[index] === 'TTT'){
                    return <div key = {element['dni']}><TT dni = {calendar.getNameByDNI(element['dni'])} onClickFunction={ calendar.getDni() === element['dni'] ? handleSelfDayChange : undefined } day = {index + 1}/></div>
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

export default CalendarAllList;