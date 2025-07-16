import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { FaLightbulb } from "react-icons/fa";
import SkinAnalysisPageIMG from "../assets/SkinAnalysisPageIMG.png";
import SkinSatisfactionChart from "./SkinSatisfactionChart"; // Keep this as-is if already using Recharts or update separately

// Mock data
const progressItems = [
  { label: "Current level of stress", value: 79 },
  { label: "Level of activity", value: 79 },
  { label: "Beauty sleep quality", value: 50 },
];

const recommendations = [
  "Practice daily meditation or deep breathing exercises",
  "Avoid screens 1 hour before bed",
  "Practice daily meditation or deep breathing exercises",
];

const CircularProgress = ({ value, size = 80 }) => {
  const data = [
    { name: "Progress", value },
    { name: "Remaining", value: 100 - value },
  ];

  const COLORS = ["#b5764f", "#f2e8df"];

  return (
    <div className="relative w-[80px] h-[80px]">
      <PieChart width={size} height={size}>
        <Pie
          data={data}
          innerRadius={size / 2.5}
          outerRadius={size / 2}
          startAngle={90}
          endAngle={-270}
          paddingAngle={0}
          dataKey="value"
          stroke="none"
          isAnimationActive={true}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} cornerRadius={100} />
          ))}
        </Pie>
      </PieChart>
      <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-[#2c2c2c]">
        {value}%
      </div>
    </div>
  );
};

export default function AboutSkin() {
  return (
    <div className="mt-10 p-6 w-full bg-gradient-to-b from-[#fafafa] via-[#ffffff] to-[#f5eadf] rounded-2xl">
      {/* Skin type summary */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-6 border text-sm text-gray-800 gap-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-10">
          <img
            src={SkinAnalysisPageIMG}
            alt="Skin Type Icon"
            className="w-36 h-36 rounded-full border"
          />
          <div>
            <h2 className="font-bold text-base mb-1">Normal Type</h2>
            <p className="text-gray-600 leading-relaxed text-xl">
              Congratulations! You are a happy owner of a normal skin type.
              Even if you might have some skin concerns like wrinkles or dark
              circles. Your skin is perfect! Your skincare routine should be
              focused on maintaining your skin beauty and tackling your specific
              concerns that is quite doable with right ingredients...
            </p>
          </div>
        </div>
      </div>

      {/* Progress section */}
      <h3 className="text-xl font-bold mb-8">About your skin</h3>
      <div className="flex flex-wrap gap-4 justify-between mb-6">
        {progressItems.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-white rounded-xl px-6 py-4 shadow-sm w-full sm:w-[30%]"
          >
            <CircularProgress value={item.value} />
            <div className="text-xs font-medium text-center mt-2 text-gray-600">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations + Line Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        {/* Recommendations */}
        <div>
          <h3 className="font-bold text-lg mb-3">Recommendations</h3>
          <div className="space-y-3">
            {recommendations.map((tip, idx) => (
              <div
                key={idx}
                className="flex items-start bg-[#EFEBEB] text-xl text-gray-700 px-4 py-2 rounded-md"
              >
                <FaLightbulb className="text-[#b5764f] mt-1 mr-2" />
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skin satisfaction chart */}
        <div className="flex-1">
          <SkinSatisfactionChart />
        </div>
      </div>
    </div>
  );
}
