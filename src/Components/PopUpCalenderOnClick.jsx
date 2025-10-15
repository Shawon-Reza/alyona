import React, { useState } from "react";
import {
  format,
  startOfMonth,
  getDay,
  addDays,
  getDaysInMonth,
  subMonths,
  addMonths,
} from "date-fns";

const tracker_records = [
  { month: "aug", days: ["23-08-2025", "30-08-2025"] },
  {
    month: "sep",
    days: [
      "02-09-2025",
      "05-09-2025",
      "06-09-2025",
      "07-09-2025",
      "08-09-2025",
      "09-09-2025",
      "10-09-2025",
      "12-09-2025",
      "13-09-2025",
      "18-09-2025",
    ],
  },
  { month: "oct", days: ["01-10-2025"] },
];

const parseTrackerDates = (records) => {
  return records.flatMap((entry) =>
    entry.days.map((dateStr) => {
      const [day, month, year] = dateStr.split("-").map(Number);
      return new Date(year, month - 1, day);
    })
  );
};

const isSameDay = (date1, date2) =>
  date1.getDate() === date2.getDate() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getFullYear() === date2.getFullYear();

const getLast7Days = () => {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() - (6 - i));
    return date;
  });
};

export default function PopUpCalendarOnClick({ calenderData=[] }) {
    if (calenderData) {
        console.log("Calendar Data:", calenderData);
    }
  const [calendarPopUp, setCalendarPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [calendarMonth, setCalendarMonth] = useState(new Date());

  const parsedDates = parseTrackerDates(calenderData);
  const [selectedDates, setSelectedDates] = useState(parsedDates);

  const today = new Date();
  const monthStart = startOfMonth(calendarMonth);
  const daysInMonth = getDaysInMonth(monthStart);
  const startOffset = (getDay(monthStart) + 6) % 7;
  const days = getLast7Days();



  const handleDateSelection = (date) => {
    if (!selectedDates.some((d) => isSameDay(d, date))) {
      setSelectedDates([...selectedDates, date]);
    }
  };

  const handlePrevMonth = () => {
    setCalendarMonth((prev) => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCalendarMonth((prev) => addMonths(prev, 1));
  };

  return (
    <div>
      {/* 🔹 Mini Tracker Bar */}
      <div className="flex justify-between items-center w-full gap-2 bg-white/50 p-4 rounded-lg shadow-md">
        {days.map((date, index) => {
          const isToday = isSameDay(date, today);
          const isSelected = selectedDates.some((d) => isSameDay(d, date));

          return (
            <div
              key={index}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-semibold cursor-pointer
                ${
                  isSelected
                    ? "bg-[#BB9777] text-white"
                    : isToday
                    ? "bg-white border-2 border-[#a16207]"
                    : "bg-[#E6E6E6] text-gray-600"
                }`}
              onClick={() => handleDateSelection(date)}
            >
              {date.getDate()}
            </div>
          );
        })}
        <div
          className="w-8 h-8 flex items-center justify-center rounded-full bg-[#a16207] text-white cursor-pointer"
          onClick={() => setCalendarPopup(!calendarPopUp)}
          role="img"
          aria-label="calendar"
        >
          📅
        </div>
      </div>

      {/* 🔹 Full Calendar Popup */}
      <div
        className={`mb-5 mt-3 p-4 rounded-xl bg-white shadow-md transition-all duration-300 ${
          calendarPopUp ? "block" : "hidden"
        }`}
      >
        {/* Header with month + controls */}
        <div className="flex justify-between items-center mb-3">
          <button
            onClick={handlePrevMonth}
            className="text-[#a16207] font-bold px-2 text-xl"
          >
            &lt;
          </button>
          <h2 className="text-lg font-semibold text-[#5B5B5B]">
            {format(calendarMonth, "MMMM yyyy")}
          </h2>
          <button
            onClick={handleNextMonth}
            className="text-[#a16207] font-bold px-2 text-xl"
          >
            &gt;
          </button>
        </div>

        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-1 text-sm text-center mb-2 text-[#5B5B5B]">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1 text-sm text-center">
          {Array.from({ length: startOffset }).map((_, i) => (
            <div key={`blank-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dateObj = addDays(monthStart, i);
            const formatted = format(dateObj, "yyyy-MM-dd");
            const isCompleted = selectedDates.some((d) => isSameDay(d, dateObj));
            const isSelected = selectedDate === formatted;

            return (
              <button
                key={formatted}
                onClick={() => setSelectedDate(formatted)}
                className={`w-8 h-8 flex items-center justify-center rounded-full
                  ${isCompleted ? "bg-[#B59176] text-white" : "text-[#5B5B5B]"}
                  ${isSelected ? "border-2 border-[#07004D]" : ""}
                `}
              >
                {format(dateObj, "d")}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
