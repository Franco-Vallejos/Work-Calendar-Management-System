import '../styles/App.css';
import Body from './Body.jsx';
import PersonalCalendar from './PersonalCalendar.jsx';
import { Express } from 'express';



function App() {
  return (
    <Body>
      <h1>Este es mi calendario!</h1>
      <PersonalCalendar/>
    </Body>
  );
}

export default App;
