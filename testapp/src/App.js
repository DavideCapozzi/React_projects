import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Button from './components/Button/Button';
import CalendarView from './components/CalendarView/CalendarView';
import useStorage from './hooks/useStorage';
import getLocalDateString from './utils/getLocalDateString';
import { useEffect, useState } from 'react';

function App() {
  const [clickHistory, setClickHistory] = useStorage('buttonClickHistory', {});
  const [activeButtons, setActiveButtons] = useState({});

  // Effetto per inizializzare gli stati dei bottoni basati sullo storage
  useEffect(() => {
    const today = getLocalDateString();
    const todayButtons = clickHistory[today] || [];
    
    // Crea un oggetto con lo stato di ogni bottone per oggi
    const initialActiveState = {
      btn1: todayButtons.includes('btn1'),
      btn2: todayButtons.includes('btn2'),
      btn3: todayButtons.includes('btn3')
    };
    
    setActiveButtons(initialActiveState);
  }, [clickHistory]);

  const handleButtonClick = (buttonId) => {
    const today = getLocalDateString();
    
    // Aggiorna lo stato attivo del bottone
    setActiveButtons(prev => ({
      ...prev,
      [buttonId]: !prev[buttonId]
    }));
    
    setClickHistory(prev => {
      const currentDateData = prev[today] || [];
      
      let newDateData;
      if (currentDateData.includes(buttonId)) {
        newDateData = currentDateData.filter(id => id !== buttonId);
      } else {
        newDateData = [...currentDateData, buttonId];
      }

      return {
        ...prev,
        [today]: newDateData
      };
    });
  };

  const clearHistory = () => {
    if (window.confirm('Sei sicuro di voler cancellare tutta la cronologia?')) {
      setClickHistory({});
      // Resetta anche gli stati attivi dei bottoni
      setActiveButtons({
        btn1: false,
        btn2: false,
        btn3: false
      });
    }
  };

  return (
    <div className="App">
        <Navbar />
        <header>
          {Object.keys(clickHistory).length > 0 && (
          <div className="calendar-section">
            <CalendarView events={clickHistory} />
            <br/>
            <button className="clear-btn" onClick={clearHistory}>
              Cancella Cronologia
            </button>
          </div>
        )}
        </header>
        
        <Button onButtonClick={handleButtonClick} activeButtons={activeButtons} />
        
        
        <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
}

export default App;