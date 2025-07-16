import React from "react";
import { PieChart, Pie, Cell } from "recharts";

export default function GoalProgress() {
    const completed = 151;
    const total = 365;
    const percentage = (completed / total) * 100;

    const data = [
        { name: "Completed", value: percentage },
        { name: "Remaining", value: 100 - percentage },
    ];

    const COLORS = ["#b5764f", "#f2e8df"];

    return (
        <div className="bg-white rounded-2xl p-6 text-gray-800 w-full">
            {/* Title */}
            <div className="text-base font-semibold mb-4 text-center">
                <span className="font-bold">My Goal:</span> Use moisturizer for 1 month
            </div>

            {/* Chart */}
            <div className="relative flex justify-center items-center w-full">
                <PieChart width={200} height={180}>
                    <Pie
                        data={data}
                        startAngle={180}
                        endAngle={0}
                        innerRadius={70}
                        outerRadius={85}
                        dataKey="value"
                        isAnimationActive={true}
                        animationDuration={1000}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index]}
                                cornerRadius={percentage === 100 ? 0 : 6}
                            />
                        ))}
                    </Pie>
                </PieChart>

                {/* Centered Text */}
                <div className="absolute top-[40%] text-lg font-bold text-[#2c2c2c]">
                    {completed}/{total}
                </div>
            </div>
        </div>
    );
}
