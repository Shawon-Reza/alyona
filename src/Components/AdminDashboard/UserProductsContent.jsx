"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import axiosApi from "@/api/axiosApi"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

const productsData = {
    brands: "Yourself beauty, brand1, brand2, brand3",
    fragance: "Creamy , fruity",
    texture: "biPhasic, liquid",
    skinConcerns: "dryness barrier repair, fine lines, aging, sensitive skin, lack of glow",
    naturality: "99%",
    pricePoint: "$$",
    packaging: "??",
    morningRoutine: {
        tone: "Purifying Toner : Yourself Beauty",
        hydrate: "Hydrating Toner: Yourself Beauty",
    },
    nighttimeRoutine: {
        tone: "Purifying Toner : Yourself Beauty",
        hydrate: "Hydrating Toner: Yourself Beauty",
    },
    topProducts: [
        { name: "Peptide Serum", growth: "+8%", count: "2321" },
        { name: "Ceramide Hydrating Night Cream", growth: "+90%", count: "111" },
        { name: "BiPhasic Make-up Remover", growth: "-2%", count: "102" },
        { name: "Hydrating Toner", growth: "-", count: "102" },
        { name: "Natural Retinol-Alternative Oil Serum", growth: "-2%", count: "80" },
    ],
    topIngredients: [
        { name: "Almond Oil", growth: "+8%", count: "2321" },
        { name: "Camelia (Green Tea) extract", growth: "+90%", count: "111" },
        { name: "Ceramides", growth: "-2%", count: "102" },
        { name: "Cocoa Butter", growth: "-", count: "102" },
        { name: "Ferulic acid", growth: "-2%", count: "80" },
    ],
}

export default function UserProductContent() {
    const [selectedMonth, setSelectedMonth] = useState("MAR")
    const { id } = useParams()

    const getGrowthBadgeClass = (growth) => {
        if (growth.startsWith("+")) return "text-green-600"
        if (growth === "-") return "text-gray-600"
        return "text-red-600"
    }

    const { isPending: Products_preference_Loading, error: Products_preference_Error, data: Products_preference } = useQuery({
        queryKey: ['Products_preference', id],
        queryFn: async () => {
            const res = await axiosApi.get(`/admin_panel/api/v1/user-product-stat/${id}`)
            return res.data
        }
    })

    // Ensure Products_preference data is available before rendering
    if (Products_preference_Loading) return <div>Loading...</div>
    if (Products_preference_Error) return <div>Error: {Products_preference_Error.message}</div>

    return (
        <div className="">

            {/* Products preference */}
            <div className="mb-4">
                <h2 className="text-lg border-b-3 border-base-300 text-gray-900 mb-2">Products preference</h2>
                <div>
                    <div className="flex justify-between border-b border-gray-100 py-1">
                        <span className="font-medium text-gray-700 w-1/4">Brands</span>
                        <span className="text-[#4B4848] w-3/4 ">
                            {Products_preference.top_brands.join(", ")}
                        </span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 py-1">
                        <span className="font-medium text-gray-700 w-1/4">Fragrance</span>
                        <span className="text-[#4B4848] w-3/4 ">
                            {Products_preference.top_fragrances.join(", ")}
                        </span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 py-1">
                        <span className="font-medium text-gray-700 w-1/4">Texture</span>
                        <span className="text-[#4B4848] w-3/4 ">
                            {Products_preference.top_textures.join(", ")}
                        </span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 py-1">
                        <span className="font-medium text-gray-700 w-1/4">Skin concerns</span>
                        <span className="text-[#4B4848] w-3/4 ">{Products_preference.skin_concerns.join(", ")}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 py-1">
                        <span className="font-medium text-gray-700 w-1/4">Naturality</span>
                        <span className="text-[#4B4848] w-3/4">99%</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 py-1">
                        <span className="font-medium text-gray-700 w-1/4">Price point</span>
                        <span className="text-[#4B4848] w-3/4">{Products_preference.most_common_price_range}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 py-1">
                        <span className="font-medium text-gray-700 w-1/4">Packaging</span>
                        <span className="text-[#4B4848] w-3/4">??</span>
                    </div>
                </div>
            </div>

            {/* Morning and Nighttime Routine */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                    <h3 className="text-md font-semibold text-gray-900 border-b-3 border-base-300">Morning routine</h3>
                    <div className="space-y-2 mt-3">
                        <div className="flex justify-between border-b border-gray-100">
                            <span className="font-medium text-gray-700">{Products_preference.latest_am_product?.product_type}</span>
                            <a
                                href={Products_preference.latest_am_product?.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline text-sm"
                            >
                                {Products_preference.latest_am_product?.product_name}
                            </a>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="text-md font-semibold text-gray-900  border-b-3 border-base-300">Nighttime routine</h3>
                    <div className="space-y-2 mt-3">
                        <div className="flex justify-between border-b border-gray-100">
                            <span className="font-medium text-gray-700">{Products_preference.latest_pm_product?.product_type}</span>
                            <a
                                href={Products_preference.latest_pm_product?.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline text-sm"
                            >
                                {Products_preference.latest_pm_product?.product_name}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Products and Top Ingredients */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Displaying Top Products */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-md font-semibold text-gray-900">Top Products</h3>
                        <div className="flex items-center gap-2">
                            <button className="p-1 hover:bg-gray-100 rounded">
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <select
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                className="text-sm rounded px-2 py-1"
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
                    <div className="space-y-2 bg-white p-4 rounded-xl">
                        {/* Dynamically mapping top products */}
                        {Products_preference.top_brands.map((product, index) => (
                            <div key={index} className="flex items-center justify-between py-2 border-b border-base-300">
                                <a
                                    href={Products_preference.latest_am_product?.url} // Add the relevant URL for each product here
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm flex-1 text-blue-600 underline"
                                >
                                    {product}
                                </a>
                                <div className="flex items-center gap-3">
                                    <span className={`text-sm ${getGrowthBadgeClass('+')}`}>+8%</span>
                                    <span className="text-sm font-medium w-12 text-right">2321</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Displaying Top Ingredients */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-md font-semibold text-gray-900">Top Ingredients</h3>
                        <div className="flex items-center gap-2">
                            <button className="p-1 hover:bg-gray-100 rounded">
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <select
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                className="text-sm rounded px-2 py-1"
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
                    <div className="space-y-2 bg-white rounded-xl p-4">
                        {/* Dynamically mapping top ingredients */}
                        {Products_preference.top_fragrances.map((ingredient, index) => (
                            <div key={index} className="flex items-center justify-between py-2">
                                <a
                                    href={Products_preference.latest_pm_product?.url} // Add the relevant URL for each ingredient here
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm flex-1 text-blue-600 underline"
                                >
                                    {ingredient}
                                </a>
                                <div className="flex items-center gap-3">
                                    <span className={`text-sm ${getGrowthBadgeClass('+')}`}>+8%</span>
                                    <span className="text-sm font-medium w-12 text-right">2321</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}


