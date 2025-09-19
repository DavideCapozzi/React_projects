import React from 'react';

const CalendarView = ({ events }) => {
  // events è un oggetto: { [date]: [buttonIds] }
  // Ottieni l'anno e mese corrente
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  
  // Trova il primo giorno del mese
  const firstDay = new Date(year, month, 1);
  // Trova l'ultimo giorno del mese
  const lastDay = new Date(year, month + 1, 0);
  
  // Crea array di giorni del mese
  const daysInMonth = [];
  for (let i = 1; i <= lastDay.getDate(); i++) {
    daysInMonth.push(new Date(year, month, i));
  }
  
  // Prepara i giorni vuoti all'inizio
  const startingEmptyDays = firstDay.getDay();
  
  return (
    <div className="calendar-view">
      <h2>Visualizzazione Calendario</h2>
      <div className="calendar">
        <div className="calendar-header">
          <h3>{firstDay.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })}</h3>
        </div>
        <div className="weekdays">
          {['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'].map(day => (
            <div key={day} className="weekday">{day}</div>
          ))}
        </div>
        <div className="days">
          {/* Giorni vuoti all'inizio */}
          {Array.from({ length: startingEmptyDays }).map((_, index) => (
            <div key={`empty-${index}`} className="day empty"></div>
          ))}
          
          {/* Giorni del mese */}
          {daysInMonth.map(day => {
            const dateStr = day.toISOString().split('T')[0];
            const buttonsClicked = events[dateStr] || [];
            
            return (
              <div key={dateStr} className="day">
                <span>{day.getDate()}</span>
                {buttonsClicked.length > 0 && (
                  <div className="button-indicators">
                    {buttonsClicked.map(btnId => (
                      <span key={btnId} className={`button-marker ${btnId}`}>
                        {btnId.replace('btn', '')}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;