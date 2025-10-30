"use client"

import { useMemo, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import axiosApi from "@/api/axiosApi"
import { useQuery } from "@tanstack/react-query"

const topCountries = [
    { country: "France", users: "12.1K", percentage: 45 },
    { country: "Germany", users: "2K", percentage: 12 },
    { country: "Switzerland", users: "811", percentage: 8 },
    { country: "Italy", users: "102", percentage: 4 },
    { country: "Others", users: "92", percentage: 3 },
]


const frequentQuestions = [
    { question: "What skincare ingredients work best to prevent aging and wrinkles?", percentage: "2.6k" },
    { question: "How should I match hair color to someone's skin tone?", percentage: "1.5k" },
    { question: "What's the difference between physical and chemical sunscreen?", percentage: "1.23k" },
    { question: "What's the best way to clean makeup brushes?", percentage: "1k" },
    { question: "How do I choose the right foundation shade?", percentage: "800" },
]

export default function DashboardGeneralContent() {

    const today = new Date();
    const currentYear = today.getFullYear();
    const years = Array.from({ length: 5 }, (_, index) => currentYear - index);
    const currentMonthNumber = (today.getMonth() + 1).toString().padStart(2, "0");


    const [selectedYear, setSelectedYear] = useState(currentYear.toString())
    const [selectedMonth, setSelectedMonth] = useState(currentMonthNumber);
    const [selectedMonthFrequency, setSelectedMonthFrequency] = useState(currentMonthNumber);
    const [selectedMonthTopcountries, setSelectedMonthTopcountries] = useState(currentMonthNumber);
    const [selectedMonthTopProduct, setSelectedMonthTopProduct] = useState(currentMonthNumber);

    const [startDateFrequency, setStartDateFrequency] = useState("");
    const [endDateFrequency, setEndDateFrequency] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // input debug removed

    const {
        isPending: topIngredientsLoading,
        error: topIngredientsError,
        data: top_Ingredients,
    } = useQuery({
        queryKey: ['top_Ingredients', selectedMonth],
        queryFn: async () => {
            const res = await axiosApi.get(`/admin_panel/api/v1/top-ingredients/${selectedMonth}`)
            return res.data
        },
    })

    const {
        isPending: topProductsLoading,
        error: topProductsError,
        data: top_products,
    } = useQuery({
        queryKey: ['top_products', selectedMonthTopProduct], // different query key
        queryFn: async () => {
            const res = await axiosApi.get(`/admin_panel/api/v1/top-products/${selectedMonthTopProduct}`)
            return res.data
        },
    })

    const {
        isPending: topCountiesLoading,
        error: topCountiesError,
        data: top_Counties,
    } = useQuery({
        queryKey: ['top_Counties', selectedMonthTopcountries], // different query key
        queryFn: async () => {
            const res = await axiosApi.get(`/admin_panel/api/v1/top-countries/${selectedMonthTopcountries}`)
            return res.data
        },
    })

    // Monthly earning details. 
    const {
        isPending: monthlyEarningLoading,
        error: monthlyEarningError,
        data: monthlyEarning,
    } = useQuery({
        queryKey: ['monthlyEarning', selectedYear], // new query key
        queryFn: async () => {
            const res = await axiosApi.get(`/admin_panel/api/v1/income-stat/${selectedYear}`)
            return res.data
        },
    })
    const transformedData = useMemo(() => {
        return monthlyEarning?.map((entry) => {
            const month = Object.keys(entry)[0]; // Get the month key (e.g., Jan)
            const amount = entry[month]; // Get the amount value
            return { month, amount }; // Return a new object with month and amount
        });
    }, [monthlyEarning]);

    // Frequency Of uses
    const {
        isPending: userFrequencyLoading,
        error: userFrequencyError,
        data: userFrequency,
    } = useQuery({
        queryKey: ['userFrequency', startDateFrequency, endDateFrequency], // include both for re-fetching
        queryFn: async () => {
            const res = await axiosApi.get(`/admin_panel/api/v1/user-activity/?from_date=${startDateFrequency}&to_date=${endDateFrequency}`, {
                params: {
                    from_date: startDateFrequency || null, // safe default
                    to_date: endDateFrequency || null,
                },
            })
            return res.data
        },
    })

    // removed global early returns; each section will render its own loading/error UI





    return (
        <div className="p-6 space-y-6 min-h-screen">

            <div className="lg:flex gap-6 space-y-6 lg:space-y-0">
                {/* Monthly Earnings Chart */}

                <div className="card bg-white/50 shadow-md border border-gray-200 w-full">
                    <div className="card-body p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Monthly Earnings</h3>
                            <div className="flex items-center gap-2">
                                <button className="btn btn-ghost btn-sm">
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    className="select select-bordered select-sm w-24"
                                >
                                    {years.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                                );
                                <button className="btn btn-ghost btn-sm">
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Loading State */}
                        {monthlyEarningLoading ? (
                            <div className="text-center text-gray-500">Loading Monthly Earnings...</div>
                        ) : monthlyEarningError ? (
                            <div className="text-center text-red-500">Error (Earnings): {monthlyEarningError.message}</div>
                        ) : (
                            <ResponsiveContainer width="100%" height={200}>
                                <LineChart data={transformedData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="amount" stroke="#8b5cf6" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>


                {/* Frequency of Usage */}
                <div className="card bg-white/50 shadow-md border border-gray-200 w-full">
                    <div className="card-body p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Frequency of usage</h3>
                            <div className="flex items-center gap-2">
                                <input
                                    type="date"
                                    value={startDateFrequency}
                                    onChange={(e) => setStartDateFrequency(e.target.value)}
                                    className="input input-bordered input-sm"
                                />
                                <span className="text-sm">to</span>
                                <input
                                    type="date"
                                    value={endDateFrequency}
                                    onChange={(e) => setEndDateFrequency(e.target.value)}
                                    className="input input-bordered input-sm"
                                />
                                <button className="btn btn-primary btn-sm">
                                    {loading ? "Loading..." : "Fetch"}
                                </button>
                            </div>
                        </div>

                        {/* Your current static stats go here */}
                        <div className="space-y-4">
                            {userFrequencyLoading ? (
                                <div className="text-center text-gray-500 p-4">Loading user frequency data...</div>
                            ) : userFrequencyError ? (
                                <div className="text-center text-red-500 p-4">Failed to load user frequency data.</div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-600">Connected now</p>
                                            <p className="text-2xl font-bold">{userFrequency?.connected_now}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Average usage time</p>
                                            <p className="text-2xl font-bold">{userFrequency?.average_usage_time} min</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-600">Average sessions per day</p>
                                            <p className="text-2xl font-bold">{userFrequency?.average_session_perday} sessions</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Number of users per day</p>
                                            <p className="text-2xl font-bold">{userFrequency?.number_of_users_per_day} users</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-600">Most popular time range</p>
                                        <p className="text-2xl font-bold">{userFrequency?.most_popular_time_range}</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className=" lg:flex gap-6 space-y-6 lg:space-y-0">
                {/* Top Countries */}
                <div className="card bg-white/50 shadow-md border border-gray-200 w-full max-h-[260px]">
                    <div className="card-body p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Top Countries</h3>
                            <div className="flex items-center gap-2">
                                <button className="btn btn-ghost btn-sm">
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <select
                                    value={selectedMonthTopcountries}
                                    onChange={(e) => setSelectedMonthTopcountries(e.target.value)}
                                    className="select select-bordered select-sm w-20"
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
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {topCountiesLoading ? (
                                <div className="p-4 text-center text-gray-500">Loading countries…</div>
                            ) : topCountiesError ? (
                                <div className="p-4 text-center text-red-600">Failed to load countries</div>
                            ) : (
                                top_Counties?.map((country, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <span className="text-sm">{country?.country}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium"> {country?.count > 100
                                                ? (country.count / 1000).toFixed(1) + "k" // 1500 → 1.5k
                                                : country?.count}</span>
                                            <div className="w-16 h-2 bg-gray-200 rounded-full">
                                                <div className="h-full bg-purple-500 rounded-full" style={{ width: `${country.percentage}%` }} />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Top Products */}
                <div className="card bg-white/50 shadow-md border border-gray-200 w-full max-h-[260px]">
                    <div className="card-body p-4 overflow-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Top Products</h3>
                            <div className="flex items-center gap-2">
                                <button className="btn btn-ghost btn-sm">
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <select
                                    value={selectedMonthTopProduct}
                                    onChange={(e) => setSelectedMonthTopProduct(e.target.value)}
                                    className="select select-bordered select-sm w-20"
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
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {topProductsLoading ? (
                                <div className="p-4 text-center text-gray-500">Loading products…</div>
                            ) : topProductsError ? (
                                <div className="p-4 text-center text-red-600">Failed to load products</div>
                            ) : (
                                top_products?.map((product, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <span className="text-sm flex-1">{product?.product}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">{product?.current_month}</span>
                                            <div
                                                className={`badge badge-sm ${product?.difference_percentage > 0
                                                    ? 'badge-success'   // positive → green
                                                    : product?.difference_percentage < 0
                                                        ? 'badge-error'     // negative → red
                                                        : 'badge-neutral'   // 0 or "-" → neutral
                                                    }`}
                                            >
                                                {product?.difference_percentage}%
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                    </div>
                </div>
            </div>

            <div className="lg:flex gap-6 space-y-6 lg:space-y-0">
                {/* Top Ingredients */}
                <div className="card bg-white/50 shadow-md border border-gray-200 w-full">
                    <div className="card-body p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Top Ingredients</h3>
                            <div className="flex items-center gap-2">
                                <button className="btn btn-ghost btn-sm">
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <select
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                    className="select select-bordered select-sm w-20"
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
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div className="space-y-3 max-h-[270px] overflow-scroll">
                            {topIngredientsLoading ? (
                                <div className="p-4 text-center text-gray-500">Loading ingredients…</div>
                            ) : topIngredientsError ? (
                                <div className="p-4 text-center text-red-600">Failed to load ingredients</div>
                            ) : (
                                top_Ingredients?.map((ingredient, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <span className="text-sm flex-1">{ingredient?.ingredient}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">{ingredient?.current_month}</span>
                                            <div
                                                className={`badge badge-sm ${ingredient?.difference_percentage > 0
                                                    ? 'badge-success'   // positive → green
                                                    : ingredient?.difference_percentage < 0
                                                        ? 'badge-error'     // negative → red
                                                        : 'badge-neutral'   // 0 → neutral
                                                    }`}
                                            >
                                                {ingredient?.difference_percentage}%
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="mt-4 text-right">
                            <button className="btn btn-link btn-sm text-gray-500">See more</button>
                        </div>
                    </div>
                </div>

                {/* Most Frequently Asked Questions */}
                <div className="card bg-white/50 shadow-md border border-gray-200 w-full">
                    <div className="card-body p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Most frequently asked questions</h3>
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
                        <div
                            onClick={() => {
                                navigate('/admindashboard/faq')
                            }}
                            className="space-y-3 cursor-pointer">
                            {frequentQuestions.map((question, index) => (
                                <div key={index} className="flex items-start justify-between gap-3">
                                    <span className="text-sm flex-1 leading-relaxed">{question.question}</span>
                                    <span className="text-sm font-medium text-purple-600">{question.percentage}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
