import '../styles/App.css';
import Body from '../components/Body';
import PersonalCalendar from '../components/PersonalCalendar';
import {useAuth } from '../auth/AuthProvider';
import { createContext, useEffect, useState , useContext} from 'react';
import Header from '../components/Header';

export const calendarContext = createContext({
  esFormat: true,
  onlyMyCalendar: true,
  getDni: () => {},
  getCalendarList: () => {},
  getCalendarListAll: () => {},
  getPersonalList: () => {},
  getMonth: () => {},
  getYear: () => {},
  getNameByDNI: (dni) => {},
  handleNextMonth: () => {},
  handlePrevMonth: () => {},
  handleOnlyMyCalendar: () => {},
  handleFormat: () => {},
})


export async function apiGetCalendar(token, month, dni){
  if (!month){
    return;
  }
  try {
    const response = await fetch(`http://localhost:5000/api/query/calendar/${getMonth(month)}?dni=${dni}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const json = await response.json();
      return json.body;
    }
  } catch (error) {
    console.log(error)
  }
}

export function getMonth(month) {
  const months = ['january', 'february', 'march', 'april', 'may', 
                  'june', 'july', 'august', 'october', 'september', 'november', 'december'];

  return months[month];
}

async function apiGetPersonal(token) {
  try {
    const response = await fetch(`http://localhost:5000/api/query/personal/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const json = await response.json();
      return json.body;
    }
  } catch (error) {
    console.log(error)
  }
}

function App() {
  const [calendarList, setCalendarList] = useState({});
  const [calendarListAll, setCalendarListAll] = useState({});
  const [personalList, setPersonalList] = useState({});
  const [esFormat, setFormat] = useState(true);
  const [onlyMyCalendar, setOnlyMyCalendar] = useState(true);
  const auth = useAuth();
  const nowDate = new Date();
  const initialMonth = nowDate.getMonth();
  const initialYear = nowDate.getFullYear();

  const nowYear = nowDate.getFullYear();
  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const [dni, setDni] = useState(auth.getUser() ? auth.getUser().username : undefined); // Mover la inicialización aquí

  const handleFormat = () => {
    setFormat(!esFormat);
  };
  
  const handleOnlyMyCalendar = () => {
    setOnlyMyCalendar((onlyMyCalendar) =>(!onlyMyCalendar))
  }
  
  const getMonth = () =>{
    return month;
  }
  const getYear = () =>{
    return year;
  }
  
  const getPersonalList = () => {
    return personalList;
  }
  
  const getCalendarList = () => {
    return calendarList;
  }

  const getCalendarListAll = () => {
    return calendarListAll;
  }
  
  const getDni = () => {
    return dni;
  }
  
  useEffect(() => {
    async  function getLists() {
      setDni(auth.getUser() ? auth.getUser().username : undefined);
      setPersonalList(await apiGetPersonal(auth.getAccessToken()));
      setCalendarList(await apiGetCalendar(auth.getAccessToken(), month, dni));
      setCalendarListAll(await apiGetCalendar(auth.getAccessToken(), month, ''))
    }
    getLists();
  }, [month, dni, auth, onlyMyCalendar, setCalendarList, setPersonalList, setCalendarListAll])
  
  const handlePrevMonth = () => {
    const prevMonth = ((month - 1) === -1 ? 11 : (month - 1));
    setYear((year) => (year === (nowYear - 1) ? year : ((prevMonth - 1) === -1 ? year - 1 : year)));
    setMonth(prevMonth);
  };
  
  const handleNextMonth = () => {
    const nextMonth = ((month + 1) === 12 ? 0 : (month + 1))
    setYear((year) => (year === (nowYear + 1) ? year : ((nextMonth + 1) === 12 ? year + 1 : year)));
    setMonth(nextMonth);
  };
  
  const getNameByDNI = (dni) => {
    const personalList = getPersonalList();
    for (let i = 0; i < personalList.length; i++) {
      if (personalList[i].dni === dni) {
        return personalList[i].namesurname;
      }
    }
    return dni;
  };

  return (
      <calendarContext.Provider
      value={{
        esFormat,
        onlyMyCalendar,
        getDni,
        getCalendarList,
        getPersonalList,
        getCalendarListAll,
        getMonth,
        getYear,
        getNameByDNI,
        handleNextMonth,
        handlePrevMonth,
        handleOnlyMyCalendar,
        handleFormat,
      }}
      >
        {dni ? (
          <Body>
            <Header/>
            <PersonalCalendar/>
          </Body>
        ) : (
          <div>Loading...</div>
          )}
      </calendarContext.Provider>
  );
}

export default App;


export const useCalendar = () => useContext(calendarContext);