import React, { useState } from 'react';
import getLocalDateString from '../../utils/getLocalDateString';
import './CalendarView.css';

const CalendarView = ({ events }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Funzioni per navigazione mesi
  const goToPreviousMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // Calcola i giorni del mese basandoci su currentDate
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  const daysInMonth = [];
  for (let i = 1; i <= lastDay.getDate(); i++) {
    daysInMonth.push(new Date(year, month, i));
  }
  
  const startingEmptyDays = firstDay.getDay();
  
  // Ottieni la data di oggi in formato stringa per il confronto
  const todayString = getLocalDateString();

  return (
    <div className="calendar-view">
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={goToPreviousMonth} className="month-nav-button prev">
          </button>
          
          <h3 className="capitalize-text">
            {firstDay.toLocaleDateString('it-IT', { 
              month: 'long', 
              year: 'numeric' 
            })}
          </h3>
          
          <button onClick={goToNextMonth} className="month-nav-button next">
          </button>
        </div>

        <div className="weekdays">
          {['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'].map(day => (
            <div key={day} className="weekday">{day}</div>
          ))}
        </div>

        <div className="days">
          {Array.from({ length: startingEmptyDays }).map((_, index) => (
            <div key={`empty-${index}`} className="day empty"></div>
          ))}
          
          {daysInMonth.map(day => {
            const dateStr = getLocalDateString(day);
            const buttonsClicked = events[dateStr] || [];
            const isToday = dateStr === todayString;
            
            return (
              <div key={dateStr} className={`day ${isToday ? 'current-day' : ''}`}>
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