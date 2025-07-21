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
    { age: "55-", female: 1200, male: 800 },
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
        <div className="p-6 space-y-6  min-h-screen text-[#181818]">
            <div className="grid grid-cols-2 gap-6">
                {/* Total users vs age Chart */}
                <div className="card bg-white/50 shadow-md border border-base-200">
                    <div className="card-body p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Total users vs age</h3>
                            <div className="flex items-center gap-2">
                                <button className="btn btn-ghost btn-sm">
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    className="select select-bordered select-sm w-24"
                                >
                                    <option value="2025">2025</option>
                                    <option value="2024">2024</option>
                                    <option value="2023">2023</option>
                                </select>
                                <button className="btn btn-ghost btn-sm">
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
                                <Bar dataKey="female" fill="#db2777" barSize={16} /> {/* Pink */}
                                <Bar dataKey="male" fill="#2563eb" barSize={16} /> {/* Blue */}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Skin types Chart */}
                <div className="card bg-white/50 shadow-md border border-gray-200">
                    <div className="card-body p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Skin types</h3>
                            <div className="flex items-center gap-2">
                                <button className="btn btn-ghost btn-sm">
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    className="select select-bordered select-sm w-24"
                                >
                                    <option value="2025">2025</option>
                                    <option value="2024">2024</option>
                                    <option value="2023">2023</option>
                                </select>
                                <button className="btn btn-ghost btn-sm">
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={skinTypeData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="type" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip />
                                <Legend
                                    verticalAlign="top"
                                    align="right"
                                    wrapperStyle={{ top: -20, right: 0 }}
                                    formatter={(value) => <span className="text-sm font-medium text-gray-600">{value}</span>}
                                />
                                <Bar dataKey="female" fill="#db2777" barSize={16} /> {/* Pink */}
                                <Bar dataKey="male" fill="#2563eb" barSize={16} /> {/* Blue */}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="md:flex gap-6 w-full">
                {/* Demographics Chart */}
                <div className="card bg-white/50 shadow-md border border-gray-200 w-1/3">
                    <div className="card-body p-4">
                        <h3 className="text-xl font-bold mb-4 text-center">Demographics</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={demographicsData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
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
                        <div className="flex justify-center gap-4 mt-4">
                            {demographicsData.map((entry, index) => (
                                <div key={index} className="flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
                                    <span className="text-sm text-gray-600">
                                        {entry.name} {entry.value / 1000}k
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Skin Concerns */}
                <div className="card bg-white/50 shadow-md border border-gray-200 w-full">
                    <div className="card-body p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Skin Concerns</h3>
                            <div className="flex items-center gap-2">
                                <button className="btn btn-ghost btn-sm">
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <select
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                    className="select select-bordered select-sm w-20"
                                >
                                    <option value="MAR">MAR</option>
                                    <option value="APR">APR</option>
                                    <option value="MAY">MAY</option>
                                </select>
                                <button className="btn btn-ghost btn-sm">
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {skinConcerns.map((concern, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <span className="text-sm flex-1">{concern.concern}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium">{concern.count}</span>
                                        <div
                                            className={`badge badge-sm ${concern.percentage.startsWith("+")
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
                <div className="card-body p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Requests to add to waitlist</h3>
                        <div className="flex items-center gap-2">
                            <button className="btn btn-ghost btn-sm">
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <select
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                className="select select-bordered select-sm w-20"
                            >
                                <option value="MAR">MAR</option>
                                <option value="APR">APR</option>
                                <option value="MAY">MAY</option>
                            </select>
                            <button className="btn btn-ghost btn-sm">
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Brand name</th>
                                    <th>User name</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {waitlistRequests.map((request, index) => (
                                    <tr key={index}>
                                        <td>{request.product}</td>
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
                </div>
            </div>
        </div>
    )
}
