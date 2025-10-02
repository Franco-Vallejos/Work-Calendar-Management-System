import React, { useState } from "react";
import CalendarAllList from "./CalendarAllList";
import '../../styles/calendarStyles/Modal.css'
import { useCalendar } from "../../routes/App";
import { useWorkDateChangeContext } from "./Calendar.jsx";
import { useAuth } from "../../auth/AuthProvider.jsx";


function Modal() {
    const [isSelfWorkDateSelected, setIsSelfWorkDateSelected] = useState(false);
    const [isOtherWorkDateSelected, setIsOtherWorkDateSelected] = useState(false);
    const [userDateSelected, setUserDateSelected] = useState('');
    const calendar = useCalendar();
    const workDateChangeContext = useWorkDateChangeContext();
    const date = workDateChangeContext.getDateSelected();
    const auth = useAuth();

    const checkDate = () => {
        if (date.getMonth() <= calendar.getTodayDate().getMonth() && date.getDate() < calendar.getTodayDate().getDate())
        return false;
    return true;
}

const onClickSelfWorkDate = (user) => {
    console.log(checkDate())
    if (!checkDate())
            return;
        setIsSelfWorkDateSelected(true);
    }
    
    const onClickWorkDate = (user) => {
        
        console.log(`!${date} || !${checkDate()}`)
        if (!workDateChangeContext.getSelfWorkDateSelected() || !date || !checkDate())
            return;
        setUserDateSelected(user);
        setIsOtherWorkDateSelected(true);
    }
    
    const onClickSelfWorkDateButton = () => {
        workDateChangeContext.setSelfWorkDateSelected(date);
        setIsSelfWorkDateSelected(false);
        workDateChangeContext.onClose();
    }
    
    const onClickWordDateButton = async () => {
        const destinationDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()); 
        await addUserRequest(auth.getAccessToken(), calendar.getDni(), workDateChangeContext.getSelfWorkDateSelected(), userDateSelected,destinationDate);
        setIsOtherWorkDateSelected(false);
    }

    if (isOtherWorkDateSelected)
    return (
<>
                <div className="modal-overlay" onClick={workDateChangeContext.onClose} />
                <div className="modal-container">
                    <div className="modal">
                        <span>
                            Desea cambiar su turno del 
                            {workDateChangeContext.getSelfWorkDateSelected().getDate()}/
                            {workDateChangeContext.getSelfWorkDateSelected().getMonth()}/
                            {workDateChangeContext.getSelfWorkDateSelected().getFullYear()} 
                            por el turno del día 
                            {date.getDate()}/{date.getMonth()}/{date.getFullYear()}  ?
                        </span>
                        <button onClick={onClickWordDateButton}>Si</button>
                        <button onClick={() => setIsOtherWorkDateSelected(false)}>No</button>
                    </div>
                </div>
            </>
        );
        
    else if (isSelfWorkDateSelected)
    return (
            <>
                <div className="modal-overlay" onClick={workDateChangeContext.onClose} />
                <div className="modal-container">
                    <div className="modal">
                        <span>Desea cambiar el turno del día {date.getDate()} ?</span>
                        <button onClick={onClickSelfWorkDateButton}>Si</button>
                        <button onClick={() => setIsSelfWorkDateSelected(false)}>No</button>
                    </div>
                </div>
            </>
        );
        
        else
        return (
    <>
                <div className="modal-overlay" onClick={workDateChangeContext.onClose} />
                <div className="modal-container">
                    <div className="modal">
                        <div className="modal-day">
                            <span>{date.getDate()}</span>
                        </div>
                        <CalendarAllList index={date.getDate()} onClickSelfWorkDate={onClickSelfWorkDate} onClickWorkDate={onClickWorkDate} />
                    </div>
                </div>
            </>
        );
    }
    
    export default Modal;

async function addUserRequest(token, originDni, originDate, destinationDni, destinationDate) {
    console.log(originDni);
    console.log(originDate);
    console.log(destinationDni);
    console.log(destinationDate);
    
    try {
    const response = await fetch(`http://localhost:5000/api/query/request/add`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            originDni: originDni,
            originDate: originDate,
            destinationDni: destinationDni,
            destinationDate: destinationDate
        }),
    });

    if (response.ok) {
        const json = await response.json();
        return json.body;
    }
    } catch (error) {
    console.log(error)
    }
}
