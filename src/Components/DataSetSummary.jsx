import React from "react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";



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

const DataSetSummary = ({ data }) => {
  // Normalize incoming data into an array of { label, percentage, avg }
  const items = React.useMemo(() => {
    if (!data) return [];

    // If it's already an array, map into the expected shape
    if (Array.isArray(data)) {
      return data.map((set) => {
        const percentage = typeof set.percentage !== 'undefined'
          ? Number(set.percentage)
          : (typeof set.value !== 'undefined' && typeof set.total !== 'undefined')
            ? (set.total > 0 ? (Number(set.value) / Number(set.total)) * 100 : 0)
            : (typeof set.value !== 'undefined' ? Number(set.value) : 0);

        return {
          label: set.label || set.name || 'Unknown',
          percentage: Number.isFinite(percentage) ? percentage : 0,
          avg: typeof set.avg !== 'undefined' ? set.avg : percentage,
        };
      });
    }

    // If data is an object like { cleanser: 0, moisturiser: 0, ... }
    if (typeof data === 'object') {
      return Object.entries(data).map(([k, v]) => ({
        label: k,
        percentage: Number.isFinite(Number(v)) ? Number(v) : 0,
        avg: Number.isFinite(Number(v)) ? Number(v) : 0,
      }));
    }

    return [];
  }, [data]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border-base-100 text-gray-800 w-full mx-auto">
      <h2 className="text-base font-bold mb-6">Product Usage Consistency By Type</h2>

      <div className="flex flex-wrap justify-center gap-10">
        {items.map((set, idx) => {
          const percentage = Math.max(0, Math.min(100, Number(set.percentage || 0)));

          return (
            <div key={idx} className="flex flex-col items-center text-center text-sm">
              <CircularProgressChart label={set.label} percentage={percentage} />
              <div className="text-[13px] text-gray-500 mb-1">{percentage.toFixed(2)}%</div>
              {/* <div className="text-[12px] text-gray-400">AVG {typeof set.avg !== 'undefined' ? set.avg : '-'}</div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DataSetSummary;
