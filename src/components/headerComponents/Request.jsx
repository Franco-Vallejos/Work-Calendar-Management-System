import React from "react";
import { useCalendar } from "../../routes/App";

function Button({name}){
    return(
        <button>{name}</button>
    );
}

function Request({request, type}) {
    const calendar = useCalendar();
    const originUser = calendar.getNameByDNI(request.originDni);
    const destinationUser = calendar.getNameByDNI(request.destinationDni);
    const originDate = new Date(request.originDate);
    const destinationDate = new Date(request.destinationDate);
    
    return(
        <div className="request-container">
            <span>{originUser} solicita turno {originDate.getDate() + '/' + originDate.getMonth() + 1 + ' '} 
                    por el turno {destinationDate.getDate() + '/' + (destinationDate.getMonth() + 1)}
                <div className="button-container">
                    <Button name = {type ? 'elim' : 'aceptar'}/>
                    {!type ? <Button name = 'rechazar'/> : '' }
                            
                </div>
            </span>
        </div>
    );
}

export default Request;