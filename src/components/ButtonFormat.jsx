import React from 'react';

function ButtonFormat({toggleFormat, esFormat}) {    
    return (
        <button onClick={toggleFormat}>{esFormat ? "Domingo - Sabado" : "Lunes - Domingo"}</button>
    );
}

export default ButtonFormat;
