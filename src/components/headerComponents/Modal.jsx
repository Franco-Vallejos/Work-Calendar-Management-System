import React, { useState } from "react";
import { useCalendar } from "../../routes/App";
import Request from "./Request";
import "../../styles/headerStyles/Modal.css";

function Modal({ onClose, showRequests }) {
    const [myRequestSelected, setMyRequestSelected] = useState(false);
  
  
    const calendar = useCalendar();
    const userRequestList = calendar.getUserRequest();
    const myRequest = userRequestList.filter(element => element.originDni === calendar.getDni());
    const request = userRequestList.filter(element => !myRequest.includes(element));
  
    return (
      <>
        <div className="modal-request-overlay" onClick={onClose}/>
        <div className={`requests-modal ${showRequests ? 'show' : ''}`}>
          <div className="modal-header-container">
            <button className="option-button" onClick={() => setMyRequestSelected(false)}>
              Solicitudes de Otros
            </button>
            <button className= "option-button" onClick={() => setMyRequestSelected(true)}>
              Mis Solicitudes
            </button>
          </div>
          <div className="requests-content">
            {!myRequestSelected &&
              request.map(element => (
                <Request request = {element} type = {myRequestSelected}/>
              ))}
            {myRequestSelected &&
              myRequest.map(element => (
                <Request request = {element} type = {myRequestSelected}/>
              ))}
          </div>
        </div>
      </>
    );
  }

export default Modal; 
  