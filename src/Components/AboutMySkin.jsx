import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const skinStats = [
    { label: "Low moisture", value: 22 },
    { label: "Aging", value: 12 },
    { label: "Skin satisfaction", value: 87 },
];

const COLORS = ["#6366f1", "#e5e7eb"]; // Primary + Background

const RadialProgress = ({ value, label }) => {
    const data = [
        { name: "progress", value: value },
        { name: "rest", value: 100 - value },
    ];

    return (
        <div className="flex flex-col items-center justify-center">
            <PieChart width={80} height={80}>
                <Pie
                    data={data}
                    innerRadius={26}
                    outerRadius={35}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                    animationDuration={800}
                >
                    {data.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={COLORS[idx]} />
                    ))}
                </Pie>
            </PieChart>
            <div className="absolute text-sm font-bold text-indigo-600">{value}%</div>
        </div>
    );
};

export default function AboutMySkin() {
    return (
        <div className="bg-[#7271E30D] rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">About my Skin</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {skinStats.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl p-4 shadow-sm text-center flex flex-col items-center justify-center relative"
                    >
                        <RadialProgress value={stat.value} />
                        <div className="text-sm font-semibold mt-2">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
