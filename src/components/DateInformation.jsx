import React from "react";

function DateInformation({month, year}){
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return(
        <div>
            <h1>{year}</h1>
            <h2>{monthNames[month]}</h2>
        </div>
    );
}

export default DateInformation;