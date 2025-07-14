import React from "react";

const skinStats = [
    { label: "Low moisture", value: 22 },
    { label: "Aging", value: 12 },
    { label: "Skin satisfaction", value: 87 },
];

export default function AboutMySkin() {
    return (
        <div className="bg-[#7271E30D] rounded-2xl p-6 ">
            <h2 className="text-xl font-bold mb-4">About my Skin</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {skinStats.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl p-4 shadow-sm text-center flex flex-col items-center justify-center "
                    >
                        <div
                            className="radial-progress text-indigo-500 mb-2"
                            style={{ "--value": stat.value }}
                            role="progressbar"
                            aria-valuenow={stat.value}
                        >
                            {stat.value}%
                        </div>
                        <div className="text-sm font-semibold mt-1">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
