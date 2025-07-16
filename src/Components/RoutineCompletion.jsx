import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const routineData = [
    { day: "M", value: 30 },
    { day: "T", value: 50 },
    { day: "W", value: 60 },
    { day: "T", value: 45 },
    { day: "F", value: 55 },
    { day: "S", value: 35 },
    { day: "D", value: 40 },
];

const goalData = [
    { day: "M", value: 35 },
    { day: "T", value: 45 },
    { day: "W", value: 65 },
    { day: "T", value: 50 },
    { day: "F", value: 60 },
    { day: "S", value: 30 },
    { day: "D", value: 38 },
];

const BarGroup = ({ title, data }) => {
    return (
        <div className="bg-white rounded-xl p-4 shadow-xl border-base-100 w-full">
            <div className="font-semibold text-sm mb-4 text-center">{title}</div>
            <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis dataKey="day" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                        <YAxis hide domain={[0, 100]} />
                        <Tooltip />
                        {/* Removed CartesianGrid */}
                        <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="#c29e80" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default function RoutineCompletion() {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm w-full max-w-3xl mx-auto flex flex-col items-center justify-center">
            <h2 className="text-base font-bold mb-4">Skincare routine completion</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <BarGroup title="Routine completion average" data={routineData} />
                <BarGroup title="Goal completion average" data={goalData} />
            </div>
        </div>
    );
}
