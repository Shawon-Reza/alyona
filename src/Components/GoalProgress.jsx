import React from "react";

export default function GoalProgress() {
    const completed = 151;
    const total = 365;
    const percentage = (completed / total) * 100;
    const angle = (percentage / 100) * 180;

    // Convert angle to radians
    const radians = (angle * Math.PI) / 180;

    // Radius and center
    const r = 90;
    const cx = 100;
    const cy = 100;

    // Arc endpoint using polar to cartesian
    const x = cx + r * Math.cos(Math.PI - radians);
    const y = cy - r * Math.sin(Math.PI - radians);

    const largeArcFlag = percentage > 50 ? 1 : 0;

    return (
        <div className="bg-white rounded-2xl p-6  text-gray-800 w-full ">
            {/* Title */}
            <div className="text-base font-semibold mb-4 text-center">
                <span className="font-bold">My Goal:</span> Use moisturizer for 1 month
            </div>

            {/* Arc Progress */}
            <div className="relative w-full flex justify-center items-start">
                <svg width="200" height="100" viewBox="0 0 200 100">
                    {/* Background arc */}
                    <path
                        d="M10,100 A90,90 0 0,1 190,100"
                        fill="none"
                        stroke="#f2e8df"
                        strokeWidth="14"
                    />

                    {/* Foreground arc with proper math */}
                    <path
                        d={`M10,100 A90,90 0 ${largeArcFlag},1 ${x},${y}`}
                        fill="none"
                        stroke="#b5764f"
                        strokeWidth="14"
                        strokeLinecap="round"
                    />
                </svg>

                {/* Centered Text */}
                <div className="absolute top-[52%] text-lg font-bold text-[#2c2c2c]">
                    {completed}/{total}
                </div>
            </div>
        </div>
    );
}
