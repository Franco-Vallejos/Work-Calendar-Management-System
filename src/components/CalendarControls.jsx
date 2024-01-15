import React from "react";
import ButtonFormat from './ButtonFormat';
import "../styles/calendarControls.css";

function Year({month, year}){
    return(
            <h1>{year}</h1>

    );
}

function Controls({month, toggleFormat, esFormat, handleNextMonth, handlePrevMonth}){
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return(
        <div className="container-controls">
            <div/>
            <ToggleMonth className="toggleMonth" name = "Prev" accion={handlePrevMonth}/>
            <h2>{monthNames[month]}</h2>
            <ToggleMonth className="toggleMonth" name = "Next" accion={handleNextMonth}/>
            <ButtonFormat toggleFormat = {toggleFormat} esFormat = {esFormat} />   
        </div> 
    );
}

function ToggleMonth({name, accion}){
    return(
        <button onClick = {accion}>{name}</button>
    );
}

function CalendarControls({month, year, toggleFormat, esFormat, handleNextMonth, handlePrevMonth}){
    return(
        <div className="container-fluid container-calendarControls">
            <Year  year = {year}/>
            <Controls month={month} toggleFormat = {toggleFormat} esFormat = {esFormat}
                    handlePrevMonth = {handlePrevMonth} handleNextMonth = {handleNextMonth}/>
        </div>
    );
}

export default CalendarControls;