"use client"
import { Download } from 'lucide-react'

const userData = {
    id: "77-80-0001-2025-05-0",
    name: "Janet Arias",
    age: 28,
    location: "Nantes, France",
    subscription: "LUXURY",
    creationDate: "09-05-2025 02:45",
    gender: "Female",
    lastLogin: "12-06-2025 12:45",
    lifestyle: "Under a lot of stress; mostly night life — I love to go out",
    habits: "Vegan",
    dieta: "",
    actividad: "",
    pregnancy: "No",
    paymentHistory: [
        {
            id: 1,
            subscriptionPlan: "Premium",
            paymentDate: "15/06/2025",
            total: "$7",
        },
        {
            id: 2,
            subscriptionPlan: "Free",
            paymentDate: "15/06/2025",
            total: "$0",
        },
    ],
}

export default function ProfileContent() {
    const handleDownloadQuiz = () => {
        console.log("Download user quiz clicked")
    }

    return (
        <div className="px-4 md:px-0">
            {/* General Section */}
            <div className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">General</h2>
                
                {/* Mobile: Single column, Desktop: Two columns */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-0">
                        {/* ID */}
                        <div className="flex flex-col sm:flex-row sm:justify-between py-3 md:py-2 border-b border-gray-100">
                            <span className="font-medium text-gray-700 text-sm md:text-base mb-1 sm:mb-0 sm:w-1/3 lg:w-1/4">ID</span>
                            <span className="text-[#5B5B5B] text-sm md:text-base break-all sm:w-2/3 lg:w-3/4">{userData.id}</span>
                        </div>
                        {/* Age */}
                        <div className="flex flex-col sm:flex-row sm:justify-between py-3 md:py-2 border-b border-gray-100">
                            <span className="font-medium text-gray-700 text-sm md:text-base mb-1 sm:mb-0 sm:w-1/3 lg:w-1/4">Age</span>
                            <span className="text-[#5B5B5B] text-sm md:text-base sm:w-2/3 lg:w-3/4">{userData.age}</span>
                        </div>
                        {/* Location */}
                        <div className="flex flex-col sm:flex-row sm:justify-between py-3 md:py-2 border-b border-gray-100">
                            <span className="font-medium text-gray-700 text-sm md:text-base mb-1 sm:mb-0 sm:w-1/3 lg:w-1/4">Location</span>
                            <span className="text-[#5B5B5B] text-sm md:text-base sm:w-2/3 lg:w-3/4">{userData.location}</span>
                        </div>
                        {/* Subscription */}
                        <div className="flex flex-col sm:flex-row sm:justify-between py-3 md:py-2 border-b border-gray-100">
                            <span className="font-medium text-gray-700 text-sm md:text-base mb-1 sm:mb-0 sm:w-1/3 lg:w-1/4">Subscription</span>
                            <span className="text-[#5B5B5B] text-sm md:text-base sm:w-2/3 lg:w-3/4">
                                <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs md:text-sm font-medium">
                                    {userData.subscription}
                                </span>
                            </span>
                        </div>
                    </div>
                    
                    <div className="space-y-0 mt-4 lg:mt-0">
                        {/* Creation Date */}
                        <div className="flex flex-col sm:flex-row sm:justify-between py-3 md:py-2 border-b border-gray-100">
                            <span className="font-medium text-gray-700 text-sm md:text-base mb-1 sm:mb-0 sm:w-1/3 lg:w-1/4">Creation date</span>
                            <span className="text-[#5B5B5B] text-sm md:text-base sm:w-2/3 lg:w-3/4">{userData.creationDate}</span>
                        </div>
                        {/* Gender */}
                        <div className="flex flex-col sm:flex-row sm:justify-between py-3 md:py-2 border-b border-gray-100">
                            <span className="font-medium text-gray-700 text-sm md:text-base mb-1 sm:mb-0 sm:w-1/3 lg:w-1/4">Gender</span>
                            <span className="text-[#5B5B5B] text-sm md:text-base sm:w-2/3 lg:w-3/4">{userData.gender}</span>
                        </div>
                        {/* Last Login */}
                        <div className="flex flex-col sm:flex-row sm:justify-between py-3 md:py-2 border-b border-gray-100">
                            <span className="font-medium text-gray-700 text-sm md:text-base mb-1 sm:mb-0 sm:w-1/3 lg:w-1/4">Last login</span>
                            <span className="text-[#5B5B5B] text-sm md:text-base sm:w-2/3 lg:w-3/4">{userData.lastLogin}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Section */}
            <div className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl border-b-2 border-base-300 text-[#5B5B5B] mb-4 md:mb-6 pb-2">PROFILE</h2>
                <div className="space-y-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between py-3 md:py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700 text-sm md:text-base mb-1 sm:mb-0 sm:w-1/4">Lifestyle</span>
                        <span className="text-[#5B5B5B] text-sm md:text-base sm:w-3/4">{userData.lifestyle}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between py-3 md:py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700 text-sm md:text-base mb-1 sm:mb-0 sm:w-1/4">Habits</span>
                        <span className="text-[#5B5B5B] text-sm md:text-base sm:w-3/4">{userData.habits}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between py-3 md:py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700 text-sm md:text-base mb-1 sm:mb-0 sm:w-1/4">Dieta</span>
                        <span className="text-[#5B5B5B] text-sm md:text-base sm:w-3/4">{userData.dieta || "-"}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between py-3 md:py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700 text-sm md:text-base mb-1 sm:mb-0 sm:w-1/4">Actividad</span>
                        <span className="text-[#5B5B5B] text-sm md:text-base sm:w-3/4">{userData.actividad || "-"}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between py-3 md:py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700 text-sm md:text-base mb-1 sm:mb-0 sm:w-1/4">Pregnancy</span>
                        <span className="text-[#5B5B5B] text-sm md:text-base sm:w-3/4">{userData.pregnancy}</span>
                    </div>
                </div>
            </div>

            {/* Payment History Section */}
            <div className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl border-b-2 border-base-300 text-[#5B5B5B] mb-4 md:mb-6 pb-2">Payment History</h2>
                
                {/* Mobile: Card Layout, Desktop: Table Layout */}
                <div className="md:hidden space-y-3">
                    {userData.paymentHistory.map((payment) => (
                        <div key={payment.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium text-gray-700 text-sm">Plan</span>
                                    <span className="text-gray-900 text-sm font-medium">{payment.subscriptionPlan}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-medium text-gray-700 text-sm">Date</span>
                                    <span className="text-gray-900 text-sm">{payment.paymentDate}</span>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                                    <span className="font-medium text-gray-700 text-sm">Total</span>
                                    <span className="text-gray-900 text-sm font-semibold">{payment.total}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop: Table Layout */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full table-auto bg-white rounded-xl shadow-lg">
                        <thead className="bg-[#f8f8f8] rounded-t-xl">
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-medium text-gray-700">Subscription Plan</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-700">Payment Date</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-700">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData.paymentHistory.map((payment) => (
                                <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all duration-200">
                                    <td className="py-3 px-4 text-gray-900">{payment.subscriptionPlan}</td>
                                    <td className="py-3 px-4 text-gray-900">{payment.paymentDate}</td>
                                    <td className="py-3 px-4 text-gray-900">{payment.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Download Button */}
            <div className="flex justify-center md:justify-end">
                <button
                    onClick={handleDownloadQuiz}
                    className="flex items-center px-4 md:px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold cursor-pointer text-sm md:text-base w-full md:w-auto justify-center md:justify-start"
                >
                    Download user quiz
                    <Download className="w-4 h-4 ml-2" />
                </button>
            </div>
        </div>
    )
}