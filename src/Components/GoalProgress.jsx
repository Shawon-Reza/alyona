import React from "react";
import { PieChart, Pie, Cell } from "recharts";

export default function GoalProgress({data}) {
    // component uses incoming `data` prop

        // Accepts data shaped like:
        // { average_days_used: 2, average_percentage: 6.67, total_days: 30 }

        const avgDaysUsed = Number((data && data.average_days_used) || 0);
        const totalDays = Number((data && data.total_days) || 30);
        // Use provided average_percentage if present, otherwise compute from days
        let percentage = typeof data?.average_percentage !== 'undefined'
            ? Number(data.average_percentage)
            : (totalDays > 0 ? (avgDaysUsed / totalDays) * 100 : 0);

        if (!Number.isFinite(percentage)) percentage = 0;
        // clamp
        percentage = Math.max(0, Math.min(100, percentage));

        const chartData = [
            { name: "Completed", value: percentage },
            { name: "Remaining", value: 100 - percentage },
        ];

        const COLORS = ["#b5764f", "#f2e8df"];

    return (
        <div className="bg-white rounded-2xl p-6 text-gray-800 w-full">
            {/* Title */}
            <div className="text-base font-semibold mb-4 text-center">
                <span className="font-bold">My Goal:</span> Use moisturizer for {totalDays} day{totalDays > 1 ? 's' : ''}
            </div>

            {/* Chart */}
            <div className="relative flex justify-center items-center w-full">
                <PieChart width={200} height={180}>
                    <Pie
                            data={chartData}
                        startAngle={180}
                        endAngle={0}
                        innerRadius={70}
                        outerRadius={85}
                        dataKey="value"
                        isAnimationActive={true}
                        animationDuration={1000}
                    >
                            {chartData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                cornerRadius={percentage === 100 ? 0 : 6}
                            />
                        ))}
                    </Pie>
                </PieChart>

                {/* Centered Text */}
                <div className="absolute top-[40%] text-lg font-bold text-[#2c2c2c]">
                        {avgDaysUsed}/{totalDays}
                        <div className="text-sm font-normal mt-1">{percentage.toFixed(2)}%</div>
                </div>
            </div>
        </div>
    );
}
