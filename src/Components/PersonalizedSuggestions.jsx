import React from 'react'
import { useNavigate } from 'react-router-dom'

const PersonalizedSuggestions = ({ data, onShowQuiz }) => {
    console.log(data)
    const navigate = useNavigate();
    return (
        <div className="space-y-10 mt-6">
            {/* Improve your routine */}
            <div className="space-y-4">
                <h1 className="text-xl font-bold">Improve your routine</h1>
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Skincare efficiency */}
                    <div className="bg-white rounded-xl border-base-700 p-4 shadow-sm flex-1 hover:scale-101 transition-transform duration-300 ease-in-out">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-semibold text-purple-600 flex items-center gap-1">
                                    <span>💧</span> Skincare efficiency
                                </p>
                                <p className="text-sm mt-1 text-gray-800">
                                    Would you like us to give you more recommendations to improve it?
                                </p>
                            </div>
                            <span className="text-lg text-gray-400">›</span>
                        </div>
                    </div>

                    {/* Quiz */}
                    <div
                        onClick={() => onShowQuiz && onShowQuiz()}
                        className="bg-white rounded-xl border-base-700 p-4 shadow-sm flex-1 cursor-pointer hover:scale-101 transition-transform duration-300 ease-in-out">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-semibold text-pink-500 flex items-center gap-1">
                                    <span>🧠</span> Quiz
                                </p>
                                <p className="text-sm mt-1 text-gray-800">
                                    Take more quizzes for custom skincare advice
                                </p>
                            </div>
                            <span className="text-lg text-gray-400">›</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* For you */}
            <div className="space-y-4">
                <h1 className="text-xl font-bold -mt-5">For you</h1>
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Mi Daily Routine */}
                    <div
                        onClick={() => {
                            navigate("/tracker/daily-skincare/day")
                        }}
                        className="bg-white border-2 border-base-200  rounded-xl p-4 shadow-lg flex-1 hover:scale-101 transition-transform duration-300 ease-in-out">
                        <div className="flex justify-between items-start ">
                            <div>
                                <p className="text-sm font-semibold text-[#7271E3] flex items-center gap-1">
                                    <span>✨</span> Mi Daily Routine
                                </p>
                                <p className="text-sm font-semibold text-gray-800 mt-1">
                                    Did you do your morning routine?
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Start now and don’t lose your streak
                                </p>
                            </div>
                            <span className="text-lg text-gray-400">›</span>
                        </div>

                        {/* Dotted progress bar */}
                        <div className="flex gap-5 mt-4">
                            {[...Array(2)].map((_, i) => (
                                <div key={i} className="h-1 w-10 rounded-ll bg-violet-500" />
                            ))}
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="h-1 w-10 rounded-full bg-violet-200" />
                            ))}
                        </div>
                    </div>

                    {/* Products */}
                    <div
                        onClick={() => {
                            navigate(`/library/product-detail/${data?.id}`)
                        }}
                        className="bg-white rounded-xl border-base-700 p-4 shadow-sm flex-1 ">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-semibold text-cyan-600 flex items-center gap-1">
                                    <span>📦</span> Products
                                </p>
                                <p className="text-sm mt-1 text-gray-800">New Product added</p>
                                <p className="text-xs text-gray-500">{data?.name}</p>
                            </div>
                            <span className="text-lg text-gray-400">›</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonalizedSuggestions