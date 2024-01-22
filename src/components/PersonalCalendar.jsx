import React, {useState} from "react";
import Calendar from './Calendar';
import CalendarControls from "./CalendarControls";

function PersonalCalendar({jsonList}){
    const nowDate = new Date();
    const nowYear = nowDate.getFullYear();
    const nowMonth = nowDate.getMonth(); 
    const [year, setYear] = useState(nowYear);
    const [month, setMonth] = useState(nowMonth);
    
    const handlePrevMonth = () => {
        const prevMonth = ((nowMonth - 1) === -1 ? 11 : (nowMonth - 1));
        setYear((year) => (year === (nowYear - 1) ? year : ((month - 1) === -1 ? year - 1 : year)));
        setMonth((month) => (month === prevMonth ? month : ((month - 1) === -1 ? 11 : month - 1)));
    };
    
    const handleNextMonth = () => {
        const nextMonth = ((nowMonth + 1) === 12 ? 0 : (nowMonth + 1))
        setYear((year) => (year === (nowYear + 1) ? year : ((month + 1) === 12 ? year + 1 : year)));
        setMonth((month) => (month === nextMonth ? month : ((month + 1) === 12 ? 0 : month + 1)));
    };
    
    const [esFormat, setFormat] = useState(true);
    const [onlyMyCalendar, setOnlyMyCalendar] = useState(true);

    const toggleFormat = () => {
        setFormat(!esFormat);
    };
    const handleOnlyMyCalendar = () => {
        setOnlyMyCalendar((onlyMyCalendar) =>(!onlyMyCalendar))
    }
    
    return(
        <div className="container-pc">
            <CalendarControls month = {month} year = {year} 
                            toggleFormat = {toggleFormat} esFormat = {esFormat}
                            handlePrevMonth = {handlePrevMonth} handleNextMonth = {handleNextMonth}
                            handleOnlyMyCalendar = {handleOnlyMyCalendar} onlyMyCalendar = {onlyMyCalendar}/>
            <Calendar jsonList = {jsonList} esFormat = {esFormat} month = {month} year = {year}/>
        </div>
    );
}

export default PersonalCalendar;