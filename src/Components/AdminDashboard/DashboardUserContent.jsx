"use client"
import { useState } from "react"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts"
import { ChevronLeft, ChevronRight, Trash2, Plus } from "lucide-react"

const ageData = [
    { age: "15-24", female: 3512, male: 2000 },
    { age: "25-34", female: 5800, male: 2500 },
    { age: "35-44", female: 4000, male: 800 },
    { age: "45-54", female: 1500, male: 500 },
    { age: "55-",   female: 1200, male: 800 },
]

const skinTypeData = [
    { type: "NORMAL", female: 3512, male: 2000 },
    { type: "COMBO", female: 3000, male: 2200 },
    { type: "DRY", female: 2800, male: 2100 },
    { type: "OILY", female: 800, male: 300 },
    { type: "SENSITIVE", female: 700, male: 250 },
    { type: "ACNE", female: 600, male: 200 },
]

const demographicsData = [
    { name: "Female", value: 8000, color: "#db2777" }, // Pink
    { name: "Male", value: 3000, color: "#2563eb" }, // Blue
    { name: "No defined", value: 3000, color: "#e5e7eb" }, // Light gray
]

const skinConcerns = [
    { concern: "Aging", percentage: "+8%", count: "2321" },
    { concern: "Acne", percentage: "+90%", count: "111" },
    { concern: "Makeup removal", percentage: "-2%", count: "102" },
    { concern: "Dullness", percentage: "-", count: "102" },
    { concern: "Dehydratation", percentage: "-2%", count: "80" },
    { concern: "Dryness", percentage: "-2%", count: "80" },
]

const waitlistRequests = [
    { product: "Product 1", brand: "Brand name", user: "User name" },
    { product: "Product 2", brand: "Brand name", user: "User name" },
    { product: "Product 3", brand: "Brand name", user: "User name" },
    { product: "Product 4", brand: "Brand name", user: "User name" },
]

export default function DashboardUserContent() {
    const [selectedYear, setSelectedYear] = useState("2025")
    const [selectedMonth, setSelectedMonth] = useState("MAR")

    return (
        <div className="p-3 md:p-6 space-y-4 md:space-y-6 min-h-screen text-[#181818]">
            {/* Top Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                {/* Total users vs age Chart */}
                <div className="card bg-white/50 shadow-md border border-base-200">
                    <div className="card-body p-3 md:p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3 sm:gap-0">
                            <h3 className="text-base md:text-lg font-semibold">Total users vs age</h3>
                            <div className="flex items-center gap-2 justify-center sm:justify-end">
                                <button className="btn btn-ghost btn-sm">
                                    <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
                                </button>
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    className="select select-bordered select-sm w-20 md:w-24 text-xs md:text-sm"
                                >
                                    <option value="2025">2025</option>
                                    <option value="2024">2024</option>
                                    <option value="2023">2023</option>
                                </select>
                                <button className="btn btn-ghost btn-sm">
                                    <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                                </button>
                            </div>
                        </div>
                        
                        <ResponsiveContainer width="100%" height={200} className="md:h-[200px]">
                            
                            <BarChart data={ageData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="age" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                <Tooltip />
                                <Legend
                                    verticalAlign="top"
                                    align="right"
                                    wrapperStyle={{ top: -10, right: 0, fontSize: "12px" }}
                                    formatter={(value) => <span className="text-xs md:text-sm font-medium text-gray-600">{value}</span>}
                                />
                                <Bar dataKey="female" fill="#db2777" barSize={16} className="md:barSize-16" />
                                <Bar dataKey="male" fill="#2563eb" barSize={16} className="md:barSize-16" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Skin types Chart */}
                <div className="card bg-white/50 shadow-md border border-gray-200">
                    <div className="card-body p-3 md:p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3 sm:gap-0">
                            <h3 className="text-base md:text-lg font-semibold">Skin types</h3>
                            <div className="flex items-center gap-2 justify-center sm:justify-end">
                                <button className="btn btn-ghost btn-sm">
                                    <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
                                </button>
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    className="select select-bordered select-sm w-20 md:w-24 text-xs md:text-sm"
                                >
                                    <option value="2025">2025</option>
                                    <option value="2024">2024</option>
                                    <option value="2023">2023</option>
                                </select>
                                <button className="btn btn-ghost btn-sm">
                                    <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                                </button>
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height={200} className="md:h-[200px]">
                            <BarChart data={skinTypeData} margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis
                                    dataKey="type"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10 }}
                                    textAnchor="end"
                                    height={60}
                                />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                <Tooltip />
                                <Legend
                                    verticalAlign="top"
                                    align="right"
                                    wrapperStyle={{ top: -20, right: 0, fontSize: "12px" }}
                                    formatter={(value) => <span className="text-xs md:text-sm font-medium text-gray-600">{value}</span>}
                                />
                                <Bar dataKey="female" fill="#db2777" barSize={16} className="md:barSize-16" />
                                <Bar dataKey="male" fill="#2563eb" barSize={16} className="md:barSize-16" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Middle Row - Demographics and Skin Concerns */}
            <div className="flex flex-col lg:flex-row gap-4 md:gap-6 w-full">
                {/* Demographics Chart */}
                <div className="card bg-white/50 shadow-md border border-gray-200 w-full lg:w-1/3">
                    <div className="card-body p-3 md:p-4">
                        <h3 className="text-lg md:text-xl font-bold mb-4 text-center">Demographics</h3>
                        <ResponsiveContainer width="100%" height={180} className="md:h-[200px]">
                            <PieChart>
                                <Pie
                                    data={demographicsData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={40}
                                    outerRadius={70}
                                    fill="#8884d8"
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
                        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mt-4">
                            {demographicsData.map((entry, index) => (
                                <div key={index} className="flex items-center justify-center sm:justify-start gap-1">
                                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }}></span>
                                    <span className="text-xs md:text-sm text-gray-600">
                                        {entry.name} {entry.value / 1000}k
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Skin Concerns */}
                <div className="card bg-white/50 shadow-md border border-gray-200 w-full lg:flex-1">
                    <div className="card-body p-3 md:p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3 sm:gap-0">
                            <h3 className="text-base md:text-lg font-semibold">Skin Concerns</h3>
                            <div className="flex items-center gap-2 justify-center sm:justify-end">
                                <button className="btn btn-ghost btn-sm">
                                    <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
                                </button>
                                <select
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                    className="select select-bordered select-sm w-16 md:w-20 text-xs md:text-sm"
                                >
                                    <option value="MAR">MAR</option>
                                    <option value="APR">APR</option>
                                    <option value="MAY">MAY</option>
                                </select>
                                <button className="btn btn-ghost btn-sm">
                                    <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                                </button>
                            </div>
                        </div>
                        <div className="space-y-2 md:space-y-3">
                            {skinConcerns.map((concern, index) => (
                                <div key={index} className="flex items-center justify-between py-1">
                                    <span className="text-xs md:text-sm flex-1 truncate pr-2">{concern.concern}</span>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <span className="text-xs md:text-sm font-medium">{concern.count}</span>
                                        <div
                                            className={`badge badge-sm text-xs ${concern.percentage.startsWith("+")
                                                ? "badge-success"
                                                : concern.percentage === "-"
                                                    ? "badge-neutral"
                                                    : "badge-error"
                                                }`}
                                        >
                                            {concern.percentage}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Requests to add to waitlist */}
            <div className="card bg-white/50 shadow-md border border-gray-200">
                <div className="card-body p-3 md:p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3 sm:gap-0">
                        <h3 className="text-base md:text-lg font-semibold">Requests to add to waitlist</h3>
                        <div className="flex items-center gap-2 justify-center sm:justify-end">
                            <button className="btn btn-ghost btn-sm">
                                <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
                            </button>
                            <select
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                className="select select-bordered select-sm w-16 md:w-20 text-xs md:text-sm"
                            >
                                <option value="MAR">MAR</option>
                                <option value="APR">APR</option>
                                <option value="MAY">MAY</option>
                            </select>
                            <button className="btn btn-ghost btn-sm">
                                <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th className="text-sm">Product</th>
                                    <th className="text-sm">Brand name</th>
                                    <th className="text-sm">User name</th>
                                    <th className="text-right text-sm">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {waitlistRequests.map((request, index) => (
                                    <tr key={index}>
                                        <td className="text-sm">{request.product}</td>
                                        <td>
                                            <a href="#" className="link link-primary text-sm">
                                                {request.brand}
                                            </a>
                                        </td>
                                        <td>
                                            <a href="#" className="link link-primary text-sm">
                                                {request.user}
                                            </a>
                                        </td>
                                        <td className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className="btn btn-ghost btn-sm">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                                <button className="btn btn-ghost btn-sm">
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden space-y-3">
                        {waitlistRequests.map((request, index) => (
                            <div key={index} className="bg-white rounded-lg border border-gray-100 p-3">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1 min-w-0">
                                            <div className="font-medium text-sm text-gray-900 truncate">{request.product}</div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                Brand:{" "}
                                                <a href="#" className="link link-primary">
                                                    {request.brand}
                                                </a>
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                User:{" "}
                                                <a href="#" className="link link-primary">
                                                    {request.user}
                                                </a>
                                            </div>
                                        </div>
                                        <div className="flex gap-1 ml-2">
                                            <button className="btn btn-ghost btn-xs p-1">
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                            <button className="btn btn-ghost btn-xs p-1">
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
