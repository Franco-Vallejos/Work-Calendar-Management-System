import React, {useState} from 'react';
import {} from "./Calendar.jsx";

function ButtonFormat({toggleFormat, esFormat}) {    
    return (
        <button onClick={toggleFormat}>{esFormat ? "Domingo - Sabado" : "Lunes - Domingo"}</button>
    );
}

export default ButtonFormat;
