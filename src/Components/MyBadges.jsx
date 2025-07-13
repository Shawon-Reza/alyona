import React from 'react'

const MyBadges = () => {
    const badges = [
        "Level 3",
        "3 days streak",
        "My first review",
        "You’ve tried 3 cleansers",
        "My first product",
        "Mask lover",
        "Mask lover",
        "Mask lover",
    ];
    return (

        <div className="">
            <h2 className="text-base font-semibold text-gray-800 mb-3">My Badges</h2>
            <div className="flex overflow-x-auto space-x-3 pb-2">
                {[
                    { label: "Level 3", icon: "🧠", color: "text-gray-900", bg: "bg-white" },
                    { label: "3 days streak", icon: "🔥", color: "text-violet-600", bg: "bg-white" },
                    { label: "My first review", icon: "🏅", color: "text-teal-600", bg: "bg-white" },
                    { label: "You’ve tried 3 cleansers", icon: "🧴", color: "text-amber-700", bg: "bg-white" },
                    { label: "My first product", icon: "🏠", color: "text-violet-600", bg: "bg-white" },
                    ...Array(3).fill({ label: "Mask lover", icon: "💖", color: "text-amber-400", bg: "bg-[#fcf9f6]" }),
                ].map((badge, i) => (
                    <div
                        key={i}
                        className={`min-w-[120px] flex flex-col items-center justify-center p-3 rounded-xl border-base-300 bg-white shadow-sm ${badge.bg}`}
                    >
                        <div className={`text-2xl mb-1 ${badge.color}`}>{badge.icon}</div>
                        <div className="text-xs font-medium text-center text-gray-800">{badge.label}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyBadges