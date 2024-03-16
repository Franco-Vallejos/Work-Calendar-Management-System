import React from "react";
import '../../styles/calendarStyles/DayTypeTurn.css'

export function TM({dni, onClickFunction, day}){
    return(
        <div className="container-TM" onClick={onClickFunction ? (() => {onClickFunction(day)}) : undefined}>
            <span>{dni ? dni : 'TM'}</span>
        </div>
    );
}

export function TT({dni, onClickFunction, day}){
    return(
        <div className="container-TT" onClick={onClickFunction ? (() => {onClickFunction(day)}) : undefined}>
            <span>{dni ? dni : 'TT'}</span>
        </div>
    );
}