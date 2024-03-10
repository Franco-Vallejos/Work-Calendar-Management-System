import React from "react";
import ButtonFormat from './ButtonFormat';
import "../styles/calendarControls.css";
import { useCalendar } from "../routes/App";

function Year(){
    return(
            <h1>{useCalendar().getYear()}</h1>

    );
}


function Controls(){
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const calendar = useCalendar();
    return(
        <div className="container-controls">
            <ToggleCalendar accion={calendar.handleOnlyMyCalendar} name = {calendar.onlyMyCalendar}/>
            <ToggleMonth className="toggleMonth" name = "Prev" accion={calendar.handlePrevMonth}/>
            <h2>{monthNames[calendar.getMonth()]}</h2>
            <ToggleMonth className="toggleMonth" name = "Next" accion={calendar.handleNextMonth}/>
            <ButtonFormat/>   
        </div> 
    );
}

function ToggleCalendar({accion, name}){
    return(
        <button onClick={accion}>{name ? "Todos" : "Personal"}</button>
    );
}

function ToggleMonth({name, accion}){
    return(
        <button onClick = {accion}>{name}</button>
    );
}

function CalendarControls(){
    return(
        <div className="container-fluid container-calendarControls">
            <Year />
            <Controls/>
        </div>
    );
}

export default CalendarControls;