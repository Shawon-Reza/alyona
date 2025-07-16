import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Dot
} from "recharts";

// Generate last 4 months
const getLastFourMonths = () => {
    const months = [];
    const now = new Date();
    for (let i = 3; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        months.push(d.toLocaleString("default", { month: "short" }));
    }
    return months;
};

const SkinSatisfactionChart = ({
    data = [5, 25, 0, 27], // expects 4 data points
    latestValue = "87%",
}) => {
    const monthLabels = getLastFourMonths();

    // Prepare chart data
    const chartData = monthLabels.map((month, idx) => ({
        month,
        value: data[idx] || 0,
    }));

    return (
        <div className="bg-white rounded-xl shadow-sm p-4 relative overflow-hidden w-full">
            <h3 className="font-semibold text-sm mb-2 text-center">
                Skin satisfaction
            </h3>

            <div className="relative h-40 w-full">
                {/* Recharts Container */}
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="0" vertical={false} stroke="#f0f0f0" />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fill: "#888" }}
                        />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#1f1f3f"
                            strokeWidth={3.5}
                            dot={{
                                stroke: "#1f1f3f",
                                strokeWidth: 4,
                                r: 2,
                                fill: "#1f1f3f",
                            }}
                            activeDot={{ r: 4 }}
                        />
                    </LineChart>
                </ResponsiveContainer>

                {/* Latest Value Tag */}
                <div className="absolute top-3 right-[5%] text-xs font-bold text-gray-800">
                    {latestValue}
                </div>
            </div>
        </div>
    );
};

export default SkinSatisfactionChart;
