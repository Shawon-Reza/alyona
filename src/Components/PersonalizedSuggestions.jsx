import React from 'react'
import { useNavigate } from 'react-router-dom'
import { DidYouDoYourRoutine } from './DidYouDoYourRoutine'

const PersonalizedSuggestions = ({ data, onShowQuiz }) => {
    console.log("personaized suggestions data:", data)
    const productData = data[0] || {}
    const routineData = data[1] || {}
    console.log("product data:", productData)
    console.log("routine data:", routineData)
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
                   <div className='bg-white p-2 px-3 rounded-xl'>
                    <DidYouDoYourRoutine data={routineData} />
                   </div>

                    {/* Products */}
                    <div
                        onClick={() => {
                            navigate(`/library/product-detail/${productData?.id}`)
                        }}
                        className="bg-white rounded-xl border-base-700 p-4 shadow-sm flex-1 ">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-semibold text-cyan-600 flex items-center gap-1">
                                    <span>📦</span> Products
                                </p>
                                <p className="text-sm mt-1 text-gray-800">New Product added</p>
                                <p className="text-xs text-gray-500">{productData?.name}</p>
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