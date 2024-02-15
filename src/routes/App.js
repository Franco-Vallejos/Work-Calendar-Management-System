// App.jsx
import '../styles/App.css';
import Body from '../components/Body';
import PersonalCalendar from '../components/PersonalCalendar';
import { useState } from 'react';
import { useEffect } from 'react';

export function useApiGetCalendar({ month, dni }) {
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    const getCalendar = async () => {
      try {
        const answer = await fetch(`http://localhost:4000/api/query/${month}?dni=${dni ? dni : ''}`);
        
        if (!answer.ok) {
          throw new Error('Error to get the Calendar');
        }

        const data = await answer.json();
        setCalendar(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getCalendar();
  }, [month, dni]);

  return calendar[0] || null;
}

export function getMonth(month){
  const months = ['january', 'february', 'march', 'april', 'may', 
                  'june', 'july', 'august', 'october', 'september', 'november', 'december'];

  return months[month];
}

function useApiGetPersonal(){
  const [personal, setPersonal] = useState([]);

  useEffect(() => {
    const getPersonal = async () => {
      try {
        const answer = await fetch(`http://localhost:4000/api/query/personal/all`);
        
        if (!answer.ok) {
          throw new Error('Error to get the Calendar');
        }

        const data = await answer.json();
        setPersonal(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    getPersonal();
  }, []);
  return personal[0] || null;
}

function App() {
  const personalList = useApiGetPersonal();
  const month = getMonth(new Date().getMonth());
  const dni = 43386520;
  const jsonList = useApiGetCalendar({ month: month, dni: dni });
  return (
    <Body>
      <PersonalCalendar jsonList={jsonList} personalList={personalList} dni={dni} />
    </Body>
  );
}

export default App;
