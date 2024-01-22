import './App.css';
import Body from './components/Body';
import PersonalCalendar from './components/PersonalCalendar';
import { useState, useEffect } from 'react';

export function useApi({ month, dni }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const respuesta = await fetch(`http://localhost:4000/api/query/${month}?dni=${dni}`);
        
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
  }, [month, dni]);

  return productos[0] || null;
}

export function getMonth(month){
  const months = ['january', 'february', 'march', 'april', 'may', 
                  'june', 'july', 'august', 'october', 'september', 'november', 'december'];

  return months[month];
}

function App() {
  const month = getMonth(new Date().getMonth());
  const jsonList = useApi({ month: month, dni: 43386520});

  return (
    <Body>
      <PersonalCalendar jsonList={jsonList} />
    </Body>
  );
}

export default App;
