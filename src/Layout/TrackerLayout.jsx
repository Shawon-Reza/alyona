import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import PopUpCalendarOnClick from "../Components/PopUpCalenderOnClick";
import Productimgfordetails from '../assets/Productimgfordetails.png';
import { ChevronRight, Sparkle } from "lucide-react";
import LoginPageOverLap from '../assets/LoginPageOverLap.png';
import TrackerTabs from "../Components/TrackerTabs";
import DayNightTabs from "../Components/TrackerTabComponent/DayNightTabs";
import { PiGreaterThanBold } from "react-icons/pi";
import GoalSettingComponent from "@/Components/TrackerTabComponent/GoalSettingComponent";
import { IoCloseCircleOutline } from "react-icons/io5";
import GoalHistory from "@/Components/TrackerTabComponent/GoalHistory";
import useTrackerSidebar from "@/hooks/useTrackerSidebar";
import axiosApi from "@/api/axiosApi";
import { useQuery } from "@tanstack/react-query";

const TrackerLayout = () => {
    const [isGoalPopupVisible, setIsGoalPopupVisible] = useState(false);
    const [isGoalHistoryPopup, setIsGoalHistoryPopup] = useState(false);

    // Custom hook to get sidebar data.............................
    const { trackerSidebarData } = useTrackerSidebar();
    if (trackerSidebarData) {
        console.log("Tracker Sidebar Data:", trackerSidebarData);
    }


    const openGoalPopup = () => {
        console.log("Set Goal clicked");
        setIsGoalPopupVisible(true);
        setIsGoalHistoryPopup(false);
    };

    const handleGoalHistory = () => {
        console.log("Goal history clicked");
        setIsGoalHistoryPopup(true);
        setIsGoalPopupVisible(false);
    };

    // Data fetching for tracker layout sidebar/Goal tracking
    const { isPending, error, data } = useQuery({
        queryKey: ['goalData'],
        queryFn: async () => {
            const res = await axiosApi.get('/products/api/v1/tracker')
            return res.data
        },
    })
    console.log("sidebar goal data:", data)

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message


    // console.log(trackerSidebarData?.tracker_records)
    return (
        <div className="relative min-h-screen bg-gradient-to-b from-[#FAFAFA] via-[#FFFFFF] to-[#F5EADF]">
            {/* Navbar */}
            <div className="px-4 lg:px-10 pt-6">
                <Navbar />
            </div>

            {/* Overlapping Image */}
            <div className="fixed bottom-8 right-0 z-0 hidden lg:block">
                <img src={LoginPageOverLap} alt="OverlapIMG" className="w-96 opacity-80" />
            </div>

            {/* Main Layout */}
            <div className="flex flex-col-reverse lg:flex-row px-4 lg:px-10 mt-6 lg:mt-10 gap-6 lg:gap-8">

                {/* Sidebar ...tracker page.......................*/}
                <div className="relative w-full lg:w-1/4 min-w-[320px] space-y-6 mb-2 px-1">
                    <PopUpCalendarOnClick calenderData={trackerSidebarData?.tracker_records} />

                    {/* Routine Prompt */}
                    <div className="bg-white/50 border border-base-300 rounded-md p-4 shadow-lg">
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
                            <span className="text-lg text-gray-400 cursor-pointer">&#8250;</span>
                        </div>

                        <div className="flex gap-3 mt-4">
                            {[...Array(2)].map((_, i) => (
                                <div key={i} className="h-1 w-10 rounded-ll bg-violet-500" />
                            ))}
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="h-1 w-10 rounded-full bg-violet-200" />
                            ))}
                        </div>
                    </div>

                    {/* Skin Info & Goal */}
                    <div className="space-y-4">
                        {/* <div className="bg-white border border-base-300 shadow-md p-4 rounded-xl">
                            <p className="text-[18px] font-bold">Skin type: Normal</p>
                        </div> */}

                        <div
                            onClick={openGoalPopup}
                            className="flex items-center justify-between bg-gradient-to-r from-[#7271E3] to-[#FAB2A5] p-4 rounded-xl text-[#181818] shadow-md border border-base-300 cursor-pointer">
                            <div>
                                <p className="text-sm font-bold">Define your goals</p>
                                <p className="text-sm">Define a goal for your skincare</p>
                            </div>
                            <PiGreaterThanBold size={18} />
                        </div>
                    </div>

                    {/* Goal History */}
                    <div
                        onClick={handleGoalHistory}
                        className="cursor-pointer bg-white/50 border border-base-300 shadow-md p-4 rounded-xl">
                        <p className="text-[18px] font-bold">Goal History</p>
                    </div>

                    {/* Recommendations */}
                    <div className="pt-6">
                        <h1 className="text-[20px] font-semibold text-gray-800 mb-4">
                            Today’s recommendations
                        </h1>

                        {trackerSidebarData?.recommended_products.map((item) => (
                            <a href={item?.product_url} target="_blank" rel="noopener noreferrer">
                                <div key={item.id} className="mb-4">
                                    <h2 className="text-[16px] text-gray-800 mb-2">{item.title}</h2>
                                    <div className="flex items-center justify-between bg-white/50 rounded-lg shadow-sm px-4 py-3 border border-base-300">
                                        <div className="flex items-center">
                                            <img
                                                src={item?.image_url}
                                                alt={item.caption}
                                                className="w-14 h-14 rounded-lg object-cover mr-4"
                                            />
                                            <div>
                                                <p className="font-semibold text-gray-800">{item.name}</p>
                                                <div className="flex gap-2 items-center">
                                                    <p className="text-sm text-blue-500">{item.compatibility_score.toFixed(1)}%</p>
                                                    <p className="text-gray-500 text-[14px]">{item.product_type}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <ChevronRight size={18} />
                                    </div>
                                </div>
                            </a>

                        ))}

                    </div>

                    {/* Routine Survey */}
                    {/* <div className="bg-white/50 rounded-2xl p-4 shadow-sm flex items-start justify-between hover:shadow-md text-[18px] border border-base-300">
                        <div>
                            <div className="text-[#a688f7] flex items-center gap-2">
                                <Sparkle size={16} /> Routine
                            </div>
                            <div className="text-black font-semibold text-base mt-1">
                                Assess your skin well being
                            </div>
                            <div className="text-gray-500 text-sm">Take a short survey</div>
                        </div>
                        <div className="text-[#a688f7]">
                            <ChevronRight size={16} />
                        </div>
                    </div> */}

                    {/* Goal Popup */}
                    <div className={`absolute top-0 bottom-0 lg:left-0 right-0 transition-all duration-500 ease-in-out ${isGoalPopupVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-5 pointer-events-none'}`}>
                        <GoalSettingComponent onSaved={() => setIsGoalPopupVisible(false)} />
                        <div
                            className="absolute top-7 right-4 2xl:right-12 text-gray-500 cursor-pointer"
                            onClick={() => setIsGoalPopupVisible(false)}
                        >
                            <IoCloseCircleOutline size={28} className="hover:scale-110 transform transition-transform duration-700 ease-in-out" />
                        </div>
                    </div>

                    {/* Goal History Popup */}
                    <div className={`max-h-screen rounded-2xl absolute top-0 bottom-0 lg:left-0 right-0 transition-all duration-500 ease-in-out ${isGoalHistoryPopup ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-5 pointer-events-none'}`}>
                        {/* Pass data to GoalHistory */}
                        <GoalHistory data={data?.goals} />
                        <div
                            className="absolute top-7 right-4 text-gray-500 cursor-pointer"
                            onClick={() => setIsGoalHistoryPopup(false)}
                        >
                            <IoCloseCircleOutline size={28} className="hover:scale-110 transform transition-transform duration-700 ease-in-out" />
                        </div>
                    </div>
                </div>

                {/* Right Content */}
                <div className="w-full lg:flex-1 p-6 bg-white rounded-2xl shadow-xl mb-15 z-10 min-h-[calc(100vh-200px)]">
                    <TrackerTabs />
                    <DayNightTabs />
                    <Outlet />
                </div>
            </div>
        </div >
    );
};

export default TrackerLayout;