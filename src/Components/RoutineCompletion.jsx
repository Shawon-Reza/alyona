import React from "react";
// removed unused import
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

// Chart will use the `data` prop passed into the component. The expected
// shape is an object with weekday keys (Monday..Sunday), each containing
// { used_days, total_days, percentage } — e.g.:
// { Monday: { used_days:1, total_days:15, percentage:6.67 }, ... }
// We'll map that into arrays the charts can consume. If `percentage` is
// missing we compute it from used_days/total_days. Missing days default to 0.

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

export default function RoutineCompletion({ data1 = {}, data2 = {} }) {
    console.log('routine props', { data1, data2 })
    // build chart data from incoming `data1` and `data2` props
    const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const abbr = { Monday: 'M', Tuesday: 'T', Wednesday: 'W', Thursday: 'T', Friday: 'F', Saturday: 'S', Sunday: 'D' };

    const mapToChart = (src) => daysOrder.map(day => {
        const entry = src?.[day];
        let value = 0;

        // if the entry is a plain number use it directly
        if (typeof entry === 'number') {
            value = entry;
        } else if (entry && typeof entry === 'object') {
            if (typeof entry.percentage === 'number') {
                value = entry.percentage;
            } else if (typeof entry.used_days === 'number' && typeof entry.total_days === 'number' && entry.total_days > 0) {
                value = (entry.used_days / entry.total_days) * 100;
            } else {
                value = 0;
            }
        }

        return { day: abbr[day] || day.charAt(0), value: Math.round((value || 0) * 100) / 100 };
    });

    const routineChartData = mapToChart(data1 || {});
    const goalChartData = mapToChart(data2 || {});

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm w-full max-w-3xl mx-auto flex flex-col items-center justify-center">
            <h2 className="text-base font-bold mb-4">Skincare routine completion</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <BarGroup title="Weekly Goal Tracking" data={routineChartData} />
                <BarGroup title="Weekly Product Completion" data={goalChartData} />
            </div>
        </div>
    );
}
