import React from "react";

const dataSet = [
  { label: "A", avg: 136, value: 151, total: 753 },
  { label: "B", avg: 129, value: 133, total: 700 },
  { label: "C", avg: 143, value: 120, total: 753 },
  { label: "D", avg: 128, value: 145, total: 753 },
];

const CircularProgress = ({ percentage, label }) => {
  const strokeWidth = 6;
  const radius = 35;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width="80" height="80" className="mb-2">
      {/* Background circle */}
      <circle
        cx="40"
        cy="40"
        r={normalizedRadius}
        stroke="#f2e8df"
        strokeWidth={strokeWidth}
        fill="none"
      />
      {/* Progress circle */}
      <circle
        cx="40"
        cy="40"
        r={normalizedRadius}
        stroke="#b5764f"
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 40 40)"
      />
      {/* Label in center */}
      <text
        x="40"
        y="45"
        textAnchor="middle"
        fontSize="14"
        fontWeight="bold"
        fill="#2c2c2c"
      >
        {label}
      </text>
    </svg>
  );
};

const DataSetSummary = () => {
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
              <CircularProgress label={set.label} percentage={percentage} />
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
