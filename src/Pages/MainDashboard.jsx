import React, { useEffect, useState } from "react";
import AboutMySkin from "../Components/AboutMySkin";
import MyBadges from "../Components/MyBadges";
import ProductRecommendations from "../Components/ProductRecommendations";
import PersonalizedSuggestions from "../Components/PersonalizedSuggestions";
import AuthNav from "../Components/AuthNav";
import LoginPageOverLap from '../assets/LoginPageOverLap.png';
import img from '../assets/annaImg.png';
import { IoIosSearch } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { format, startOfMonth, getDay, addDays, getDaysInMonth, addMonths } from 'date-fns';
import Navbar from "../Components/Navbar";
import RecomendationsForUser from "../Components/RecomendationsForUser";
import ProfileImageUploader from "../Components/ProfileImageUploader";
import { hasTakenQuizToday } from "@/lib/utils";
import DailyQuizPopup from "@/Components/DailyQuizPopup";
import { useQuery } from "@tanstack/react-query";
import axiosApi from "@/api/axiosApi";

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

    const [showQuiz, setShowQuiz] = useState(false);

    const [CalendarPopUp, setCalendarPopup] = useState(false);



    const today = new Date();
    const [displayedMonth, setDisplayedMonth] = useState(new Date());

    const monthStart = startOfMonth(displayedMonth);
    const daysInMonth = getDaysInMonth(monthStart);
    const startOffset = (getDay(monthStart) + 6) % 7;

    const [selectedDate, setSelectedDate] = useState(format(today, 'yyyy-MM-dd'));
    const [completedDates, setCompletedDates] = useState([]);

    const days = getLast7Days();


    useEffect(() => {
        if (!hasTakenQuizToday()) {
            setShowQuiz(true);
        }
    }, []);

    


    // Use React Query + axios to fetch dashboard data from the backend
    const { data: dashboardData, isLoading: dashboardLoading, error: dashboardError } = useQuery({
        queryKey: ["dashboard"],
        queryFn: () => axiosApi.get("/accounts/api/v1/dashboard").then((res) => res.data),
        staleTime: 1000 * 60, // 1 minute
    });

    // When dashboard data arrives, derive completed / mention dates for the calendar
    useEffect(() => {
        if (!dashboardData) return

        const parsed = new Set()

        const toIso = (s) => {
            if (!s) return null
            // If already in yyyy-MM-dd
            if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s
            // If format dd-MM-yyyy or d-M-yyyy
            if (/^\d{1,2}-\d{1,2}-\d{4}$/.test(s)) {
                const [d, m, y] = s.split('-')
                const dd = String(d).padStart(2, '0')
                const mm = String(m).padStart(2, '0')
                return `${y}-${mm}-${dd}`
            }
            // Try Date parse
            const dt = new Date(s)
            if (!isNaN(dt.getTime())) {
                return format(dt, 'yyyy-MM-dd')
            }
            return null
        }

        // 1) direct completedDates field from backend
        if (Array.isArray(dashboardData.completedDates) && dashboardData.completedDates.length) {
            dashboardData.completedDates.forEach(d => {
                const iso = toIso(d)
                if (iso) parsed.add(iso)
            })
        }

        // 2) trackers => days
        if (Array.isArray(dashboardData.trackers)) {
            dashboardData.trackers.forEach(tr => {
                const days = Array.isArray(tr.days) ? tr.days : []
                days.forEach(d => {
                    const iso = toIso(d)
                    if (iso) parsed.add(iso)
                })
            })
        }

        // 3) any other known keys (compatibility with varied backends)
        if (Array.isArray(dashboardData.mentioned_dates)) {
            dashboardData.mentioned_dates.forEach(d => {
                const iso = toIso(d)
                if (iso) parsed.add(iso)
            })
        }

        setCompletedDates(Array.from(parsed).sort())
    }, [dashboardData])

    console.log(dashboardData)

    return (
        <div className="relative p-6 bg-gray-50 min-h-screen text-gray-800 font-sans">

            <div className='absolute bottom-0 right-0'>
                <img src={LoginPageOverLap} alt="OverlapIMG" />
            </div>
            <div className="mb-5 md:mb-10">
                <Navbar></Navbar>
            </div>
            {showQuiz && <DailyQuizPopup onClose={() => setShowQuiz(false)} />}

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* Left Column */}
                <div className="lg:col-span-1 space-y-6">
                    {/* User Card */}
                    <div className="mx-auto p-4 rounded-2xl shadow-md bg-gradient-to-b from-[#FAFAFA] to-[#EDDBCB]">
                        <div className="flex flex-col items-center">
                            {/* <img
                                src={user.profileImage}
                                alt="Profile"
                                className="w-20 h-20 rounded-full object-cover mb-4"
                            /> */}
                            <ProfileImageUploader></ProfileImageUploader>
                            <h2 className="text-lg font-semibold mb-2">Hello {user?.user}!</h2>

                            <div className="flex gap-3 items-center mb-3">
                                <div className="px-3 py-1 text-sm border border-gray-300 rounded-full">Level {dashboardData?.user_level?.current_level}</div>
                                <div className="px-3 py-1 text-sm border border-gray-300 rounded-full flex items-center gap-2">
                                    <span role="img" aria-label="flame">🔥</span>
                                    {dashboardData?.user_level?.streak} days streak
                                </div>
                            </div>

                            <div className="text-sm text-gray-500 mb-4">
                                Your skincare is {dashboardData?.about_my_skin?.avg_efficiency}% efficient
                            </div>

                            {/* Efficiency bar */}
                            <div className="w-full h-2 bg-white rounded-full overflow-hidden mb-4">
                                <div
                                    className="h-full bg-[#1e1b4b]"
                                    style={{ width: `${user.efficiency}%` }}
                                ></div>
                            </div>

                            <div className="flex justify-between items-center w-full gap-2">
                                {days.map((date, index) => {
                                    const isToday = isSameDay(date, today);
                                    const isSelected = user.selectedDates.some(d => isSameDay(d, date));
                                    return (
                                        <div
                                            key={index}
                                            className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-semibold
                                            ${isSelected ? 'bg-[#a16207] text-white' : isToday ? 'bg-white border-2 border-[#a16207]' : 'bg-white/50 text-gray-600 border-[#a16207] border-2'}`}
                                        >
                                            {date.getDate()}
                                        </div>
                                    );
                                })}
                                <div
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[#a16207] text-white"

                                    onClick={() => setCalendarPopup(!CalendarPopUp)}
                                    role="img" aria-label="calendar"
                                >
                                    📅
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Calendar Popup */}
                    <div className={`p-4 rounded-xl bg-white shadow-md ${CalendarPopUp ? 'block' : 'hidden'}`}>
                        <div className="text-center mb-3">
                            <div className="flex items-center justify-between">
                                <button
                                    aria-label="Previous month"
                                    onClick={() => setDisplayedMonth((d) => addMonths(d, -1))}
                                    className="px-2 py-1 rounded hover:bg-gray-100"
                                >
                                    ‹
                                </button>

                                <h2 className="text-lg font-semibold text-[#5B5B5B]">
                                    {format(monthStart, 'MMMM yyyy')}
                                </h2>

                                <button
                                    aria-label="Next month"
                                    onClick={() => setDisplayedMonth((d) => addMonths(d, 1))}
                                    className="px-2 py-1 rounded hover:bg-gray-100"
                                >
                                    ›
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-7 gap-1 text-sm text-center mb-2 text-[#5B5B5B]">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                <div key={day}>{day}</div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 gap-1 text-sm text-center">
                            {Array.from({ length: startOffset }).map((_, i) => (
                                <div key={`blank-${i}`} />
                            ))}

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
                    {/* <div className="bg-[#07004D] rounded-2xl px-6 py-3 flex items-center justify-between shadow-md my-8">
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
                    </div> */}

                    {/* Recommendations */}
                    {/* <RecomendationsForUser data={dashboardData?.extra_quiz_result}  /> */}
                    <RecomendationsForUser data={dashboardData?.quick_tips}  />

                </div>

                {/* Right Column */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="md:flex gap-5">
                        <div className="md:w-1/2 w-full">
                            <AboutMySkin data={dashboardData?.about_my_skin} />
                        </div>

                        <div className="md:w-1/2 w-full bg-[#fff6f6] p-4 rounded-2xl shadow-sm hover:scale-101 transform transition-transform duration-700 ease-in-out">
                            <h3 className="text-2xl font-semibold">Your skincare proficiency level</h3>
                            <p className="text-xl font-medium mt-1"> {dashboardData?.user_level?.current_level}</p>
                            <div className=" w-full h-5 bg-gray-200 rounded-full mt-5 relative overflow-hidden">
                                <div className="h-5 bg-pink-400 rounded-full w-[70%]"></div>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">{dashboardData?.user_level?.points_to_reach_next_level} points to reach next level</p>
                        </div>
                    </div>

                    <PersonalizedSuggestions data={[dashboardData?.new_product, dashboardData?.weekly_streak]} onShowQuiz={() => setShowQuiz(true)} />
                    <ProductRecommendations data={dashboardData?.top_recommended_products} />
                    <MyBadges data={dashboardData?.user_badges} />
                </div>
            </div>
        </div>
    );
}
