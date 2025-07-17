import React, { useState } from "react";
import { format, startOfMonth, getDay, addDays, getDaysInMonth } from 'date-fns';

const user = {
    name: "Anna",
    level: 3,
    streak: 3,
    efficiency: 78,
    profileImage: "/path/to/image.jpg",
    selectedDates: [
        new Date("2025-07-12"),
        new Date("2025-07-20"),
        new Date("2025-07-21"),
        new Date("2025-07-22"),
        new Date("2025-07-23")
    ]
};

// Helper function to check if two dates are the same day
const isSameDay = (date1, date2) => {
    return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
    );
};

// Get the last 7 days from today
const getLast7Days = () => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(today.getDate() - (6 - i));
        return date;
    });
};

export default function PopUpCalendarOnClick() {
    const [calendarPopUp, setCalendarPopup] = useState(false);
    const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [selectedDates, setSelectedDates] = useState(user.selectedDates); // State for selected dates

    const today = new Date();
    const monthStart = startOfMonth(today);
    const daysInMonth = getDaysInMonth(monthStart);
    const startOffset = (getDay(monthStart) + 6) % 7;

    const days = getLast7Days(); // Get last 7 days for display

    const handleDateSelection = (date) => {
        // Add selected date to the list and update the state
        const newSelectedDates = [...selectedDates, date];
        setSelectedDates(newSelectedDates);
    };

    return (
        <div>

            <div className="flex justify-between items-center w-full gap-2 mb-5 bg-white p-4 rounded-lg shadow-md">
                {days.map((date, index) => {
                    const isToday = isSameDay(date, today);
                    const isSelected = selectedDates.some(d => isSameDay(d, date));

                    return (
                        <div
                            key={index}
                            className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-semibold
                                ${isSelected ? 'bg-[#BB9777]' : isToday ? 'bg-white border-2 border-[#a16207]' : 'bg-[#BB9777] text-white' }`}
                            onClick={() => handleDateSelection(date)}
                        >
                            {date.getDate()}
                        </div>
                    );
                })}
                <div
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[#a16207] text-white"
                    onClick={() => setCalendarPopup(!calendarPopUp)}
                    role="img" aria-label="calendar"
                >
                    📅
                </div>
            </div>

            {/* Calendar Popup */}
            <div className={`mb-5 p-4 rounded-xl bg-white shadow-md ${calendarPopUp ? 'block' : 'hidden'}`}>
                <div className="text-center mb-3">
                    <h2 className="text-lg font-semibold text-[#5B5B5B]">
                        {format(today, 'MMMM yyyy')}
                    </h2>
                </div>

                <div className="grid grid-cols-7 gap-1 text-sm text-center mb-2 text-[#5B5B5B]">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                        <div key={day}>{day}</div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-1 text-sm text-center">
                    {/* Empty slots before month starts */}
                    {Array.from({ length: startOffset }).map((_, i) => (
                        <div key={`blank-${i}`} />
                    ))}

                    {/* Days in the month */}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                        const dateObj = addDays(monthStart, i);
                        const formatted = format(dateObj, 'yyyy-MM-dd');
                        const isCompleted = selectedDates.some(d => isSameDay(d, dateObj));
                        const isSelected = selectedDate === formatted;

                        return (
                            <button
                                key={formatted}
                                onClick={() => setSelectedDate(formatted)}
                                className={`w-8 h-8 flex items-center justify-center rounded-full
                                    ${isCompleted ? 'bg-[#B59176] text-white' : 'text-[#5B5B5B]'}
                                    ${isSelected ? 'border-2 border-[#07004D]' : ''}`}
                            >
                                {format(dateObj, 'd')}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
