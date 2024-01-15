import logo from './logo.svg';
import './App.css';
import Body from './components/Body';
import PersonalCalendar from './components/PersonalCalendar';

function App() {
  return (
    <Body>
      <h1>Este es mi calendario!</h1>
      <PersonalCalendar/>
    </Body>
  );
}

export default App;
