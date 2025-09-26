import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Button from './components/Button/Button';
import CalendarView from './components/CalendarView/CalendarView';
import useStorage from './hooks/useStorage';
import getLocalDateString from './utils/getLocalDateString';
import { storageService } from './services/storageService';
import { useCallback } from 'react';

function App() {
  const [clickHistory, setClickHistory] = useStorage('buttonClickHistory', {});

  // Calcola activeButtons per oggi basandosi direttamente sul clickHistory
  const getTodayActiveButtons = useCallback(() => {
    const today = getLocalDateString();
    const todayClicks = clickHistory[today] || [];
    
    return {
      btn1: todayClicks.includes('btn1'),
      btn2: todayClicks.includes('btn2'),
      btn3: todayClicks.includes('btn3')
    };
  }, [clickHistory]);

  const handleButtonClick = (buttonId) => {
    const today = getLocalDateString();
    
    setClickHistory(prev => {
      const todayClicks = prev[today] || [];
      const updatedClicks = todayClicks.includes(buttonId)
        ? todayClicks.filter(id => id !== buttonId)
        : [...todayClicks, buttonId];

      return {
        ...prev,
        [today]: updatedClicks
      };
    });
  };

  const clearHistory = () => {
    if (window.confirm('Sei sicuro di voler cancellare tutta la cronologia?')) {
      setClickHistory({});
    }
  };

  const handleDownload = () => {
    const result = storageService.exportData();
    if (result) {
      const link = document.createElement('a');
      link.href = result.url;
      link.download = result.filename;
      link.click();
      URL.revokeObjectURL(result.url);
    } else {
      alert('Errore nel download dei dati');
    }
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const success = storageService.importData(e.target.result);
      if (success) {
        window.location.reload(); // Ricarica per applicare i nuovi dati
      } else {
        alert('Errore nel caricamento del file');
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset input
  };

  const activeButtons = getTodayActiveButtons();

  return (
    <div className="App">
      <Navbar />
      <header>
        <div className="controls-section">
            <button onClick={handleDownload} className="backup-btn">
              📥 Download Backup
            </button>
            <label htmlFor="file-upload" className="backup-btn">
              📤 Upload Backup
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".json"
              onChange={handleUpload}
              style={{ display: 'none' }}
            />

          {Object.keys(clickHistory).length > 0 && (
            <button className="clear-btn" onClick={clearHistory}>
              Cancella Cronologia
            </button>
          )}
        </div>

        {Object.keys(clickHistory).length > 0 && (
          <div className="calendar-section">
            <CalendarView events={clickHistory} />
          </div>
        )}
      </header>
      
      <Button onButtonClick={handleButtonClick} activeButtons={activeButtons} />
      
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
}

export default App;