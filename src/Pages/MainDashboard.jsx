import React, { useState } from "react";
import AboutMySkin from "../Components/AboutMySkin";
import LoginPageOverLap from '../assets/LoginPageOverLap.png'
import img from '../assets/annaImg.png'
import AuthNav from "../Components/AuthNav";
import { IoIosSearch } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import {
    format,
    startOfMonth,
    getDay,
    addDays,
    getDaysInMonth,

} from 'date-fns';
import MyBadges from "../Components/MyBadges";
import ProductRecommendations from "../Components/ProductRecommendations";
import PersonalizedSuggestions from "../Components/PersonalizedSuggestions";


const user = {
    name: "Anna",
    level: 3,
    streak: 3,
    efficiency: 78,
    profileImage: img,
    selectedDates: [
        new Date("2025-07-19"),
        new Date("2025-07-20"),
        new Date("2025-07-21"),
        new Date("2025-07-22"),
        new Date("2025-07-23")
    ]
};

const isSameDay = (date1, date2) => {
    return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
    );
};

const getLast7Days = () => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(today.getDate() - (6 - i));
        return date;
    });
};

export default function MainDashboard() {

    const [CalendarPopUp, setCalendarPopup] = useState(false);

    // Calculate the start of the month and the number of days in the month
    // to display the calendar correctly
    const today = new Date();
    const monthStart = startOfMonth(today);
    const daysInMonth = getDaysInMonth(monthStart);
    const startOffset = (getDay(monthStart) + 6) % 7;

    const [selectedDate, setSelectedDate] = useState(format(today, 'yyyy-MM-dd'));
    const [completedDates, setCompletedDates] = useState([
        '2025-07-10',
        '2025-07-11',
        '2025-07-12',
        '2025-07-13',
    ]);

    const days = getLast7Days();

    return (
        <div className="relative p-6 bg-gray-50 min-h-screen text-gray-800 font-sans">

            <div className='absolute bottom-0 right-0'>
                <img src={LoginPageOverLap} alt="OverlapIMG" />
            </div>
            <div className="mb-20">
                <AuthNav></AuthNav>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* First Part */}
                {/* Left Column */}
                <div className="lg:col-span-1 space-y-6">
                    {/* User Card */}
                    <div
                        className=" mx-auto p-4 rounded-2xl shadow-md bg-gradient-to-b from-[#FAFAFA] to-[#EDDBCB]"

                    >
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <img
                                src={user.profileImage}
                                alt="Profile"
                                width={80}
                                height={80}
                                style={{ borderRadius: "50%", objectFit: "cover", marginBottom: 16 }}
                            />
                            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Hello {user.name}!</h2>

                            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
                                <div style={{ padding: "4px 8px", border: "1px solid #ccc", borderRadius: 999, fontSize: 14 }}>Level {user.level}</div>
                                <div style={{ padding: "4px 8px", border: "1px solid #ccc", borderRadius: 999, fontSize: 14, display: "flex", alignItems: "center", gap: 4 }}>
                                    <span role="img" aria-label="flame">🔥</span>
                                    {user.streak} days streak
                                </div>
                            </div>

                            <div style={{ fontSize: 14, color: "#555", marginBottom: 4 }}>
                                Your skincare is {user.efficiency}% efficient
                            </div>
                            <div style={{ width: "100%", height: 12, background: "#fff", borderRadius: 8, overflow: "hidden", marginBottom: 16 }}>
                                <div
                                    style={{ width: `${user.efficiency}%`, height: "100%", background: "#1e1b4b" }}
                                ></div>
                            </div>

                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", gap: 4 }}>
                                {days.map((date, index) => {
                                    const isToday = isSameDay(date, today);
                                    const isSelected = user.selectedDates.some(d => isSameDay(d, date));
                                    return (
                                        <div
                                            key={index}
                                            style={{
                                                width: 40,
                                                height: 40,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderRadius: "50%",
                                                fontSize: 14,
                                                fontWeight: 500,
                                                backgroundColor: isSelected ? "#a16207" : isToday ? "#fff" : "#fef3c7",
                                                border: isToday ? "2px solid #a16207" : "1px solid #e5e7eb",
                                                color: isSelected ? "#fff" : isToday ? "#a16207" : "#555"
                                            }}
                                        >
                                            {date.getDate()}
                                        </div>
                                    );
                                })}
                                <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", backgroundColor: "#a16207", color: "#fff" }}>

                                    <span
                                        role="img"
                                        aria-label="calendar"

                                        onClick={() => setCalendarPopup(!CalendarPopUp)}
                                        className="cursor-pointer"
                                    >
                                        📅

                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Calendar show */}
                    <div className={` p-4 rounded-xl bg-white shadow-md ${CalendarPopUp ? 'block' : 'hidden'}`}>
                        {/* Header */}
                        <div className="text-center mb-3">
                            <h2 className="text-lg font-semibold text-[#5B5B5B]">
                                {format(today, 'MMMM yyyy')}
                            </h2>
                        </div>

                        {/* Weekday Labels */}
                        <div className="grid grid-cols-7 gap-1 text-sm text-center mb-2 text-[#5B5B5B]">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                <div key={day}>{day}</div>
                            ))}
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-1 text-sm text-center">
                            {/* Empty slots before month starts */}
                            {Array.from({ length: startOffset }).map((_, i) => (
                                <div key={`blank-${i}`} />
                            ))}

                            {/* Days in month */}
                            {Array.from({ length: daysInMonth }).map((_, i) => {
                                const dateObj = addDays(monthStart, i);
                                const formatted = format(dateObj, 'yyyy-MM-dd');
                                const isCompleted = completedDates.includes(formatted);
                                const isSelected = selectedDate === formatted;

                                return (
                                    <button
                                        key={formatted}
                                        onClick={() => setSelectedDate(formatted)}
                                        className={`w-8 h-8 flex items-center justify-center rounded-full
              ${isCompleted ? 'bg-[#B59176] text-white' : 'text-[#5B5B5B]'}
              ${isSelected ? 'border-2 border-[#07004D]' : ''}
            `}
                                    >
                                        {format(dateObj, 'd')}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Product Finder */}
                    <div className="bg-[#07004D] rounded-2xl px-6 py-3 flex items-center justify-between shadow-md my-8">
                        <div>
                            <p className="text-white font-semibold text-base flex items-center gap-2">
                                <span className="text-xl">🧬</span> Find a product
                            </p>
                            <p className="text-sm text-white/70 mt-1">Or add it to the waiting list</p>
                        </div>

                        <div className="flex gap-2 ml-4">
                            <button className="bg-white/30 rounded-lg w-10 h-10 flex items-center justify-center text-white font-semibold text-lg">
                                <FaPlus />
                            </button>
                            <button className="bg-white/30 rounded-lg w-10 h-10 flex items-center justify-center text-white text-xl">
                                <IoIosSearch className="font-extrabold text-2xl" />
                            </button>
                        </div>
                    </div>


                    {/* Recommendations */}
                    <div className="bg-white rounded-xl shadow-md p-5">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <span className="text-indigo-700 text-xl">📄</span>
                                <p className="font-bold text-xl ">Recomendaciones</p>
                            </div>
                            <span className="text-indigo-700 text-xl">▾</span>
                        </div>

                        <div className="text-sm text-[#5B5B5B] space-y-4">
                            {/* Weekly Care Tips */}
                            <div>
                                <p className="font-semibold">Weekly Care Tips:</p>
                                <ul className="list-disc list-inside text-[#5B5B5B]">
                                    <li>Gentle exfoliation (1–2 times per week)</li>
                                    <li>Hydrating mask (once per week)</li>
                                </ul>
                            </div>

                            {/* Key Focus Areas */}
                            <div>
                                <p className="font-semibold">Key Focus Areas:</p>
                                <ul className="list-disc list-inside text-[#5B5B5B]">
                                    <li>Maintain skin's natural balance</li>
                                    <li>Prevent early signs of aging</li>
                                    <li>Protection from environmental damage</li>
                                    <li>Keep skin hydrated</li>
                                </ul>
                            </div>

                            {/* Final note */}
                            <p className="text-[#5B5B5B]">
                                Track your progress using the app's Skin Tracker feature and adjust your routine
                                based on seasonal changes or specific concerns that may arise.
                            </p>
                        </div>
                    </div>


                </div>

                {/* Second Part */}
                {/* Right Column */}
                <div className="lg:col-span-3 space-y-6">


                    <div className="md:flex gap-5">
                        <div className="md:w-1/2 w-full">
                            <AboutMySkin></AboutMySkin>
                        </div>

                        {/* Proficiency Level */}

                        <div className="md:w-1/2 w-full bg-[#fff6f6] p-4 rounded-2xl shadow-sm">
                            <h3 className="text-base font-semibold">Your skincare proficiency level</h3>
                            <p className="text-lg font-medium mt-1">Level 3</p>
                            <div className="w-full h-3 bg-gray-200 rounded-full mt-3 relative overflow-hidden">
                                <div className="h-3 bg-pink-400 rounded-full w-[70%]"></div>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">10 points to reach next level</p>
                        </div>
                    </div>



                    <PersonalizedSuggestions></PersonalizedSuggestions>
                    <ProductRecommendations></ProductRecommendations>
                    {/* My Badges */}
                    <MyBadges></MyBadges>


                </div>
            </div>
        </div>
    );
}
