import React from "react";
import { useCalendar } from "../../routes/App.js";
import { TM, TT } from "./DayTypeTurn.jsx";

function CalendarAllList({index, onClickSelfWorkDate, onClickWorkDate}){
    const calendar = useCalendar();
    const calendarList = calendar.getCalendarListAll();
    if(calendarList && index){
        const filteredElements = calendarList.filter(element => element[index]);
        return (
            <div className="container-names">{
            filteredElements.map(element => {
                const dni = element['dni'];
                if(element[index] === 'TTM'){
                    return <div key = {dni}><TM dni = {dni} onClickFunction={ calendar.getDni() === dni ? onClickSelfWorkDate : onClickWorkDate }/></div>
                }
                else if(element[index] === 'TTT'){
                    return <div key = {dni}><TT dni = {dni} onClickFunction={ calendar.getDni() === dni ? onClickSelfWorkDate : onClickWorkDate }/></div>
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