'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DateRangeCalendarProps {
  selectedRange: {
    startDate: Date | null;
    endDate: Date | null;
  };
  onRangeChange: (range: { startDate: Date | null; endDate: Date | null }) => void;
}

export default function DateRangeCalendar({ selectedRange, onRangeChange }: DateRangeCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 6, 1)); // July 2024

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (number | null)[] = [];
    
    // Add empty slots for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const handleDateClick = (day: number, monthOffset: number) => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth() + monthOffset;
    const clickedDate = new Date(year, month, day);

    if (!selectedRange.startDate || (selectedRange.startDate && selectedRange.endDate)) {
      // Start new range
      onRangeChange({ startDate: clickedDate, endDate: null });
    } else {
      // Complete range
      if (clickedDate >= selectedRange.startDate) {
        onRangeChange({ ...selectedRange, endDate: clickedDate });
      } else {
        onRangeChange({ startDate: clickedDate, endDate: selectedRange.startDate });
      }
    }
  };

  const isDateInRange = (day: number, monthOffset: number) => {
    if (!selectedRange.startDate) return false;
    
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth() + monthOffset;
    const date = new Date(year, month, day);
    
    if (selectedRange.endDate) {
      return date >= selectedRange.startDate && date <= selectedRange.endDate;
    } else {
      return date.getTime() === selectedRange.startDate.getTime();
    }
  };

  const isStartOrEndDate = (day: number, monthOffset: number) => {
    if (!selectedRange.startDate) return false;
    
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth() + monthOffset;
    const date = new Date(year, month, day);
    
    return (
      date.getTime() === selectedRange.startDate.getTime() ||
      (selectedRange.endDate && date.getTime() === selectedRange.endDate.getTime())
    );
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const renderMonth = (monthOffset: number) => {
    const month = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset, 1);
    const days = getDaysInMonth(month);
    const monthName = month.toLocaleString('default', { month: 'long', year: 'numeric' });

    return (
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-white text-center mb-4">{monthName}</h3>
        
        {/* Days of week */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="text-center text-gray-500 text-sm font-medium">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            if (day === null) {
              return <div key={index} className="aspect-square" />;
            }

            const inRange = isDateInRange(day, monthOffset);
            const isStartEnd = isStartOrEndDate(day, monthOffset);

            return (
              <button
                key={index}
                onClick={() => handleDateClick(day, monthOffset)}
                className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                  isStartEnd
                    ? 'bg-emerald-500 text-white'
                    : inRange
                    ? 'bg-emerald-500/30 text-white'
                    : 'bg-gray-700/30 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      {/* Navigation */}
      <div className="flex items-center justify-center mb-6 gap-4">
        <button
          onClick={prevMonth}
          className="p-2 text-gray-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextMonth}
          className="p-2 text-gray-400 hover:text-white transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Two Month View */}
      <div className="flex gap-8">
        {renderMonth(0)}
        {renderMonth(1)}
      </div>
    </div>
  );
}