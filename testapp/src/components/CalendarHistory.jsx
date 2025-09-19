import React from 'react';

const CalendarHistory = ({ events }) => {
  // events è un oggetto: { [date]: [buttonIds] }
  // Convertiamo in array di date e ordiniamo per data (discendente)
  const dates = Object.keys(events).sort((a, b) => new Date(b) - new Date(a));

  return (
    <div className="calendar-history">
      <h2>Cronologia per Data</h2>
      {dates.map(date => {
        const buttonIds = events[date];
        return (
          <div key={date} className="date-group">
            <h3>{new Date(date).toLocaleDateString('it-IT')}</h3>
            {buttonIds.length > 0 ? (
              <ul>
                {buttonIds.map(btnId => (
                  <li key={btnId}>
                    Bottone <strong>{btnId}</strong> attivato
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nessun bottone attivato in questa data</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CalendarHistory;