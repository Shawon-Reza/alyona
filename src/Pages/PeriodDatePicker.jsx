import React, { useState } from 'react';
import { format } from 'date-fns';
import LoginPageOverLap from '../assets/LoginPageOverLap.png';
import AuthNav from '../Components/AuthNav';
import { useNavigate } from 'react-router-dom';
import RowButton from '../Components/RowButton';
import AuthenticationNav from '../Components/AuthenticationNav';
import { ChevronRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setField } from '@/store/formSlice';
import { useMutation } from '@tanstack/react-query';
import axiosApi from '../api/axiosApi';
import { baseUrl } from '../config/config';
import { toast } from 'react-toastify';

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

    // Helper function to check if a date is between two selected dates
    const isDateInRange = (currentDate) => {
        const allSelectedDates = Object.values(selectedDates);

        if (allSelectedDates.length !== 2) return false;

        const date1 = new Date(allSelectedDates[0]);
        const date2 = new Date(allSelectedDates[1]);
        const current = new Date(currentDate);

        const startDate = date1 < date2 ? date1 : date2;
        const endDate = date1 < date2 ? date2 : date1;

        return current >= startDate && current <= endDate;
    };

    // Helper function to check if a date is selected (start or end point)
    const isDateSelected = (monthIndex, date) => {
        const selectedDate = selectedDates[`month-${monthIndex}`];
        return selectedDate === date;
    };

    const renderCalendar = (monthIndex) => {
        const { name, year, month, days, offset } = months[monthIndex];
        const dates = [];

        for (let i = 0; i < offset; i++) dates.push(null);
        for (let day = 1; day <= days; day++) dates.push(day);
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

                            const isSelected = day && isDateSelected(monthIndex, fullDate);
                            const isInRange = day && isDateInRange(fullDate);

                            return (
                                <button
                                    key={idx}
                                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all text-sm font-medium
                                        ${day && isSelected
                                            ? 'bg-[#090642] text-white'
                                            : day && isInRange
                                                ? 'bg-[#BB9777] text-white'
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
    const navigate = useNavigate();

    const data = useSelector((state) => state.form)
    console.log(selectedDates)
    const dispatch = useDispatch()
    
    // Mutation: submit last/next period
    const periodMutation = useMutation({
        mutationFn: async (body) => {
            const response = await axiosApi.post(`${baseUrl}accounts/api/v1/quiz`, body);
            return response.data;
        },
        onSuccess: () => {
            navigate('/StartQuizPage');
        },
        onError: (error) => {
            console.error('Error submitting period data:', error);
            toast.error('Failed to submit period data. Please try again.');
        }
    });

    const handleSave = () => {
        // Derive last & next period
        const selected = Object.values(selectedDates);
        let last_period = selectedDates['month-1'] || null;
        let next_period = selectedDates['month-2'] || null;

        if (selected.length === 2 && (!last_period || !next_period)) {
            // Fallback: sort chronologically if user picked two dates without specific months
            const a = new Date(selected[0]);
            const b = new Date(selected[1]);
            if (a <= b) {
                last_period = selected[0];
                next_period = selected[1];
            } else {
                last_period = selected[1];
                next_period = selected[0];
            }
        }

        if (!last_period || !next_period) {
            toast.error('Please select two dates to continue.');
            return;
        }

        // Persist to Redux (both granular and explicit fields)
        Object.entries(selectedDates).forEach(([field, value]) => {
            dispatch(setField({ field, value }));
        });
        dispatch(setField({ field: 'last_period', value: last_period }));
        dispatch(setField({ field: 'next_period', value: next_period }));

        // Submit to API
        console.log(last_period,next_period)
        periodMutation.mutate({ last_period, next_period });
    }
    // console.log(data)

    return (
        <div className='min-h-screen p-4 sm:p-6 md:p-8 border-gray-200 bg-white relative flex items-center justify-center'>
            <div>
                {/* <AuthenticationNav></AuthenticationNav> */}
            </div>
            <div className="absolute bottom-0 right-0">
                <img src={LoginPageOverLap || "/placeholder.svg"} alt="OverlapIMG" />
            </div>
            <div className="">
                <div className="my-10">
                    <div className="w-full bg-[#e5e5e5] h-1 rounded">
                        <div className="w-[60%] bg-[#b88b58] h-1 rounded transition-all duration-500"></div>
                    </div>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">
                    Between which dates do you expect your next period
                </h1>
                <p className="text-lg text-center text-gray-600 mb-6">
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
                <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
                    <div className=''></div>
                    <div className='w-full'></div>
                    <button
                        onClick={() => {
                            navigate('/StartQuizPage');
                        }}
                        className="lg:col-span-1 cursor-pointer text-sm text-gray-500 underline w-full">
                        Skip this question
                    </button>
                    <button
                        onClick={() => {
                            navigate('/StartQuizPage');
                        }}
                        className="w-full px-15 lg:col-span-1 xl:px-20 text-sm bg-[#BB9777] text-white py-3 rounded-md cursor-pointer">
                        I don't remember
                    </button>
                    <button
                        onClick={handleSave}
                        className="z-1 w-full cursor-pointer px-5 lg:col-span-1 xl:px-20 text-sm text-white py-3 rounded-md flex items-center justify-between gap-2 bg-[#0b0540] font-semibold hover:bg-[#1c1664] transition duration-200"
                    >
                        Continue
                        <ChevronRight size={15} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PeriodDatePicker;