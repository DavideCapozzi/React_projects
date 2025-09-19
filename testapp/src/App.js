import logo from './logo.svg';
import './App.css';
import Navbar from './navbar';
import Button from './button';
import CalendarHistory from './components/CalendarHistory';
import CalendarView from './components/CalendarView';
import useStorage from './hooks/useStorage';

function App() {
  const [clickHistory, setClickHistory] = useStorage('buttonClickHistory', {});

  const handleButtonClick = (buttonId) => {
    const today = new Date();
    const dateOnly = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    
    setClickHistory(prev => {
      const currentDateData = prev[dateOnly] || [];
      
      // Toggle: se il bottone è già presente, lo rimuovi, altrimenti lo aggiungi
      let newDateData;
      if (currentDateData.includes(buttonId)) {
        newDateData = currentDateData.filter(id => id !== buttonId);
      } else {
        newDateData = [...currentDateData, buttonId];
      }

      return {
        ...prev,
        [dateOnly]: newDateData
      };
    });
  };

  const clearHistory = () => {
    if (window.confirm('Sei sicuro di voler cancellare tutta la cronologia?')) {
      setClickHistory({});
    }
  };

  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      
      <Button onButtonClick={handleButtonClick} />
      
      {Object.keys(clickHistory).length > 0 && (
        <div className="calendar-section">
          <button className="clear-btn" onClick={clearHistory}>
            Cancella Cronologia
          </button>
          
          <CalendarHistory events={clickHistory} />
          <CalendarView events={clickHistory} />
        </div>
      )}
    </div>
  );
}

export default App;