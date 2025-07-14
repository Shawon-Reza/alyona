import React from "react";

// Mock data (can be replaced with real API response)
const routineData = [30, 50, 60, 45, 55, 35, 40]; // Monday–Sunday
const goalData = [35, 45, 65, 50, 60, 30, 38];

const days = ["M", "T", "W", "T", "F", "S", "D"];

const BarGroup = ({ title, data }) => {
    const maxHeight = 60; // px - max bar height

    return (
        <div className="flex flex-col items-center w-full  bg-white rounded-xl p-4 shadow-xl border-base-100">
            <div className="font-semibold text-sm mb-3 text-center">{title}</div>
            <div className="flex items-end gap-2 h-[80px]">
                {data.map((value, idx) => {
                    const height = (value / 100) * maxHeight;
                    return (
                        <div key={idx} className="flex flex-col items-center">
                            <div
                                className="w-3 rounded-full bg-[#c29e80]"
                                style={{ height: `${height}px` }}
                            />
                            <div className="text-[10px] mt-1 text-gray-500">{days[idx]}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default function RoutineCompletion() {
    return (
        <div className="bg-white rounded-2xl p-6  shadow-sm w-full max-w-3xl mx-auto flex flex-col items-center justify-center">
            <h2 className="text-base font-bold mb-4">Skincare routine completion</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <BarGroup title="Routine completion average" data={routineData} />
                <BarGroup title="Goal completion average" data={goalData} />
            </div>
        </div>
    );
}
