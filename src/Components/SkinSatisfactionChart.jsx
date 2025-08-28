import axiosApi from "@/api/axiosApi";
import { useQuery } from "@tanstack/react-query";
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


const SkinSatisfactionChart = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['skinSatisfaction'],
        queryFn: async () => {
            const res = await axiosApi.get('/accounts/api/v1/skin-satisfaction');
            return res.data;
        }
    });

    if (isPending) return 'Loading...';
    if (error) return 'An error has occurred: ' + error.message;

    // latest value (last score in array)
    const latestValue = data.length ? `${data[data.length - 1].score}%` : "0%";

    return (
        <div className="bg-white rounded-xl shadow-sm p-4 relative overflow-hidden w-full pb-10">
            <h3 className="font-semibold text-sm mb-2 text-center pb-5">
                Skin satisfaction
            </h3>

            <div className="relative h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
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
                            dataKey="score"
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
