"use client"

import { useState, useMemo } from "react"
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
import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import axiosApi from "@/api/axiosApi"

// ---- Static fallbacks for charts that your API doesn't provide (yet)
const ageData = [
    { age: "15-24", female: 3512, male: 2000 },
    { age: "25-34", female: 5800, male: 2500 },
    { age: "35-44", female: 4000, male: 800 },
    { age: "45-54", female: 1500, male: 500 },
    { age: "55+", female: 1200, male: 800 },
]

const statusOptions = ["Available", "Not available", "Discontinued", "Out of stock"]

const topCountriesFallback = [
    { country: "France", users: "2K", percentage: 80 },
    { country: "Germany", users: "1.5K", percentage: 60 },
    { country: "Switzerland", users: "120", percentage: 20 },
    { country: "Italy", users: "12", percentage: 5 },
    { country: "Others", users: "2", percentage: 2 },
]

export default function AdminProductDetailPage() {
    const navigate = useNavigate()
    const [currentStatus, setCurrentStatus] = useState("Available")
    const [showStatusDropdown, setShowStatusDropdown] = useState(false)
    const [selectedYear, setSelectedYear] = useState("2025")
    const [selectedMonth, setSelectedMonth] = useState("MAR")

    const { id } = useParams()

    const {
        isPending: productSpecificDetailsLoading,
        error: productSpecificDetailsError,
        data: productSpecificDetails,
    } = useQuery({
        queryKey: ["productSpecificDetails", id],
        enabled: !!id,
        queryFn: async () => {
            const res = await axiosApi.get(`/admin_panel/api/v1/product-detail-stat/${id}`)
            return res.data
        },
    })
    console.log(productSpecificDetails)
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

    // ----- Derived UI values & safe fallbacks
    const productName = productSpecificDetails?.productName ?? "—"
    const imageUrl = productSpecificDetails?.image_url ?? "/placeholder.svg"
    const productId = productSpecificDetails?.productId ?? "—"
    const category = productSpecificDetails?.category ?? "Empty"
    const brand = productSpecificDetails?.brand ?? "—"
    const pregnancySafe = productSpecificDetails?.pregnancy_safe === true ? "Yes" : "No"
    const priceRange = productSpecificDetails?.priceRange ?? "—"
    const fragranceNotes = Array.isArray(productSpecificDetails?.fragrance_notes)
        ? productSpecificDetails.fragrance_notes.join(", ")
        : "—"
    const fragrance = productSpecificDetails?.fragranceFree === true ? "No (fragrance-free)" : "Yes"
    const natural = productSpecificDetails?.natural ?? "—"
    const organic = productSpecificDetails?.organic ?? "—"
    const productUrl = productSpecificDetails?.product_url ?? "—"
    const texture = Array.isArray(productSpecificDetails?.texture) ? productSpecificDetails.texture.join(", ") : "—"
    const concerns = Array.isArray(productSpecificDetails?.concerns) ? productSpecificDetails.concerns.join(", ") : "—"
    const skinTypes = Array.isArray(productSpecificDetails?.skin_types)
        ? productSpecificDetails.skin_types.join(", ")
        : "—"
    const features = Array.isArray(productSpecificDetails?.features) ? productSpecificDetails.features.join(", ") : "—"
    const ingredients = Array.isArray(productSpecificDetails?.ingredients)
        ? productSpecificDetails.ingredients.join(", ")
        : "—"
    const inci = Array.isArray(productSpecificDetails?.incl) ? productSpecificDetails.incl.join(", ") : "—"

    const amountOfUsers = productSpecificDetails?.amount_of_users ?? 0
    const avgRatings =
        typeof productSpecificDetails?.avg_ratings === "number"
            ? Number(productSpecificDetails.avg_ratings.toFixed(1))
            : 0
    const ratingCount = Array.isArray(productSpecificDetails?.reviews) ? productSpecificDetails.reviews.length : 0

    const avgSatisfactionDisplay =
        typeof productSpecificDetails?.avg_satisfaction === "number"
            ? `${productSpecificDetails.avg_satisfaction}%`
            : productSpecificDetails?.avg_satisfaction ?? "—"

    const skinConcernsText = Array.isArray(productSpecificDetails?.skin_concerns)
        ? productSpecificDetails.skin_concerns.join(", ")
        : concerns

    const skinTypePreferencesText = useMemo(() => {
        const reported = Array.isArray(productSpecificDetails?.user_skin_types)
            ? productSpecificDetails.user_skin_types.join(", ")
            : ""
        const available = Array.isArray(productSpecificDetails?.skin_types)
            ? productSpecificDetails.skin_types.join(", ")
            : ""
        if (reported && available) return `Users reported: ${reported} • Available types: ${available}`
        if (reported) return `Users reported: ${reported}`
        if (available) return `Available types: ${available}`
        return "—"
    }, [productSpecificDetails])

    // Demographics pie (female/male/undefined)
    const demographics = productSpecificDetails?.demographics ?? {}
    const male = Number(demographics?.male ?? 0)
    const female = Number(demographics?.female ?? 0)
    const known = male + female
    const other = Number(demographics?.other ?? 0)

    const demographicsData = [
        { name: "Female", value: female, color: "#ec4899" },
        { name: "Male", value: male, color: "#3b82f6" },
        { name: "Others", value: other, color: "#e5e7eb" },
    ]
    const demographicsTotal = demographicsData.reduce((s, d) => s + (Number(d.value) || 0), 0)

    // Countries section (no data from API yet, keep fallback)
    const topCountries = topCountriesFallback

    if (productSpecificDetailsLoading) {
        return (
            <div className="p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-1/3" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-96 bg-gray-100 rounded" />
                </div>
            </div>
        )
    }

    if (productSpecificDetailsError) {
        return (
            <div className="p-6 text-red-600">
                Failed to load product details. {String(productSpecificDetailsError)}
            </div>
        )
    }

    
    return (
        <div className="min-h-screen">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-600 mb-6">
                <span
                    onClick={() => navigate("/admindashboard/products")}
                    className="cursor-pointer hover:text-gray-900">Product List</span>
                <ChevronRight className="w-4 h-4 mx-2" />
                <span className="text-gray-900">{productName}</span>
            </div>

            <div>
                {/* Product Header */}
                <div className="p-3 md:p-6 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center">
                            <img
                                src={imageUrl}
                                alt={productName}
                                className="w-10 h-10 md:w-12 md:h-12 object-cover mr-3 md:mr-4 rounded"
                            />
                            <h1 className="text-xl md:text-2xl font-semibold text-gray-900 truncate">{productName}</h1>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 md:gap-4 flex-wrap">
                            <button
                                onClick={() => console.log("Manage reviews primary")}
                                className="flex-1 md:flex-none px-3 md:px-4 py-2 bg-indigo-900 text-white rounded-lg hover:bg-indigo-800 transition-colors text-sm"
                            >
                                Manage reviews
                            </button>
                            <button
                                onClick={() => console.log("Manage reviews secondary")}
                                className="flex-1 md:flex-none px-3 md:px-4 py-2 bg-indigo-900 text-white rounded-lg hover:bg-indigo-800 transition-colors text-sm"
                            >
                                Manage reviews
                            </button>
                            <div className="relative">
                                <button
                                    onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                                    className={`inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium ${getStatusClass(
                                        currentStatus,
                                    )}`}
                                >
                                    {currentStatus}
                                    <ChevronDown className="w-3 h-3 md:w-4 md:h-4 ml-1" />
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
                            <div className="text-2xl font-bold text-gray-900">{avgSatisfactionDisplay}</div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-700 mb-1">Amount of users</div>
                            <div className="text-2xl font-bold text-gray-900">{Number(amountOfUsers).toLocaleString()}</div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-700 mb-1">Avg rating</div>
                            <div className="text-2xl font-bold text-gray-900">
                                {avgRatings} ({ratingCount})
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <div className="text-sm font-medium text-gray-700 mb-1">Skin concerns</div>
                            <div className="text-gray-900">{skinConcernsText}</div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-700 mb-1">Skin Type Preferences</div>
                            <div className="text-gray-900">{skinTypePreferencesText}</div>
                        </div>
                    </div>
                </div>

                {/* Product Data */}
                <div className="px-6 py-3">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Product Data</h2>
                    <div>
                        <div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="font-medium text-gray-700 w-[40%] md:w-[10%] text-left">ID</span>
                                <span className="text-gray-900 w-[60%] md:w-[70%] lg:w-[80%] ">{productId}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="font-medium text-gray-700 w-[40%] md:w-[10%] text-left">Category</span>
                                <span className="text-gray-900 w-[60%] md:w-[70%] lg:w-[80%]">{category}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="font-medium text-gray-700 w-[40%] md:w-[10%] text-left">Pregnancy Safe</span>
                                <span className="text-gray-900 w-[60%] md:w-[70%] lg:w-[80%]">{pregnancySafe}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="font-medium text-gray-700 w-[40%] md:w-[10%] text-left">Brand</span>
                                <span className="text-gray-900 w-[60%] md:w-[70%] lg:w-[80%]">{brand}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="font-medium text-gray-700 w-[40%] md:w-[10%] text-left">Concerns</span>
                                <span className="text-gray-900 w-[60%] md:w-[70%] lg:w-[80%]">{concerns}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="font-medium text-gray-700 w-[40%] md:w-[10%] text-left">Skin type</span>
                                <span className="text-gray-900 w-[60%] md:w-[70%] lg:w-[80%]">{skinTypes}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="font-medium text-gray-700 w-[40%] md:w-[10%] text-left">Features</span>
                                <span className="text-gray-900 w-[60%] md:w-[70%] lg:w-[80%]">{features}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="font-medium text-gray-700 w-[40%] md:w-[10%] text-left">Ingredients</span>
                                <span className="text-gray-900 w-[60%] md:w-[70%] lg:w-[80%]">{ingredients}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="font-medium text-gray-700 w-[40%] md:w-[10%] text-left">Texture</span>
                                <span className="text-gray-900 w-[60%] md:w-[70%] lg:w-[80%]">{texture}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="font-medium text-gray-700 w-[40%] md:w-[10%] text-left">INCI</span>
                                <span className="text-gray-900 w-[60%] md:w-[70%] lg:w-[80%]">{inci}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="font-medium text-gray-700 w-[40%] md:w-[10%] text-left">Natural</span>
                                <span className="text-gray-900 w-[60%] md:w-[70%] lg:w-[80%]">{natural}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="font-medium text-gray-700 w-[40%] md:w-[10%] text-left">Organic</span>
                                <span className="text-gray-900 w-[60%] md:w-[70%] lg:w-[80%]">{organic}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="font-medium text-gray-700 w-[40%] md:w-[10%] text-left">Price range</span>
                                <span className="text-gray-900 w-[60%] md:w-[70%] lg:w-[80%]">{priceRange}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="font-medium text-gray-700 w-[40%] md:w-[10%] text-left">Fragrance</span>
                                <span className="text-gray-900 w-[60%] md:w-[70%] lg:w-[80%]">{fragrance}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="font-medium text-gray-700 w-[40%] md:w-[10%] text-left">Fragrance notes</span>
                                <span className="text-gray-900 w-[60%] md:w-[70%] lg:w-[80%]">{fragranceNotes || "—"}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="font-medium text-gray-700 w-[40%] md:w-[10%] text-left">Product URL</span>
                                <a
                                    className="text-blue-600 hover:text-blue-800 w-[60%] md:w-[70%] truncate"
                                    href={productUrl !== "—" ? productUrl : undefined}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {productUrl}
                                </a>
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
                        {/* Total users vs age Chart (static sample) */}
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

                        {/* Demographics Chart (dynamic) */}
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
                                    {demographicsData.map((entry, index) => {
                                        const pct =
                                            demographicsTotal > 0
                                                ? Math.round((Number(entry.value || 0) / demographicsTotal) * 100)
                                                : 0
                                        return (
                                            <div key={index} className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 rounded" style={{ backgroundColor: entry.color }}></div>
                                                    <span>{entry.name}</span>
                                                </div>
                                                <span className="font-medium">{pct}%</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Top Countries (fallback sample) */}
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
                                            <div
                                                className="h-full bg-purple-500 rounded-full"
                                                style={{ width: `${country.percentage}%` }}
                                            />
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

                    {Array.isArray(productSpecificDetails?.reviews) && productSpecificDetails.reviews.length > 0 ? (
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
                                    {productSpecificDetails.reviews.map((r, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50">
                                            <td className="py-3 px-4 text-sm text-gray-900">{r.created_at.split("T")[0] ?? "—"}</td>
                                            <td className="py-3 px-4 text-sm text-gray-900">{r.user ?? "—"}</td>
                                            <td className="py-3 px-4 text-sm text-gray-900">{r.rating ?? "—"}</td>
                                            <td className="py-3 px-4 text-sm text-gray-900 max-w-md">
                                                <div className="truncate" title={r.comment ?? ""}>
                                                    {r.description ?? "—"}
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-gray-900">
                                                <button
                                                    className="text-gray-400 hover:text-red-600 transition-colors"
                                                    onClick={() => console.log(`Delete review`, r)}
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
                    ) : (
                        <div className="text-sm text-gray-600">No reviews yet.</div>
                    )}

                    {/* Pagination (static placeholder) */}
                    <div className="flex items-center justify-between mt-4 pt-4">
                        <div className="text-sm text-gray-700">1 to 20 of {ratingCount || 0}</div>
                        <div className="flex items-center space-x-2">
                            <button className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50" disabled>
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                                </svg>
                            </button>
                            <button className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50" disabled>
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <span className="text-sm px-2">Page 1 of 1</span>
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
