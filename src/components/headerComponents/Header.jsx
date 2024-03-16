import React, { useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { useCalendar } from "../../routes/App";
import "../../styles/headerStyles/Header.css";
import Modal from "./Modal";

function Header() {
  const auth = useAuth();
  const calendar = useCalendar();
  const dni = calendar.getDni()
  const username = calendar.getNameByDNI(dni);

  const [showRequests, setShowRequests] = useState(false);

  const onClose = () => {
    setShowRequests(false);
  };

  return (
    <div className="header-container">
      <span className="welcome-message">¡Bienvenido, {username}!</span>
      <div className="button-container">
        <div className="requests-container">
          <button className="notification-button" onClick={() => setShowRequests(true)}>
            Solicitudes
          </button>
          {showRequests && <Modal onClose={onClose} showRequests = {showRequests}/>}
        </div>
        <button className="logout-button" onClick={() => auth.logOut()}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;
