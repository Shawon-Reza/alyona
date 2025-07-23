"use client"

import { Download } from "lucide-react"


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
        <div className="">
            {/* General Section */}
            <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">General</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="">
                        {/* ID */}
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="font-medium text-gray-700 w-1/4">ID</span>
                            <span className="text-[#5B5B5B] w-3/4">{userData.id}</span>
                        </div>

                        {/* Age */}
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="font-medium text-gray-700 w-1/4">Age</span>
                            <span className="text-[#5B5B5B] w-3/4">{userData.age}</span>
                        </div>

                        {/* Location */}
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="font-medium text-gray-700 w-1/4">Location</span>
                            <span className="text-[#5B5B5B] w-3/4">{userData.location}</span>
                        </div>

                        {/* Subscription */}
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="font-medium text-gray-700 w-1/4">Subscription</span>
                            <span className="text-[#5B5B5B] w-3/4">{userData.subscription}</span>
                        </div>
                    </div>

                    <div className="">
                        {/* Creation Date */}
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="font-medium text-gray-700 w-1/4">{/* 1/4 width for label */}Creation date</span>
                            <span className="text-[#5B5B5B] w-3/4">{/* 3/4 width for value */}{userData.creationDate}</span>
                        </div>

                        {/* Gender */}
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="font-medium text-gray-700 w-1/4">{/* 1/4 width for label */}Gender</span>
                            <span className="text-[#5B5B5B] w-3/4">{/* 3/4 width for value */}{userData.gender}</span>
                        </div>

                        {/* Last Login */}
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="font-medium text-gray-700 w-1/4">{/* 1/4 width for label */}Last login</span>
                            <span className="text-[#5B5B5B] w-3/4">{/* 3/4 width for value */}{userData.lastLogin}</span>
                        </div>
                    </div>

                </div>
            </div>

            {/* Profile Section */}
            <div className="mb-4">
                <h2 className="text-lg border-b-2 border-base-300 text-[#5B5B5B] mb-4">PROFILE</h2>
                <div className="">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700 w-1/4">Lifestyle</span>
                        <span className="text-[#5B5B5B]  w-3/4">{userData.lifestyle}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700 w-1/4">Habits</span>
                        <span className="text-[#5B5B5B] w-3/4">{userData.habits}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700 w-1/4">Dieta</span>
                        <span className="text-[#5B5B5B] w-3/4">{userData.dieta || "-"}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700 w-1/4">Actividad</span>
                        <span className="text-[#5B5B5B] w-3/4">{userData.actividad || "-"}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700 w-1/4">Pregnancy</span>
                        <span className="text-[#5B5B5B] w-3/4">{userData.pregnancy}</span>
                    </div>
                </div>

            </div>

            {/* Payment History Section */}
            <div className="mb-6">
                <h2 className="text-lg  border-b-2 border-base-300 text-[#5B5B5B] mb-5">Payment History</h2>
                <div className="overflow-x-auto">
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
            <div className="flex justify-end">
                <button
                    onClick={handleDownloadQuiz}
                    className="flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold cursor-pointer"
                >
                    Download user quiz
                    <Download className="w-4 h-4 ml-2" />
                </button>
            </div>
        </div>
    )
}
