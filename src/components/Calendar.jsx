import React from "react";
import "../styles/calendar.css"

function Calendar({esFormat, year, month}){
    const weekDayEs = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const weekDayEn = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    const getDayName = (index) => {
        return esFormat ? weekDayEs[index] : weekDayEn[index];
    };

    const firstDayCurrentMonth = new Date(year, month, 1);
    const lasthDayPreviusMonth = new Date(year, month, 0).getDate();
    const lasthDayCurrentMonth = new Date(year, month + 1, 0).getDate(); 

    const firstDayWeekCurrentMonth = firstDayCurrentMonth.getDay();

    const lastDayPreviusMonth = Array.from({ length: firstDayWeekCurrentMonth - (esFormat ? 0 : 1)}, (_, index) => lasthDayPreviusMonth - index).reverse();
    const daysCurrentMonth = Array.from({ length: lasthDayCurrentMonth }, (_, index) => index + 1);

    const firstDaysNextMont = Array.from({ length: 7 -(new Date(year, month + 1, 1).getDay()) + (esFormat ? 0 : 1) }, (_, index) => index + 1);
     
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
            {esFormat ?
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
            {
                lastDayPreviusMonth.map((monthNum, index) => (
                    <div className="container-noCurrentMonth" key={index}>
                        {getDayPreviusMonth(index)}
                    </div>
                ))
            }
                        {
                daysCurrentMonth.map((monthNum, index) => (
                    <div className="container-currentMonth" key={index}>
                        {getDayCurrentMonth(index)}
                    </div>
                ))
            }
                {
                firstDaysNextMont ? 
                firstDaysNextMont.map((monthNum, index) => (
                    <div className="container-noCurrentMonth" key={index}>
                        {getDayNextMonth(index)}
                    </div> 
                )): null
            }
        </div>
    </div>
    );
}

export default Calendar;