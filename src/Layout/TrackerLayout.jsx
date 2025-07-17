import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import PopUpCalendarOnClick from "../Components/PopUpCalenderOnClick";
import Productimgfordetails from '../assets/Productimgfordetails.png'

const TrackerLayout = () => {

    const recommendations = [
        {
            id: 1,
            title: "Try a toner that matches 100% with your skin type",
            image: Productimgfordetails, // Replace with actual image path
            caption: "Tone SB",
            description: "100% Moisturizer",
            buttonText: "View Details",
        },
        {
            id: 2,
            title: "Protect your skin from UV radiation",
            image: Productimgfordetails, // Replace with actual image path
            caption: "Sun Protection SPF50 Stick",
            description: "100% Sunscreen",
            buttonText: "View Details",
        },
    ];




    return (
        <div className="min-h-screen bg-gradient-to-b from-[#FAFAFA] via-[#FFFFFF] to-[#F5EADF]">
            <div className="px-10 pt-6">
                <Navbar />
            </div>

            {/* Main layout: Sidebar and content */}
            <div className="flex px-10 mt-10 gap-8">
                {/* Left Sidebar */}
                <div className="w-1/4  min-w-[350px]">

                    {/* Calendar Bubbles */}
                    <div>
                        <PopUpCalendarOnClick></PopUpCalendarOnClick>
                    </div>


                    {/* Routine Prompt */}
                    <div className="bg-white border-2 border-base-200 rounded-md p-4 shadow-lg mb-6">
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

                        {/* Progress Bar */}
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
                    <div className="space-y-4 mt-6">
                        <div className="bg-white border border-base-200 shadow-md p-4 rounded-xl">
                            <p className="text-[18px] font-bold">Skin type: Normal</p>
                        </div>

                        <div className="bg-gradient-to-r from-[#7271E3] to-[#FAB2A5]  p-4 rounded-xl text-[#181818] shadow-md">
                            <p className="text-sm font-bold">No goal defined</p>
                            <p className="text-sm">Define a goal for your skincare</p>
                        </div>
                    </div>

                    {/* Goal History */}
                    <div className="bg-white border border-base-200 shadow-md p-4 rounded-xl mt-6">
                        <p className="text-[18px] font-bold">Goal History</p>
                    </div>

                    {/* Today's Recommendations */}
                    <div className="py-10">
      <div className="max-w-3xl mx-auto p-6 rounded-lg bg-gray-100 shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Today’s recommendations
        </h1>

        {recommendations.map((item) => (
          <div key={item.id} className="mb-6">
            <h2 className="text-xl font-medium text-gray-800 mb-2">{item.title}</h2>
            <div className="flex items-center justify-between bg-white rounded-lg shadow-sm px-4 py-3">
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.caption}
                  className="w-16 h-16 rounded-lg object-cover mr-4"
                />
                <div>
                  <p className="font-medium text-gray-800">{item.caption}</p>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                </div>
              </div>
              <div className="flex items-center text-indigo-600">
                <span className="text-xs font-semibold">{item.description}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

                    {/* Well-being Prompt */}
                    <div className="bg-[#F5F0EE] p-4 rounded-xl mt-6">
                        <p className="text-sm font-medium">🌀 Routine</p>
                        <p className="text-xs">Assess your skin well-being. Take a short survey</p>
                    </div>
                </div>

                {/* Right Content */}
                <div className="flex-1 p-6 overflow-y-auto bg-white rounded-2xl shadow-xl">
                    {/* Nested Routes will be rendered here */}
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default TrackerLayout;
