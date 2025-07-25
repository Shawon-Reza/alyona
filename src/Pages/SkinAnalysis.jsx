import React, { useState, useEffect } from "react";
import SkinAnalysisPageIMG from "../assets/SkinAnalysisPageIMG.png";
import AuthNav from "../Components/AuthNav";
import RowButton from "../Components/RowButton";
import LoginPageOverLap from '../assets/LoginPageOverLap.png';
import { useNavigate } from "react-router-dom";
import AuthenticationNav from "../Components/AuthenticationNav";

const RadialProgress = ({ value, delay = 0 }) => {
    const [animatedValue, setAnimatedValue] = useState(0);
    const radius = 40;
    const strokeWidth = 6;
    const normalizedRadius = radius - strokeWidth * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDasharray = `${circumference} ${circumference}`;
    const strokeDashoffset = circumference - (animatedValue / 100) * circumference;

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedValue(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay]);

    return (
        <div className="w-24 h-24 relative flex items-center justify-center">
            <svg
                height={radius * 2}
                width={radius * 2}
                className="transform -rotate-90"
            >
                {/* Background circle (complete ring) */}
                <circle
                    stroke="#e5e7eb"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                {/* Progress arc (sits exactly on top of background) */}
                <circle
                    stroke="#c7885e"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    className="transition-all duration-1000 ease-out" // Increased duration to 1000ms
                />
            </svg>
            {/* Percentage text in center with animation */}
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-700 transition-all duration-1000 ease-out">
                    {Math.round(animatedValue)}%
                </span>
            </div>
        </div>
    );
};

export default function SkinAnalysis() {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    
    const section1 = [
        { label: "Current level of stress", value: 79 },
        { label: "Level of activity", value: 79 },
        { label: "Beauty sleep quality", value: 50 },
    ];
    
    const section2 = [
        { label: "Water intake", value: 79 },
        { label: "Diet efficiency", value: 79 },
    ];

    // Trigger animations when component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 300); // Small delay before starting animations

        return () => clearTimeout(timer);
    }, []);
    
    const renderProgressGroup = (data, startDelay = 0) => (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data.map((item, idx) => (
                <div
                    key={idx}
                    className="bg-white/50 rounded-xl py-8 shadow-sm text-center flex flex-col items-center justify-center relative"
                >
                    <RadialProgress 
                        value={isVisible ? item.value : 0} 
                        delay={startDelay + (idx * 200)} // Stagger animations by 200ms
                    />
                    <div className="text-sm font-bold text-gray-700 mt-3">{item.label}</div>
                </div>
            ))}
        </div>
    );
    
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-[#fdf8f3] to-[#e8e3de] p-4 ">
            <div>
                <AuthenticationNav></AuthenticationNav>
            </div>
            <div className="absolute bottom-22 right-22 hidden sm:block">
                <img src={LoginPageOverLap || "/placeholder.svg"} alt="OverlapIMG" className="scale-130" />
            </div>
            
            <div className="mx-auto px-4">
                <div className="mt-10 flex flex-col lg:flex-row gap-8">
                    {/* Left Panel */}
                    <div className="lg:w-1/3 space-y-4 text-center lg:text-left">
                        <div className="flex justify-center lg:justify-start">
                            <img
                                src={SkinAnalysisPageIMG || "/placeholder.svg"}
                                alt="avatar"
                                className="w-20 h-20 mb-2"
                            />
                        </div>
                        <div className="text-2xl font-semibold">Normal Type</div>
                        <p className="text-gray-600 text-sm sm:text-lg">
                            Congratulations! You are a happy owner of a normal skin type. Even if you
                            might have some skin concerns like wrinkles or dark circles, your skin is
                            perfect! Your skincare routine should be focused on maintaining your skin
                            beauty and tackling your specific concerns that is quite doable with right
                            ingredients. Protect the microbiome (natural skin's barrier) as it does a
                            great job in keeping your skin well-balanced. Right diet and lifestyle will
                            support your skin natural beauty, correct skincare routine will prolong your
                            youth and fortify your skin even more.
                        </p>
                    </div>
                    {/* Right Panel */}
                    <div className="lg:w-2/3">
                        <div className="text-[22px] font-medium mb-4">About your skin</div>
                        {renderProgressGroup(section1, 0)} {/* First section starts immediately */}
                        {/* Recommendations 1 */}
                        <div className="my-10">
                            <div className="text-sm font-bold text-gray-700 mb-2">Recommendations</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {["Practice daily meditation or deep breathing exercises", "Avoid screens 1 hour before bed", "Include protein in every meal", "Create a relaxing bedtime routine"].map((rec, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white/50 border border-gray-200 p-4 rounded-xl shadow-sm text-sm flex items-start gap-2"
                                    >
                                        <span className="text-yellow-500">💡</span> {rec}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full my-6 border-t-[2px] border-dashed border-[#BB9777] border-image-[repeating-linear-gradient(to_right,#BB9777_0_80px,transparent_20px_120px)] border-image-slice-[1]" />
                        {renderProgressGroup(section2, 800)} {/* Second section starts after 800ms delay */}
                        {/* Recommendations 2 */}
                        <div className="my-10">
                            <div className="text-sm font-bold text-gray-700 mb-2">Recommendations</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {["Practice daily meditation or deep breathing exercises", "Avoid screens 1 hour before bed"].map((rec, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white/50 border border-gray-200 p-4 rounded-xl shadow-sm text-sm flex items-start gap-2"
                                    >
                                        <span className="text-yellow-500">💡</span> {rec}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="absolute bottom-5 right-8 md:right-14 md:bottom-7 lg:bottom-20 lg:right-20 cursor-pointer">
                            <RowButton
                                text="Let's get started"
                                onClick={() => {
                                    navigate("/SubscriptionPlans");
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}