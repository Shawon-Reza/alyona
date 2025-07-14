import React from "react";

const SkinSatisfactionChart = ({
    data = [5, 25, 0, 27], // 4 values required
    latestValue = "87%",
}) => {
    // Generate last 4 months including current
    const getLastFourMonths = () => {
        const labels = [];
        const date = new Date();
        for (let i = 3; i >= 0; i--) {
            const d = new Date(date.getFullYear(), date.getMonth() - i, 1);
            labels.push(d.toLocaleString("default", { month: "short" }));
        }
        return labels;
    };

    const labels = getLastFourMonths();

    const generatePath = (dataPoints) => {
        let path = `M0,${40 - dataPoints[0]}`;
        for (let i = 1; i < dataPoints.length; i++) {
            const x = (100 / (dataPoints.length - 1)) * i;
            const y = 40 - dataPoints[i];
            path += ` T${x},${y}`;
        }
        return path;
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-4 relative overflow-hidden w-full">
            <h3 className="font-semibold text-sm mb-2 text-center">
                Skin satisfaction
            </h3>

            <div className="relative h-40 w-full">
                {/* Background bars */}
                <div className="absolute inset-0 flex gap-[2px] justify-between px-1">
                    {data.map((_, idx) => (
                        <div
                            key={idx}
                            className="flex-1 bg-gradient-to-b from-[#f4f4f5] to-[#bfc3e0] h-full rounded-sm"
                        />
                    ))}
                </div>

                {/* SVG Line Path */}
                <svg
                    viewBox="0 0 100 40"
                    preserveAspectRatio="none"
                    className="absolute inset-0 w-full h-full"
                >
                    <path
                        d={generatePath(data)}
                        fill="none"
                        stroke="#1f1f3f"
                        strokeWidth="1.5"
                    />
                    <circle
                        cx="100"
                        cy={40 - data[data.length - 1]}
                        r="1.8"
                        fill="#1f1f3f"
                    />
                </svg>

                {/* Value label */}
                <div className="absolute top-3 right-[5%] text-xs font-bold text-gray-800">
                    {latestValue}
                </div>

                {/* Month labels */}
                <div className="absolute bottom-2 left-0 w-full flex justify-between px-2 text-[10px] text-gray-400">
                    {labels.map((label, idx) => (
                        <span key={idx}>{label}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SkinSatisfactionChart;
