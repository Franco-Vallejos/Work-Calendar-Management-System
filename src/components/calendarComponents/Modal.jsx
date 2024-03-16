import React from "react";
import CalendarAllList from "./CalendarAllList";
import '../../styles/calendarStyles/Modal.css'

function Modal({ onClose, day, handleSelfDayChange}) {
    return (
        <>
        <div className="modal-overlay" onClick={onClose}/>
            <div className="modal-container">    
                <div className="modal">
                    <div className="modal-day">
                        <span>{day}</span> 
                    </div>
                    <CalendarAllList index={day-1} handleSelfDayChange={handleSelfDayChange}/>
                </div>
            </div>
        </>
    );
}

export default Modal;
