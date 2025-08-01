import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import PopUpCalendarOnClick from "../Components/PopUpCalenderOnClick";
import Productimgfordetails from '../assets/Productimgfordetails.png';
import { ChevronRight, Sparkle } from "lucide-react";
import LoginPageOverLap from '../assets/LoginPageOverLap.png';
import TrackerTabs from "../Components/TrackerTabs";
import DayNightTabs from "../Components/TrackerTabComponent/DayNightTabs";

const TrackerLayout = () => {
    const recommendations = [
        {
            id: 1,
            title: "Try a toner that matches 100% with your skin type",
            image: Productimgfordetails,
            caption: "Tone SB",
            description: "100% Moisturizer",
        },
        {
            id: 2,
            title: "Protect your skin from UV radiation",
            image: Productimgfordetails,
            caption: "Sun Protection SPF50 Stick",
            description: "100% Sunscreen",
        },
    ];

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-[#FAFAFA] via-[#FFFFFF] to-[#F5EADF]">
            {/* Navbar */}
            <div className="px-4 lg:px-10 pt-6">
                <Navbar />
            </div>

            {/* Overlapping Image */}
            <div className="absolute bottom-20 right-0 hidden lg:block">
                <img src={LoginPageOverLap} alt="OverlapIMG" className="scale-125" />
            </div>

            {/* Main Layout */}
            <div className="flex flex-col-reverse lg:flex-row px-4 lg:px-10 mt-6 lg:mt-10 gap-6 lg:gap-8">

                {/* Sidebar (bottom on mobile, left on desktop) */}
                <div className="w-full lg:w-1/4 min-w-[320px] space-y-6 mb-2">
                    {/* Calendar */}
                    <PopUpCalendarOnClick />

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
                            <span className="text-lg text-gray-400 cursor-pointer">›</span>
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

                    {/* Skin Info */}
                    <div className="space-y-4">
                        <div className="bg-white border border-base-300 shadow-md p-4 rounded-xl">
                            <p className="text-[18px] font-bold">Skin type: Normal</p>
                        </div>

                        <div className="bg-gradient-to-r from-[#7271E3] to-[#FAB2A5] p-4 rounded-xl text-[#181818] shadow-md border border-base-300">
                            <p className="text-sm font-bold">No goal defined</p>
                            <p className="text-sm">Define a goal for your skincare</p>
                        </div>
                    </div>

                    {/* Goal History */}
                    <div className="bg-white/50 border border-base-300 shadow-md p-4 rounded-xl">
                        <p className="text-[18px] font-bold">Goal History</p>
                    </div>

                    {/* Recommendations */}
                    <div className="pt-6">
                        <h1 className="text-[20px] font-semibold text-gray-800 mb-4">
                            Today’s recommendations
                        </h1>

                        {recommendations.map((item) => (
                            <div key={item.id} className="mb-4">
                                <h2 className="text-[16px] text-gray-800 mb-2">{item.title}</h2>
                                <div className="flex items-center justify-between bg-white/50 rounded-lg shadow-sm px-4 py-3 border border-base-300">
                                    <div className="flex items-center">
                                        <img
                                            src={item.image}
                                            alt={item.caption}
                                            className="w-14 h-14 rounded-lg object-cover mr-4"
                                        />
                                        <div>
                                            <p className="font-medium text-gray-800">{item.caption}</p>
                                            <p className="text-gray-500 text-[14px]">{item.description}</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={18} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Routine Survey Card */}
                    <div className="bg-white/50 rounded-2xl p-4 shadow-sm flex items-start justify-between hover:shadow-md text-[18px] border border-base-300">
                        <div>
                            <div className="text-[#a688f7] flex items-center gap-2">
                                <Sparkle size={16} />
                                Routine
                            </div>
                            <div className="text-black font-semibold text-base mt-1">
                                Assess your skin well being
                            </div>
                            <div className="text-gray-500 text-sm">Take a short survey</div>
                        </div>
                        <div className="text-[#a688f7]">
                            <ChevronRight size={16} />
                        </div>
                    </div>
                </div>

                {/* Right Content */}
                <div className="w-full lg:flex-1 p-6 bg-white rounded-2xl shadow-xl mb-15">
                    <TrackerTabs />
                    <DayNightTabs />
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default TrackerLayout;
