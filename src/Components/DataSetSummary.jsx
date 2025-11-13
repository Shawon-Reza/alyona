import React from "react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

const dataSet = [
  { label: "A", avg: 136, value: 151, total: 753 },
  { label: "B", avg: 129, value: 133, total: 700 },
  { label: "C", avg: 143, value: 120, total: 753 },
  { label: "D", avg: 128, value: 145, total: 753 },
];

const CircularProgressChart = ({ label, percentage }) => {
  const chartData = [{ name: label, value: percentage }];

  return (
    <div className="w-24 h-24 relative">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="75%"
          outerRadius="100%"
          barSize={8}
          data={chartData}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background
            clockWise
            dataKey="value"
            fill="#b5764f"
            cornerRadius={5}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center font-bold text-sm text-gray-800">
        {label}
      </div>
    </div>
  );
};

const DataSetSummary = ({data}) => {
  console.log(data)
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border-base-100 text-gray-800 w-full mx-auto">
      <h2 className="text-base font-bold mb-6">Data set 3 name</h2>

      <div className="flex flex-wrap justify-center gap-10">
        {dataSet.map((set, idx) => {
          const percentage = set.total > 0 ? (set.value / set.total) * 100 : 0;

          return (
            <div
              key={idx}
              className="flex flex-col items-center text-center text-sm"
            >
              <CircularProgressChart label={set.label} percentage={percentage} />
              <div className="text-[13px] text-gray-500 mb-1">AVG {set.avg}</div>
              <div className="font-semibold text-[15px]">
                {set.value}/{set.total}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DataSetSummary;
