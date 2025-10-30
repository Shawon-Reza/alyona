"use client"

import { Diamond, Star, Heart, Filter, Download, ChevronDown } from "lucide-react"
import { useState } from "react"
import { BorderBeam } from "../magicui/border-beam"
import { useQuery } from "@tanstack/react-query"
import axiosApi from "@/api/axiosApi"
import { IoDiamondOutline } from "react-icons/io5"

export default function SubscribersBySubscription() {
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState("All Plans")

    // Fetch subscribers data from the API
    const { isPending: subscribers_loading, error: subscribers_error, data: subscribers } = useQuery({
        queryKey: ['subscribers'],
        queryFn: async () => {
            const res = await axiosApi.get('/admin_panel/api/v1/subscription-stat')
            return res.data
        }
    })

    console.log(subscribers)

    // Format the subscriber numbers (e.g., 1,000 -> 1k)
    const formatNumber = (num) => {
        if (num === null || num === undefined) return "n/a";
        if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
        if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
        return num.toString();
    };

    // Subscription data with dynamic icons (component references)
    const subscriptionData = [
        {
            name: "Luxury Plan",
            subscribers: formatNumber(subscribers?.luxury),
            icon: IoDiamondOutline, // Reference to the component (not JSX element)
            iconColor: "text-purple-500",
            bgColor: "bg-purple-50",
        },
        {
            name: "Premium Plan",
            subscribers: formatNumber(subscribers?.premium),
            icon: Star, // Reference to the component (not JSX element)
            iconColor: "text-pink-500",
            bgColor: "bg-pink-50",
        },
        {
            name: "Free Plan",
            subscribers: formatNumber(subscribers?.free),
            icon: Heart, // Reference to the component (not JSX element)
            iconColor: "text-gray-500",
            bgColor: "bg-gray-50",
        },
    ];

    // Filter options for the dropdown
    const filterOptions = ["All Plans", "Luxury Plan", "Premium Plan", "Free Plan"]

    // Handle filter selection
    const handleFilterSelect = (option) => {
        setSelectedFilter(option)
        setIsFilterOpen(false)
    }

    return (
        <div className="w-full mx-auto p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <h2 className="text-lg font-semibold text-gray-900">Subscribers by Subscription Type</h2>

                {/* <div className="flex items-center gap-3">
                   
                    <div className="relative">
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 cursor-pointer text-sm text-gray-700 transition-colors"
                        >
                            <Filter className="w-4 h-4" />
                            Filter
                            <ChevronDown className="w-4 h-4" />
                        </button>

                        {isFilterOpen && (
                            <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[150px]">
                                {filterOptions.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => handleFilterSelect(option)}
                                        className={`block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors ${selectedFilter === option ? "bg-gray-50" : ""}`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                 
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium transition-colors">
                        Download data
                        <Download className="w-4 h-4" />
                    </button>
                </div> */}

                

            </div>

            {/* Loading State */}
            {subscribers_loading ? (
                <div className="text-center py-10">
                    <p className="text-lg text-gray-600">Loading...</p>
                </div>
            ) : (
                // Subscription Cards
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {subscriptionData.map((plan, index) => {
                        const IconComponent = plan.icon; // Assign component here
                        return (
                            <div
                                key={index}
                                className="border border-gray-200 rounded-xl p-6 bg-white/50 shadow-lg transition-all duration-300 ease-out hover:shadow-xl relative cursor-pointer hover:scale-103"
                            >
                                <BorderBeam
                                    duration={15}
                                    size={500}
                                    reverse
                                />
                                <div className="flex items-center gap-5">
                                    <div className={`p-2 rounded-lg ${plan.bgColor}`}>
                                        <IconComponent className={`w-7 h-7 ${plan.iconColor}`} />
                                    </div>
                                    <div>
                                        <p className="text-xl font-bold text-gray-600 mb-1">{plan.name}</p>
                                        <p className="text-lg text-gray-900">{plan.subscribers}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

            {/* Click outside to close dropdown */}
            {isFilterOpen && <div className="fixed inset-0 z-5" onClick={() => setIsFilterOpen(false)} />}
        </div>
    )
}
