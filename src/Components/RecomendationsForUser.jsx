import React from 'react'

const RecomendationsForUser = () => {
    return (
        <div>
            {/* Recommendations */}
            <div className="bg-white rounded-xl shadow-md p-5">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <span className="text-indigo-700 text-xl">📄</span>
                        <p className="font-bold text-xl ">Recomendations</p>
                    </div>
                    <span className="text-indigo-700 text-xl">▾</span>
                </div>

                <div className="text-sm text-[#5B5B5B] space-y-4">
                    <div>
                        <p className="font-semibold">Weekly Care Tips:</p>
                        <ul className="list-disc list-inside text-[#5B5B5B]">
                            <li>Gentle exfoliation (1–2 times per week)</li>
                            <li>Hydrating mask (once per week)</li>
                        </ul>
                    </div>

                    <div>
                        <p className="font-semibold">Key Focus Areas:</p>
                        <ul className="list-disc list-inside text-[#5B5B5B]">
                            <li>Maintain skin's natural balance</li>
                            <li>Prevent early signs of aging</li>
                            <li>Protection from environmental damage</li>
                            <li>Keep skin hydrated</li>
                        </ul>
                    </div>

                    <p className="text-[#5B5B5B]">
                        Track your progress using the app's Skin Tracker feature and adjust your routine based on seasonal changes or specific concerns that may arise.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default RecomendationsForUser