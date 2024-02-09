import React from "react";
import "../styles/calendar.css"
import {useApiGetCalendar, getMonth} from '../routes/App.js'

function getNameByDNI(array, dni) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].dni === dni) {
            return array[i].namesurname;
        }
    }
    return dni;
}

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

function Day({day, today}) {
    return (
        <div className={`container-day ${today ? ' container-today' : ''}`}>
            <p>{day}</p>
        </div>
    );
}


function Calendar({jsonList, personalList, esFormat, year, month, onlyMyCalendar}){
    const weekDayEs = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const weekDayEn = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    const monthName = getMonth(month);
    jsonList = useApiGetCalendar({ month: monthName, dni: onlyMyCalendar ? 43386520 : null});

    const getDayName = (index) => {
        return esFormat ? weekDayEs[index] : weekDayEn[index];
    };
    
    let today = new Date();
    const todayMonth = today.getMonth();
    today = today.getDate();

    const firstDayCurrentMonth = new Date(year, month, 1);
    const lasthDayPreviusMonth = new Date(year, month, 0).getDate();
    const lasthDayCurrentMonth = new Date(year, month + 1, 0).getDate();

    const firstDayWeekCurrentMonth = firstDayCurrentMonth.getDay();

    const lastDayPreviusMonth = Array.from({ length: firstDayWeekCurrentMonth - (esFormat ? 0 : 1)}, (_, index) => lasthDayPreviusMonth - index).reverse();
    const daysCurrentMonth = Array.from({ length: lasthDayCurrentMonth }, (_, index) => index + 1);
    

    const lastDaysInCalendar = 7 -(new Date(year, month + 1, 1).getDay()) + (esFormat ? 0 : 1) 
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
                        <Day day = {getDayPreviusMonth(index)}/>
                    </div>
                ))
            }
            {
                daysCurrentMonth.map((monthNum, index) => (
                    <div key={index} className={`container-currentMonth ${month === todayMonth && (index + 1) === today ? 'container-today' : ''}`}>
                        <Day day={getDayCurrentMonth(index)} />
                    {onlyMyCalendar ?
                        <PersonalList jsonList = {jsonList} index = {index}/>
                    :
                        <CalendarList jsonList={jsonList} personalList = {personalList} index={index}/>
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

function PersonalList({jsonList, index}){
    return(<>
            {jsonList && jsonList[0] ? (
                jsonList[0][index] === "TTM" ? (
                    <TM />
                ) : jsonList[0][index] === "TTT" ? (
                    <TT />
                ) : null
            ) : null}
            </>
    );
}

function CalendarList({jsonList, personalList, index}){
    if(index){
        const filteredElements = jsonList.filter(element => element[index]);
        return (
            <div className="container-names">{
            filteredElements.map(element => {
                if(element[index] === 'TTM'){
                    return <div key = {element['dni']}><TM dni = {getNameByDNI(personalList, element['dni'])}/></div>
                }
                else if(element[index] === 'TTT'){
                    return <div key = {element['dni']}><TT dni = {getNameByDNI(personalList, element['dni'])}/></div>
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