import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
    CalendarDays,
    ScanLine,
    FileText,
    Pencil,
    ChevronDown,
} from 'lucide-react';
import Navbar from '../Components/Navbar';
import MonthlySkinReport from '../Components/MonthlySkinReport ';
import useIsMobile from '../hooks/useIsMobile';
import MentorDropdown from './MentorDropdown';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { MdProductionQuantityLimits } from 'react-icons/md';

const ChatPage = () => {
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    const [showOptions, setShowOptions] = useState(false);
    const [aiEnabled, setAiEnabled] = useState(true);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f9f0f0] to-[#f0f5ff] px-4 sm:px-6 py-6">
            {/* Top Navbar */}
            <div className='mb-10'>
                <Navbar />
            </div>

            {/* Main layout */}
            <div className="flex flex-col md:flex-row gap-6 mt-4 h-full">
                {/* Left Sidebar */}
                <div className="w-full md:w-[280px] flex-shrink-0 px-2 flex flex-col gap-6 text-[#1e1e2f]">
                    {/* Profile Image */}
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-300 to-pink-300 mx-auto" />

                    {/* Agent Info */}
                    <div className="flex justify-between items-center bg-white px-4 py-3 rounded-xl">
                        <div className="flex items-center gap-2 font-semibold text-[20px] ">
                            Elyssa
                            <Pencil size={15} className="text-gray-400" />
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={aiEnabled}
                                    onChange={(e) => setAiEnabled(e.target.checked)}
                                />
                                <div className="w-10 h-4 bg-gray-200 rounded-full peer peer-checked:bg-purple-400" />
                                <div className="absolute left-0.5 -top-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-full transition-transform" />
                            </label>
                            <span className="text-[14px]">Jules</span>
                        </div>
                    </div>

                    {/* Chat with mentor  */}
                    {/* <button className="w-full flex justify-between items-center bg-white rounded-xl px-4 py-2 shadow-sm">
                        <h2 className="text-xl font-bold">Mentors</h2>
                        <span className="text-[#4F46E5] text-2xl">›</span>
                    </button> */}

                    <MentorDropdown />


                    {/* Options Toggle - only visible on mobile */}
                    <div
                        onClick={() => setShowOptions((prev) => !prev)}
                        className="w-full bg-[#FFFBF8] border border-[#F2E8E2] rounded-xl px-4 py-3 flex items-center justify-between text-[#B78E6D] font-semibold text-[16px] md:hidden cursor-pointer"
                    >
                        <span>Options</span>
                        <ChevronDown size={18} className={`transition-transform ${showOptions ? 'rotate-180' : ''}`} />
                    </div>

                    {/* Sidebar Items - toggled on mobile, always shown on desktop */}
                    <div className={`${isMobile && !showOptions ? 'hidden' : ''} md:block`}>
                        {/* Meeting Card */}
                        <div className="flex flex-col gap-3 mt-2 md:mt-0">
                            <div className="w-full flex justify-between items-start bg-white rounded-2xl p-4 shadow-sm">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-1 text-sm font-medium text-[#4F46E5]">
                                        <CalendarDays size={16} />
                                        <span>Meeting</span>
                                    </div>
                                    <span className="text-sm font-semibold text-black">
                                        Schedule a meeting
                                    </span>
                                </div>
                                <div className="pt-1">
                                    <span className="text-[#4F46E5] text-2xl">›</span>
                                </div>
                            </div>


                            {/* Ai Chat */}
                            {aiEnabled && (
                                <>
                                    <button
                                        onClick={() => {
                                            navigate('/chat/ai-chat');
                                            setShowOptions((prev) => !prev)
                                        }}
                                        className="flex items-center justify-between bg-[#f7f9ff] px-4 py-3 rounded-xl shadow-sm hover:bg-[#eef3fd] cursor-pointer"
                                    >
                                        <div className="flex items-center gap-2 text-sm text-[#4F46E5] font-medium">
                                            <IoChatbubbleEllipsesOutline size={16} />
                                            <span>AI Chat</span>
                                        </div>
                                        <span className="text-2xl text-blue-600">›</span>
                                    </button>

                                    <button
                                        onClick={() => {
                                            navigate('/chat/product-recommendation');
                                            setShowOptions((prev) => !prev)
                                        }}
                                        className="flex items-center justify-between bg-[#f7f9ff] px-4 py-3 rounded-xl shadow-sm hover:bg-[#eef3fd] cursor-pointer"
                                    >
                                        <div className="flex items-center gap-2 text-sm text-[#4F46E5] font-medium">
                                            <MdProductionQuantityLimits  size={16} />
                                            <span>Product Recommendation</span>
                                        </div>
                                        <span className="text-2xl text-blue-600">›</span>
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Upcoming Meeting */}
                        <div className="mt-4">
                            <p className="text-[22px] text-[#181818] mb-1 font-medium">Upcoming</p>
                            <div className="bg-white shadow-md rounded-xl px-4 py-3 flex flex-col gap-1 text-[18px">
                                <div className="flex items-center gap-2 text-black">
                                    <CalendarDays size={16} className="text-blue-600" />
                                    <span className="font-bold">Meeting with Jules Scheduled</span>
                                </div>
                                <span className="text-[18px] text-gray-500">
                                    05/05/2025, 10:30 am
                                </span>
                            </div>
                        </div>

                        {/* Reports */}
                        <div className="-mt-5 max-h-[]">
                            <MonthlySkinReport />
                        </div>
                    </div>
                </div>

                {/* Right Content */}
                <div style={{ height: 'calc(100vh - 140px)' }} className="flex-1 w-full xl:max-h-screen h-screen-mi  rounded-2xl shadow-md flex flex-col">
                    {/* Scrollable Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-4">
                        <Outlet />
                    </div>

                    {/* You can add sticky chat input here if needed */}
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
