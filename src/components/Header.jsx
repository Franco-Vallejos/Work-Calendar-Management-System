import React from "react";
import { useAuth } from "../auth/AuthProvider";
import { useCalendar } from "../routes/App";
import "../styles/Header.css";

function Header() {
  const auth = useAuth();
  const calendar = useCalendar();
  const dni = auth.getUser().username;
  const username = calendar.getNameByDNI(dni);

  return (
    <div className="header-container">
      <span className="welcome-message">¡Bienvenido, {username}!</span>
      <button className="logout-button" onClick={() => auth.logOut()}>
        Logout
      </button>
    </div>
  );
}

export default Header;
