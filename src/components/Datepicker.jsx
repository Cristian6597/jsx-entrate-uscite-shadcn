import React, { useState } from 'react';
import { CalendarIcon } from 'lucide-react';

const DatePicker = ({ value, onChange }) => {
  const [currentDate, setCurrentDate] = useState(value || new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const currentMonthYear = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const calendarDates = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const dates = [];
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    
    while (dates.length < 42) {
      dates.push(new Date(startDate));
      startDate.setDate(startDate.getDate() + 1);
    }
    
    return dates;
  };

  const formattedDate = value ? value.toLocaleDateString() : '';

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const selectDate = (date) => {
    onChange(date);
    setShowCalendar(false);
  };

  const isCurrentMonth = (date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const isSelected = (date) => {
    return value && date.toDateString() === value.toDateString();
  };

  return (
    <div className="relative w-64">
      <div className="relative">
        <input
          type="text"
          value={formattedDate}
          onFocus={() => setShowCalendar(true)}
          readOnly
          placeholder="Select a date"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>
      {showCalendar && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 mt-1">
          <div className="flex justify-between items-center p-2 bg-gray-100">
            <button onClick={previousMonth} className="p-1 hover:bg-gray-200 rounded">&lt;</button>
            <span>{currentMonthYear}</span>
            <button onClick={nextMonth} className="p-1 hover:bg-gray-200 rounded">&gt;</button>
          </div>
          <div className="grid grid-cols-7 gap-1 p-2">
            {daysOfWeek.map(day => (
              <div key={day} className="text-center font-bold text-xs py-1">{day}</div>
            ))}
            {calendarDates().map((date, index) => (
              <div
                key={index}
                onClick={() => selectDate(date)}
                className={`text-center py-1 cursor-pointer hover:bg-gray-100 ${
                  !isCurrentMonth(date) ? 'text-gray-400' : ''
                } ${isSelected(date) ? 'bg-blue-500 text-white hover:bg-blue-600' : ''}`}
              >
                {date.getDate()}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
