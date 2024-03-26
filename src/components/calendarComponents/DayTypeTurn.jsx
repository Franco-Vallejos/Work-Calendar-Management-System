import React from "react";
import '../../styles/calendarStyles/DayTypeTurn.css'
import { useCalendar } from "../../routes/App";

export function TM({dni, onClickFunction}){
    const calendar = useCalendar();
    return(
        <div className="container-TM" onClick={onClickFunction ? (() => {onClickFunction(dni)}) : undefined}>
            <span>{dni ? calendar.getNameByDNI(dni) : 'TM'}</span>
        </div>
    );
}

export function TT({dni, onClickFunction}){
    const calendar = useCalendar();
    return(
        <div className="container-TT" onClick={onClickFunction ? (() => {onClickFunction(dni)}) : undefined}>
            <span>{dni ? calendar.getNameByDNI(dni) : 'TT'}</span>
        </div>
    );
}