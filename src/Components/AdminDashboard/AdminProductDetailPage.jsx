"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown, ChevronLeft } from "lucide-react"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    PieChart,
    Pie,
    Cell,
} from "recharts"

const productData = {
    id: "YB0001",
    name: "Hydrating Toner",
    image: "/placeholder.svg?height=60&width=60",
    status: "Available",
    insights: {
        avgSatisfaction: 87,
        amountOfUsers: 12324,
        avgRating: 4.9,
        ratingCount: 25,
        skinConcerns: "Top choice for acne-prone skin",
        skinTypePreferences: "Most popular among oily skin users or Highly rated by dry skin customers",
    },
    details: {
        id: "YB0001",
        category: "Skincare",
        pregnancySafe: "Yes",
        brand: "Yourself beauty",
        productType: "Toner",
        concerns: "Dullness, Dehydratation",
        skinType: "all, dry, sensibly, oily",
        features: "Hydratating",
        ingredients: "ingredients",
        texture: "Liquid",
        inci: "Leaf Juice, Glycerin",
        natural: "99%",
        organic: "61%",
        priceRange: "$$$",
        fragrance: "yes",
        fragranceNotes: "floral",
        productUrl: "WWW.YB.COM/LINK",
    },
}

const statusOptions = ["Available", "Not available", "Discontinued", "Out of stock"]

const ageData = [
    { age: "15-24", female: 3512, male: 2000 },
    { age: "25-34", female: 5800, male: 2500 },
    { age: "35-44", female: 4000, male: 800 },
    { age: "45-54", female: 1500, male: 500 },
    { age: "55+", female: 1200, male: 800 },
]

const demographicsData = [
    { name: "Female", value: 6000, color: "#ec4899" },
    { name: "Male", value: 3000, color: "#3b82f6" },
    { name: "No defined", value: 3000, color: "#e5e7eb" },
]

const topCountries = [
    { country: "France", users: "2K", percentage: 80 },
    { country: "Germany", users: "1.5K", percentage: 60 },
    { country: "Switzerland", users: "120", percentage: 20 },
    { country: "Italy", users: "12", percentage: 5 },
    { country: "Others", users: "2", percentage: 2 },
]

export default function AdminProductDetailPage() {
    const [currentStatus, setCurrentStatus] = useState(productData.status)
    const [showStatusDropdown, setShowStatusDropdown] = useState(false)
    const [selectedYear, setSelectedYear] = useState("2025")
    const [selectedMonth, setSelectedMonth] = useState("MAR")

    const handleStatusChange = (newStatus) => {
        setCurrentStatus(newStatus)
        setShowStatusDropdown(false)
    }

    const getStatusClass = (status) => {
        switch (status) {
            case "Available":
                return "bg-green-100 text-green-800"
            case "Not available":
                return "bg-red-100 text-red-800"
            case "Discontinued":
                return "bg-gray-100 text-gray-800"
            case "Out of stock":
                return "bg-yellow-100 text-yellow-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const handleManageReviews = (type) => {
        console.log(`Manage reviews ${type} clicked`)
    }

    return (
        <div className="min-h-screen">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-600 mb-6">
                <span className="cursor-pointer hover:text-gray-900">Product List</span>
                <ChevronRight className="w-4 h-4 mx-2" />
                <span className="text-gray-900">{productData.name}</span>
            </div>

            <div className="">
                {/* Product Header */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <img
                                src={productData.image || "/placeholder.svg"}
                                alt={productData.name}
                                className="w-12 h-12 object-cover mr-4"
                            />
                            <h1 className="text-2xl font-semibold text-gray-900">{productData.name}</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => handleManageReviews("primary")}
                                className="px-4 py-2 bg-indigo-900 text-white rounded-lg hover:bg-indigo-800 transition-colors"
                            >
                                Manage reviews
                            </button>
                            <button
                                onClick={() => handleManageReviews("secondary")}
                                className="px-4 py-2 bg-indigo-900 text-white rounded-lg hover:bg-indigo-800 transition-colors"
                            >
                                Manage reviews
                            </button>
                            <div className="relative">
                                <button
                                    onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
                                        currentStatus,
                                    )}`}
                                >
                                    {currentStatus}
                                    <ChevronDown className="w-4 h-4 ml-1" />
                                </button>
                                {showStatusDropdown && (
                                    <div className="absolute right-0 top-full mt-2 py-2 bg-white rounded-lg shadow-lg border z-10 min-w-[150px]">
                                        {statusOptions.map((status) => (
                                            <button
                                                key={status}
                                                onClick={() => handleStatusChange(status)}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Insights */}
                <div className="px-6 py-2 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Product insights (Based on collected data)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <div className="text-sm font-medium text-gray-700 mb-1">Avg satisfaction level</div>
                            <div className="text-2xl font-bold text-gray-900">{productData.insights.avgSatisfaction}%</div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-700 mb-1">Amount of users</div>
                            <div className="text-2xl font-bold text-gray-900">
                                {productData.insights.amountOfUsers.toLocaleString()}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-700 mb-1">Avg rating</div>
                            <div className="text-2xl font-bold text-gray-900">
                                {productData.insights.avgRating} ({productData.insights.ratingCount})
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <div className="text-sm font-medium text-gray-700 mb-1">Skin concerns</div>
                            <div className="text-gray-900">{productData.insights.skinConcerns}</div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-700 mb-1">Skin Type Preferences</div>
                            <div className="text-gray-900">{productData.insights.skinTypePreferences}</div>
                        </div>
                    </div>
                </div>

                {/* Product Data */}
                <div className="px-6 py-3">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">product data</h2>
                    <div className="">
                        <div className="">
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="font-medium text-gray-700 w-[10%] text-left">ID</span>
                                <span className="text-gray-900 w-[90%]">{productData.details.id}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="font-medium text-gray-700 w-[10%] text-left">Category</span>
                                <span className="text-gray-900 w-[90%]">{productData.details.category}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="font-medium text-gray-700 w-[10%] text-left">Pregnancy Safe</span>
                                <span className="text-gray-900 w-[90%]">{productData.details.pregnancySafe}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="font-medium text-gray-700 w-[10%] text-left">Brand</span>
                                <span className="text-gray-900 w-[90%]">{productData.details.brand}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="font-medium text-gray-700 w-[10%] text-left">Product type</span>
                                <span className="text-gray-900 w-[90%]">{productData.details.productType}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="font-medium text-gray-700 w-[10%] text-left">Concerns</span>
                                <span className="text-gray-900 w-[90%]">{productData.details.concerns}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="font-medium text-gray-700 w-[10%] text-left">Skin type</span>
                                <span className="text-gray-900 w-[90%]">{productData.details.skinType}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="font-medium text-gray-700 w-[10%] text-left">Features</span>
                                <span className="text-gray-900 w-[90%]">{productData.details.features}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="font-medium text-gray-700 w-[10%] text-left">Ingredients</span>
                                <span className="text-gray-900 w-[90%]">{productData.details.ingredients}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="font-medium text-gray-700 w-[10%] text-left">Texture</span>
                                <span className="text-gray-900 w-[90%]">{productData.details.texture}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="font-medium text-gray-700 w-[10%] text-left">INCI</span>
                                <span className="text-gray-900 w-[90%]">{productData.details.inci}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="font-medium text-gray-700 w-[10%] text-left">Natural</span>
                                <span className="text-gray-900 w-[90%]">{productData.details.natural}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="font-medium text-gray-700 w-[10%] text-left">Organic</span>
                                <span className="text-gray-900 w-[90%]">{productData.details.organic}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="font-medium text-gray-700 w-[10%] text-left">Price range</span>
                                <span className="text-gray-900 w-[90%]">{productData.details.priceRange}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="font-medium text-gray-700 w-[10%] text-left">Fragrance</span>
                                <span className="text-gray-900 w-[90%]">{productData.details.fragrance}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="font-medium text-gray-700 w-[10%] text-left">Fragrance notes</span>
                                <span className="text-gray-900 w-[90%]">{productData.details.fragranceNotes}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="font-medium text-gray-700 w-[10%] text-left">Product URL</span>
                                <span className="text-blue-600 hover:text-blue-800 cursor-pointer w-[90%]">
                                    {productData.details.productUrl}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="px-6 py-2 border-t border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">stats</h2>
                    <div className="text-gray-500">
                        <p>Additional statistics and analytics will be displayed here.</p>
                    </div>
                </div>

                {/* Analytics Section */}
                <div className="p-6 border-t border-gray-200">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Total users vs age Chart */}
                        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg shadow-sm">
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Total users vs age</h3>
                                    <div className="flex items-center gap-2">
                                        <button className="p-1 hover:bg-gray-100 rounded">
                                            <ChevronLeft className="w-4 h-4" />
                                        </button>
                                        <select
                                            value={selectedYear}
                                            onChange={(e) => setSelectedYear(e.target.value)}
                                            className="text-sm border border-gray-300 rounded px-3 py-1"
                                        >
                                            <option value="2025">2025</option>
                                            <option value="2024">2024</option>
                                            <option value="2023">2023</option>
                                        </select>
                                        <button className="p-1 hover:bg-gray-100 rounded">
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <ResponsiveContainer width="100%" height={200}>
                                    <BarChart data={ageData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="age" axisLine={false} tickLine={false} />
                                        <YAxis axisLine={false} tickLine={false} />
                                        <Tooltip />
                                        <Legend
                                            verticalAlign="top"
                                            align="right"
                                            wrapperStyle={{ top: -20, right: 0 }}
                                            formatter={(value) => <span className="text-sm font-medium text-gray-600">{value}</span>}
                                        />
                                        <Bar dataKey="female" fill="#db2777" barSize={16} />
                                        <Bar dataKey="male" fill="#2563eb" barSize={16} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Demographics Chart */}
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Demographics</h3>
                                <ResponsiveContainer width="100%" height={200}>
                                    <PieChart>
                                        <Pie
                                            data={demographicsData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={90}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {demographicsData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="space-y-2 text-sm">
                                    {demographicsData.map((entry, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded" style={{ backgroundColor: entry.color }}></div>
                                                <span>{entry.name}</span>
                                            </div>
                                            <span className="font-medium">{Math.round((entry.value / 12000) * 100)}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Top Countries */}
                    <div className="mt-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Top Countries</h3>
                                <div className="flex items-center gap-2">
                                    <button className="p-1 hover:bg-gray-100 rounded">
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <select
                                        value={selectedMonth}
                                        onChange={(e) => setSelectedMonth(e.target.value)}
                                        className="text-sm border border-gray-300 rounded px-2 py-1"
                                    >
                                        <option value="MAR">MAR</option>
                                        <option value="APR">APR</option>
                                        <option value="MAY">MAY</option>
                                    </select>
                                    <button className="p-1 hover:bg-gray-100 rounded">
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                {topCountries.map((country, index) => (
                                    <div key={index} className="text-center">
                                        <div className="text-sm font-medium text-gray-900 mb-1">{country.country}</div>
                                        <div className="text-lg font-bold text-gray-900 mb-2">{country.users}</div>
                                        <div className="w-full h-2 bg-gray-200 rounded-full">
                                            <div className="h-full bg-purple-500 rounded-full" style={{ width: `${country.percentage}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="p-6 border-t border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Reviews</h2>
                    <div className="overflow-x-auto bg-white">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                                        <div className="flex items-center">
                                            Date
                                            <ChevronDown className="ml-1 h-4 w-4" />
                                        </div>
                                    </th>
                                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                                        <div className="flex items-center">
                                            User
                                            <ChevronDown className="ml-1 h-4 w-4" />
                                        </div>
                                    </th>
                                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                                        <div className="flex items-center">
                                            Rating
                                            <ChevronDown className="ml-1 h-4 w-4" />
                                        </div>
                                    </th>
                                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                                        <div className="flex items-center">
                                            Comments
                                            <ChevronDown className="ml-1 h-4 w-4" />
                                        </div>
                                    </th>
                                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                                        <div className="flex items-center">
                                            Actions
                                            <ChevronDown className="ml-1 h-4 w-4" />
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {[
                                    {
                                        date: "05-10-2025 11:15",
                                        user: "Carlos Ramirez",
                                        rating: "5.0",
                                        comment:
                                            "The combination of ingredients is impressive! My skin feels so hydrated and refreshed after using it.",
                                    },
                                    {
                                        date: "06-05-2025 16:40",
                                        user: "Emma Thompson",
                                        rating: "5.0",
                                        comment:
                                            "This product smells amazing and leaves my skin feeling soft and smooth. Definitely a must-try!",
                                    },
                                    {
                                        date: "03-25-2025 09:30",
                                        user: "David Lee",
                                        rating: "5.0",
                                        comment:
                                            "I noticed a significant improvement in my skin's texture after using this. It's become a staple in my routine!",
                                    },
                                    {
                                        date: "04-15-2025 12:00",
                                        user: "Sophia Patel",
                                        rating: "5.0",
                                        comment: "Great product! It really helps with my skin's hydration and gives it a nice glow.",
                                    },
                                    {
                                        date: "05-20-2025 14:15",
                                        user: "Michael Chen",
                                        rating: "5.0",
                                        comment:
                                            "I love how lightweight this feels on my skin. It absorbs quickly and doesn't leave any greasy residue.",
                                    },
                                    {
                                        date: "06-30-2025 12:00",
                                        user: "Olivia Martinez",
                                        rating: "5.0",
                                        comment: "This has become my go-to moisturizer. My skin feels plump and rejuvenated!",
                                    },
                                    {
                                        date: "03-30-2025 08:30",
                                        user: "James Smith",
                                        rating: "5.0",
                                        comment: "I appreciate the natural ingredients. My skin has never felt better!",
                                    },
                                    {
                                        date: "04-10-2025 15:00",
                                        user: "Isabella Brown",
                                        rating: "5.0",
                                        comment: "This product is fantastic! It has helped reduce my breakouts and even out my skin tone.",
                                    },
                                ].map((review, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="py-3 px-4 text-sm text-gray-900">{review.date}</td>
                                        <td className="py-3 px-4 text-sm text-gray-900">{review.user}</td>
                                        <td className="py-3 px-4 text-sm text-gray-900">{review.rating}</td>
                                        <td className="py-3 px-4 text-sm text-gray-900 max-w-md">
                                            <div className="truncate" title={review.comment}>
                                                {review.comment}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-900">
                                            <button
                                                className="text-gray-400 hover:text-red-600 transition-colors"
                                                onClick={() => console.log(`Delete review from ${review.user}`)}
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-4 pt-4">
                        <div className="text-sm text-gray-700">1 to 20 of 25</div>
                        <div className="flex items-center space-x-2">
                            <button className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50" disabled>
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                                    />
                                </svg>
                            </button>
                            <button className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50" disabled>
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <span className="text-sm px-2">Page 1 of 2</span>
                            <button className="p-1 rounded-md hover:bg-gray-100">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                            <button className="p-1 rounded-md hover:bg-gray-100">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
