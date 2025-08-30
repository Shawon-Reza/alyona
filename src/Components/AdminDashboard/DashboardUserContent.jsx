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
import axiosApi from "@/api/axiosApi"
import { useQuery } from "@tanstack/react-query"


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

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonthNumber = (today.getMonth() + 1).toString().padStart(2, "0");

    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

    const [selectedYear, setSelectedYear] = useState(currentYear.toString())
    const [selectedYearUserAge, setSelectedYearUserAge] = useState(currentYear.toString())
    const [selectedYearSkinTypes, setSelectedYearSkinTypes] = useState(currentYear.toString())


    const [selectedMonth, setSelectedMonth] = useState("MAR")
    const [selectedMonthScreenConcern, setSelectedMonthScreenConcern] = useState(currentMonthNumber)
    const [selectedMonthWaitlist, setSelectedMonthWaitlist] = useState(currentMonthNumber)



    const { isPending, error, data: demographics_Data } = useQuery({
        queryKey: ['demographics_Data', selectedYearUserAge],
        queryFn: async () => {
            const res = await axiosApi.get('/admin_panel/api/v1/demographics')
            return res.data
        }
    })

    const demographicsData = [
        { name: "Female", value: demographics_Data?.male, color: "#db2777" }, // Pink
        { name: "Male", value: demographics_Data?.female, color: "#2563eb" }, // Blue
        { name: "No defined", value: demographics_Data?.other, color: "#e5e7eb" }, // Light gray
    ]


    const { isPending: TotalUSerAgeLoading, error: TotalUSerAgeError, data: userAgeData } = useQuery({
        queryKey: ['userAgeData', selectedYearUserAge],
        queryFn: async () => {
            const res = await axiosApi.get(`/admin_panel/api/v1/user-vs-age/${selectedYearUserAge}`)
            return res.data
        }
    })
    const ageData = userAgeData
        ? Object.keys(userAgeData)
            .filter(key => key !== 'total_user')
            .map(ageRange => ({
                age: ageRange,
                ...userAgeData[ageRange],
            }))
        : [];

    const { isPending: skinTypesLoading, error: skinTypesError, data: skinTypesDataRaw } = useQuery({
        queryKey: ['skinTypesData', selectedYearSkinTypes],
        queryFn: async () => {
            const res = await axiosApi.get(`/admin_panel/api/v1/user-skin-type/${selectedYearSkinTypes}`)
            return res.data
        }
    })
    // Map keys to array
    const skinTypesData = skinTypesDataRaw
        ? Object.keys(skinTypesDataRaw)
            .filter(key => key !== 'total_user')
            .map(type => ({
                type: type.toUpperCase(),

                count: skinTypesDataRaw[type],
            }))
        : []; //
    console.log(skinTypesDataRaw)
    console.log(skinTypesData)

    const { isPending: screenConcernLoading, error: screenConcernError, data: screenConcern } = useQuery({
        queryKey: ['screenConcern', selectedMonthScreenConcern],
        queryFn: async () => {
            const res = await axiosApi.get(`/admin_panel/api/v1/skin-concerns/${selectedMonthScreenConcern}`)
            return res.data
        }
    })
    const { isPending: waitListLoading, error: waitListError, data: waitList } = useQuery({
        queryKey: ['waitList', selectedMonthWaitlist],
        queryFn: async () => {
            const res = await axiosApi.get(`/admin_panel/api/v1/waiting-list/${selectedMonthWaitlist}`)
            return res.data
        }
    })




    if (isPending || TotalUSerAgeLoading || skinTypesLoading || screenConcernLoading || waitListLoading)
        return "Loading..."

    if (error || TotalUSerAgeError || skinTypesError || screenConcernError || waitListError)
        return "Error loading data"















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
                                    value={selectedYearUserAge}
                                    onChange={(e) => setSelectedYearUserAge(e.target.value)}
                                    className="select select-bordered select-sm w-20 md:w-24 text-xs md:text-sm"
                                >
                                    {years.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                                <button className="btn btn-ghost btn-sm">
                                    <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                                </button>
                            </div>
                        </div>

                        <ResponsiveContainer width="100%" height={200} className="md:h-[200px]">

                            <BarChart data={ageData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="age" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
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
                                    {years.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                                <button className="btn btn-ghost btn-sm">
                                    <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                                </button>
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height={200} className="md:h-[200px]">
                            <BarChart data={skinTypesData} margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
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
                                    wrapperStyle={{ top: -20, right: 0, fontSize: "10px" }}
                                    formatter={(value) => (
                                        <span className="text-xs md:text-sm font-medium text-gray-600">{value}</span>
                                    )}
                                />
                                <Bar dataKey="count" fill="#db2777" barSize={16} />
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
                                        {entry.name} {entry.value > 1000
                                            ? `${(entry.value / 1000).toFixed(1)}k`
                                            : entry.value}
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
                                    value={selectedMonthScreenConcern}
                                    onChange={(e) => setSelectedMonthScreenConcern(e.target.value)}
                                    className="select select-bordered select-sm w-16 md:w-20 text-xs md:text-sm"
                                >
                                    <option value="01">JAN</option>
                                    <option value="02">FEB</option>
                                    <option value="03">MAR</option>
                                    <option value="04">APR</option>
                                    <option value="05">MAY</option>
                                    <option value="06">JUN</option>
                                    <option value="07">JUL</option>
                                    <option value="08">AUG</option>
                                    <option value="09">SEP</option>
                                    <option value="10">OCT</option>
                                    <option value="11">NOV</option>
                                    <option value="12">DEC</option>
                                </select>
                                <button className="btn btn-ghost btn-sm">
                                    <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                                </button>
                            </div>
                        </div>
                        <div className="space-y-2 md:space-y-3">
                            {screenConcern.map((concern, index) => (
                                <div key={index} className="flex items-center justify-between py-1">
                                    <span className="text-xs md:text-sm flex-1 truncate pr-2">{concern?.concern}</span>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <span className="text-xs md:text-sm font-medium">{concern?.current_month}</span>
                                        {/* <div
                                            className={`badge badge-sm text-xs ${concern.percentage.startsWith("+")
                                                ? "badge-success"
                                                : concern.percentage === "-"
                                                    ? "badge-neutral"
                                                    : "badge-error"
                                                }`}
                                        >
                                            {concern.percentage}
                                        </div> */}
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
                                value={selectedMonthWaitlist}
                                onChange={(e) => setSelectedMonthWaitlist(e.target.value)}
                                className="select select-bordered select-sm w-16 md:w-20 text-xs md:text-sm"
                            >
                                <option value="01">JAN</option>
                                <option value="02">FEB</option>
                                <option value="03">MAR</option>
                                <option value="04">APR</option>
                                <option value="05">MAY</option>
                                <option value="06">JUN</option>
                                <option value="07">JUL</option>
                                <option value="08">AUG</option>
                                <option value="09">SEP</option>
                                <option value="10">OCT</option>
                                <option value="11">NOV</option>
                                <option value="12">DEC</option>
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

                                    <th className="text-sm">User name</th>
                                    <th className="text-right text-sm">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {waitList?.map((request, index) => (
                                    <tr key={index}>
                                        <td className="text-sm">{request?.name}</td>

                                        <td>
                                            <a href="#" className="link link-primary text-sm">
                                                {request?.user_name}
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
                        {waitList?.map((request, index) => (
                            <div key={index} className="bg-white rounded-lg border border-gray-100 p-3">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1 min-w-0">
                                            <div className="font-medium text-sm text-gray-900 truncate">{request.name}</div>

                                            <div className="text-xs text-gray-500">
                                                User:{" "}
                                                <a href="#" className="link link-primary">
                                                    {request?.user_name}
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
