import logo from './logo.svg';
import './App.css';
import Body from './components/Body';
import PersonalCalendar from './components/PersonalCalendar';
import { useState, useEffect } from 'react';

  function App() {
    const [productos, setProductos] = useState([]);
  
    useEffect(() => {
      const obtenerProductos = async () => {
        try {
          const respuesta = await fetch('http://localhost:4000/products');
          
          if (!respuesta.ok) {
            throw new Error('Error al obtener los productos');
          }
  
          const datos = await respuesta.json();
          setProductos(datos);
        } catch (error) {
          console.error('Hubo un error:', error);
        }
      };
  
      obtenerProductos();
    }, []); // El array vacío significa que este efecto se ejecutará solo una vez al montar el componente
    let jsonList;
    if (productos[0]){
      jsonList = productos[0];
    }
  return (
    <Body>
      <h1>Este es mi calendario!</h1>
      <PersonalCalendar jsonList = {jsonList}/>
    </Body>
  );
}

export default App;
