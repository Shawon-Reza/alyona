import React, { useState } from 'react';
import { format } from 'date-fns';
import LoginPageOverLap from '../assets/LoginPageOverLap.png';
import AuthNav from '../Components/AuthNav';
import { useNavigate } from 'react-router-dom';
import RowButton from '../Components/RowButton';

const getMonthData = (baseDate) => {
    const prevMonth = new Date(baseDate.getFullYear(), baseDate.getMonth() - 1);
    const currentMonth = new Date(baseDate.getFullYear(), baseDate.getMonth());
    const nextMonth = new Date(baseDate.getFullYear(), baseDate.getMonth() + 1);

    const months = [prevMonth, currentMonth, nextMonth];

    return months.map((date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const name = date.toLocaleString('default', { month: 'long' });
        const days = new Date(year, month + 1, 0).getDate();
        const offset = new Date(year, month, 1).getDay();
        const adjustedOffset = offset === 0 ? 6 : offset - 1; // Adjust to make Monday the first day
        return { name, year, month, days, offset: adjustedOffset };
    });
};

const PeriodDatePicker = () => {
    const today = new Date();
    const months = getMonthData(today);
    const [selectedDates, setSelectedDates] = useState({});

    const toggleDate = (monthIndex, date) => {
        setSelectedDates((prev) => {
            const newSelected = { ...prev };
            const key = `month-${monthIndex}`;

            if (newSelected[key] === date) {
                delete newSelected[key];
            } else {
                newSelected[key] = date;
            }

            return Object.keys(newSelected).length <= 2 ? newSelected : prev;
        });
    };

    const renderCalendar = (monthIndex) => {
        const { name, year, month, days, offset } = months[monthIndex];
        const dates = [];
        for (let i = 0; i < offset; i++) dates.push(null);
        for (let day = 1; day <= days; day++) dates.push(day);

        const selectedDate = selectedDates[`month-${monthIndex}`];

        return (
            <div className="flex flex-col items-center z-10 hover:rounded-2xl hover:bg-blue-50">
                <h2 className="text-lg font-semibold my-3">{name}</h2>
                <div className="px-4 md:px-6 pt-2 pb-4 h-auto">
                    <div className="grid grid-cols-7 gap-1 md:gap-2 text-center text-sm">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                            <div key={d} className="font-medium text-gray-700">{d}</div>
                        ))}
                        {dates.map((day, idx) => {
                            const fullDate = day
                                ? format(new Date(year, month, day), 'yyyy-MM-dd')
                                : null;
                            return (
                                <button
                                    key={idx}
                                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all text-sm font-medium 
                    ${day && selectedDate === fullDate
                                            ? 'bg-blue-900 text-white'
                                            : 'text-gray-700 hover:bg-gray-200'}`}
                                    onClick={() => day && toggleDate(monthIndex, fullDate)}
                                >
                                    {day || ''}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };

    const allSelectedDates = Object.values(selectedDates);

    const navigate = useNavigate()

    return (
        <div className="h-screen p-4 sm:p-6 md:p-8 border-gray-200 bg-white relative">
            <div className="absolute bottom-0 right-0">
                <img src={LoginPageOverLap} alt="OverlapIMG" />
            </div>

            <AuthNav />

            <div className="mt-28 w-full mb-20">
                <div className="w-full bg-[#e5e5e5] h-1 rounded">
                    <div className="w-[60%] bg-[#b88b58] h-1 rounded transition-all duration-500"></div>
                </div>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-center mb-2">
                Between which dates do you expect your next period
            </h1>
            <p className="text-sm text-center text-gray-600 mb-6">
                Track period to assess hormonal fluctuation that might affect skin condition and sensitivity
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {renderCalendar(0)}
                {renderCalendar(1)}
                {renderCalendar(2)}
            </div>

            {allSelectedDates.length > 0 && (
                <div className="mt-4 text-center text-sm text-gray-700">
                    <p>
                        Selected Dates:{" "}
                        {allSelectedDates.map((d, i) => (
                            <span key={i} className="mx-1 px-2 py-1 bg-blue-100 rounded">
                                {d}
                            </span>
                        ))}
                    </p>
                </div>
            )}

            <div className="flex flex-col sm:flex-row  justify-between items-center mt-4 gap-3 ">
                <div className=''></div>

                <div></div>

                <button className="lg:col-span-1 text-sm text-gray-500 underline">Skip this question</button>
                <button className="px-15 lg:col-span-1  xl:px-20 text-sm bg-[#BB9777] text-white py-2 rounded-md">I don’t remember</button>




                {/* <div className=" mx-auto lg:col-span-1" >
                    <RowButton text="Let's get started"

                        onClick={() => {
                            navigate('/SkinAnalysis')
                            console.log("Started!")
                        }} />
                </div> */}
                <button
                    onClick={() => {
                        navigate('/QuizGreetings')
                        console.log("Started!")
                    }}
                    className="z-1 cursor-pointer px-15 lg:col-span-1  xl:px-20 text-sm text-white py-2 rounded-md flex items-center justify-between gap-2 bg-[#0b0540]  font-semibold  hover:bg-[#1c1664] transition duration-200"
                >
                    Continue
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>

            </div>
        </div>
    );
};

export default PeriodDatePicker;
