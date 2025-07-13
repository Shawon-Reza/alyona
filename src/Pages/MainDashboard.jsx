import React, { useState } from "react";
import AboutMySkin from "../Components/AboutMySkin";
import LoginPageOverLap from '../assets/LoginPageOverLap.png'
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

const user = {
    name: "Anna",
    level: 3,
    streak: 3,
    efficiency: 78,
    profileImage: "https://via.placeholder.com/80",
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

    const compatibleProducts = [
        {
            name: "Alpha Beta Pore Perfecting Cleansing Gel",
            percent: "79%",
            type: "Gel cleanser",
            image: "https://thebioaqua.com/cdn/shop/products/product-image-924759520.jpg?v=1605491158",
        },
        {
            name: "Kakadu C Brightening Daily Cleanser",
            percent: "85%",
            type: "Gel cleanser",
            image: "https://thebioaqua.com/cdn/shop/products/product-image-924759520.jpg?v=1605491158",
        },
    ];

    const badges = [
        "Level 3",
        "3 days streak",
        "My first review",
        "You’ve tried 3 cleansers",
        "My first product",
        "Mask lover",
        "Mask lover",
        "Mask lover",
    ];

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
                    <div style={{ maxWidth: 400, margin: "0 auto", padding: 16, borderRadius: 16, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", background: "linear-gradient(to bottom, #fff, #fef3c7)" }}>
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
                                                width: 32,
                                                height: 32,
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
                                    <span role="img" aria-label="calendar">📅</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Calendar show */}
                    <div className="p-4 rounded-xl bg-white shadow-md  ">
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


                    {/* Improve Routine */}
                    <div className="space-y-10 mt-6">
                        {/* Improve your routine */}
                        <div className="space-y-4">
                            <h1 className="text-xl font-bold">Improve your routine</h1>
                            <div className="flex flex-col sm:flex-row gap-4">
                                {/* Skincare efficiency */}
                                <div className="bg-white rounded-xl border-base-700 p-4 shadow-sm flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-semibold text-purple-600 flex items-center gap-1">
                                                <span>💧</span> Skincare efficiency
                                            </p>
                                            <p className="text-sm mt-1 text-gray-800">
                                                Would you like us to give you more recommendations to improve it?
                                            </p>
                                        </div>
                                        <span className="text-lg text-gray-400">›</span>
                                    </div>
                                </div>

                                {/* Quiz */}
                                <div className="bg-white rounded-xl border-base-700 p-4 shadow-sm flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-semibold text-pink-500 flex items-center gap-1">
                                                <span>🧠</span> Quiz
                                            </p>
                                            <p className="text-sm mt-1 text-gray-800">
                                                Take more quizzes for custom skincare advice
                                            </p>
                                        </div>
                                        <span className="text-lg text-gray-400">›</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* For you */}
                        <div className="space-y-4">
                            <h1 className="text-xl font-bold -mt-5">For you</h1>
                            <div className="flex flex-col sm:flex-row gap-4">
                                {/* Mi Daily Routine */}
                                <div className="bg-white border-2 border-base-200  rounded-xl p-4 shadow-lg flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-semibold text-[#7271E3] flex items-center gap-1">
                                                <span>✨</span> Mi Daily Routine
                                            </p>
                                            <p className="text-sm font-semibold text-gray-800 mt-1">
                                                Did you do your morning routine?
                                            </p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Start now and don’t lose your streak
                                            </p>
                                        </div>
                                        <span className="text-lg text-gray-400">›</span>
                                    </div>

                                    {/* Dotted progress bar */}
                                    <div className="flex gap-5 mt-4">
                                        {[...Array(2)].map((_, i) => (
                                            <div key={i} className="h-1 w-10 rounded-ll bg-violet-500" />
                                        ))}
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="h-1 w-10 rounded-full bg-violet-200" />
                                        ))}
                                    </div>
                                </div>

                                {/* Products */}
                                <div className="bg-white rounded-xl border-base-700 p-4 shadow-sm flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-semibold text-cyan-600 flex items-center gap-1">
                                                <span>📦</span> Products
                                            </p>
                                            <p className="text-sm mt-1 text-gray-800">New Product added</p>
                                            <p className="text-xs text-gray-500">Cleanser Free Oil</p>
                                        </div>
                                        <span className="text-lg text-gray-400">›</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    {/* Product Recommendations */}
                    <div className="mt-6">
                        <h3 className="font-semibold text-gray-800 mb-1">
                            These products are compatible with your skin type
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">Add one to improve your routine</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {compatibleProducts.map((prod, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-start justify-between"
                                >
                                    <div className="flex items-start gap-4">
                                        <img
                                            src={prod.image}
                                            alt={prod.name}
                                            className="w-12 h-20 object-contain rounded-md"
                                        />
                                        <div>
                                            <p className="font-semibold text-sm text-gray-800">{prod.name}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="text-[10px] font-medium bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full">
                                                    {prod.percent}
                                                </span>
                                                <p className="text-xs text-gray-500">{prod.type}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-5 h-5 rounded-full border border-amber-300 flex items-center justify-center mt-1">
                                        <span className="text-amber-500 text-xs font-bold">✓</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Badges */}
                    {/* My Badges */}
                    <div className="mt-6">
                        <h2 className="text-base font-semibold text-gray-800 mb-3">My Badges</h2>
                        <div className="flex overflow-x-auto space-x-3 pb-2">
                            {[
                                { label: "Level 3", icon: "🧠", color: "text-gray-900", bg: "bg-white" },
                                { label: "3 days streak", icon: "🔥", color: "text-violet-600", bg: "bg-white" },
                                { label: "My first review", icon: "🏅", color: "text-teal-600", bg: "bg-white" },
                                { label: "You’ve tried 3 cleansers", icon: "🧴", color: "text-amber-700", bg: "bg-white" },
                                { label: "My first product", icon: "🏠", color: "text-violet-600", bg: "bg-white" },
                                ...Array(3).fill({ label: "Mask lover", icon: "💖", color: "text-amber-400", bg: "bg-[#fcf9f6]" }),
                            ].map((badge, i) => (
                                <div
                                    key={i}
                                    className={`min-w-[120px] flex flex-col items-center justify-center p-3 rounded-xl border-base-300 bg-white shadow-sm ${badge.bg}`}
                                >
                                    <div className={`text-2xl mb-1 ${badge.color}`}>{badge.icon}</div>
                                    <div className="text-xs font-medium text-center text-gray-800">{badge.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
