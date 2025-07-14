import React from "react";
import { FaLightbulb } from "react-icons/fa";
import SkinAnalysisPageIMG from '../assets/SkinAnalysisPageIMG.png'
import SkinSatisfactionChart from "./SkinSatisfactionChart";
// Mock data
const progressItems = [
    { label: "Current level of stress", value: 79 },
    { label: "Level of activity", value: 79 },
    { label: "Beauty sleep quality", value: 50 },
];

const recommendations = [
    "Practice daily meditation or deep breathing exercises",
    "Avoid screens 1 hour before bed",
    "Practice daily meditation or deep breathing exercises",
];

const CircularProgress = ({ value, size = 50 }) => {
    const strokeWidth = 4;
    const radius = size / 2 - strokeWidth;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
        <svg width={size} height={size} className="mb-2" aria-label={`Progress: ${value}%`}>
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#f2e8df"
                strokeWidth={strokeWidth}
                fill="none"
            />
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#b5764f"
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
            <text
                x={size / 2}
                y={size / 2 + 5}
                textAnchor="middle"
                fontSize={12}
                fontWeight="bold"
                fill="#2c2c2c"
            >
                {value}%
            </text>
        </svg>
    );
};

export default function AboutSkin() {
    return (
        <div className="mt-10  p-6 w-full bg-gradient-to-b from-[#fafafa] via-[#ffffff] to-[#f5eadf] rounded-2xl">
            {/* Skin type summary */}
            <div className="bg-white p-6 rounded-xl shadow-sm mb-6 border text-sm text-gray-800 gap-10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-10">
                    <img
                        src={SkinAnalysisPageIMG}
                        alt="Skin Type Icon"
                        className="w-36 h-36 rounded-full border"
                    />
                    <div>
                        <h2 className="font-bold text-base mb-1">Normal Type</h2>
                        <p className="text-gray-600 leading-relaxed text-xl">
                            Congratulations! You are a happy owner of a normal skin type.
                            Even if you might have some skin concerns like wrinkles or dark
                            circles. Your skin is perfect! Your skincare routine should be
                            focused on maintaining your skin beauty and tackling your specific
                            concerns that is quite doable with right ingredients...
                        </p>
                    </div>
                </div>
            </div>

            {/* Progress section */}
            <h3 className="text-xl font-bold mb-8">About your skin</h3>
            <div className="flex flex-wrap gap-4 justify-between mb-6">
                {progressItems.map((item, idx) => (
                    <div
                        key={idx}
                        className="flex flex-col items-center bg-white rounded-xl px-6 py-4 shadow-sm w-full sm:w-[30%]"
                    >
                        <CircularProgress value={item.value} />
                        <div className="text-xs font-medium text-center mt-1 text-gray-600">
                            {item.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* Recommendations + Line Chart */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start ">
                {/* Recommendations */}
                <div>
                    <h3 className="font-bold text-lg mb-3">Recommendations</h3>
                    <div className="space-y-3">
                        {recommendations.map((tip, idx) => (
                            <div
                                key={idx}
                                className="flex items-start bg-[#EFEBEB] text-xl text-gray-700 px-4 py-2 rounded-md"
                            >
                                <FaLightbulb className="text-[#b5764f] mt-1 mr-2" />
                                <span>{tip}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Skin satisfaction line chart (placeholder) */}
                <div className="flex-1">
                    <SkinSatisfactionChart></SkinSatisfactionChart>
                </div>
            </div>
        </div>
    );
}
