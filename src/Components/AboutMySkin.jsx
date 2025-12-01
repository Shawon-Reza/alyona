import React from "react";
import { PieChart, Pie, Cell } from "recharts";



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

export default function AboutMySkin({ data }) {


    const skinStats = [
        { label: "Moisture", value: parseFloat((data?.avg_hydration_level || 0).toFixed(1)) },
        { label: "Aging", value: parseFloat((data?.avg_aging_index || 0).toFixed(1)) },
        { label: "Skin satisfaction", value: parseFloat((data?.avg_skin_satisfaction || 0).toFixed(1)) },
    ];
    return (
        <div className="bg-[#7271E30D] rounded-2xl p-6 hover:scale-101 transition-transform duration-300 ease-in-out">
            <h2 className="text-xl font-bold mb-4">About my Skin</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
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
