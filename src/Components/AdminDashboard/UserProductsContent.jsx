"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import axiosApi from "@/api/axiosApi"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

export default function UserProductsContent() {
    // months list with numeric values 1..12
    const MONTHS = [
        { label: 'JAN', value: 1 },
        { label: 'FEB', value: 2 },
        { label: 'MAR', value: 3 },
        { label: 'APR', value: 4 },
        { label: 'MAY', value: 5 },
        { label: 'JUN', value: 6 },
        { label: 'JUL', value: 7 },
        { label: 'AUG', value: 8 },
        { label: 'SEP', value: 9 },
        { label: 'OCT', value: 10 },
        { label: 'NOV', value: 11 },
        { label: 'DEC', value: 12 },
    ]

    // separate month selection for products and ingredients
    const [selectedProductMonth, setSelectedProductMonth] = useState(() => new Date().getMonth() + 1)
    const [selectedIngredientMonth, setSelectedIngredientMonth] = useState(() => new Date().getMonth() + 1)
    const { id } = useParams()

    const getGrowthBadgeClass = (growth) => {
        if (typeof growth === 'string' && growth.startsWith("+")) return "text-green-600"
        if (growth === "-") return "text-gray-600"
        return "text-red-600"
    }

    const {
        isLoading: productsLoading,
        isError: productsError,
        error: productsErrorObj,
        data: productsPreference,
    } = useQuery({
        queryKey: ['Products_preference', id],
        queryFn: async () => {
            const res = await axiosApi.get(`/admin_panel/api/v1/user-product-stat/${id}`)
            return res.data
        },
    })

    // Top products (backend: /admin_panel/api/v1/user-top-products/{id}?month={m})
    const {
        data: topProducts = [],
        isLoading: topProductsLoading,
        isError: topProductsError,
        error: topProductsErrorObj,
    } = useQuery({
        queryKey: ['userTopProducts', id, selectedProductMonth],
        queryFn: async () => {
            const res = await axiosApi.get(`/admin_panel/api/v1/user-top-products/${id}`, { params: { month: selectedProductMonth } })
            return Array.isArray(res.data) ? res.data : (res.data?.data ?? [])
        },
        keepPreviousData: true,
    })

    // Top ingredients (backend: /admin_panel/api/v1/user-top-ingredients/{id}?month={m})
    const {
        data: topIngredients = [],
        isLoading: topIngredientsLoading,
        isError: topIngredientsError,
        error: topIngredientsErrorObj,
    } = useQuery({
        queryKey: ['userTopIngredients', id, selectedIngredientMonth],
        queryFn: async () => {
            const res = await axiosApi.get(`/admin_panel/api/v1/user-top-ingredients/${id}`, { params: { month: selectedIngredientMonth } })
            return Array.isArray(res.data) ? res.data : (res.data?.data ?? [])
        },
        keepPreviousData: true,
    })

    return (
        <div className="">

            {/* Products preference */}
            {
                productsLoading ? (
                    <div className="text-center py-4 text-gray-500">Loading product preferences...</div>
                ) : productsError ? (
                    <div className="text-red-500">Failed to load product preferences: {productsErrorObj?.message}</div>
                ) : productsPreference ? (
                    <div className="mb-4">
                        <h2 className="text-lg border-b-3 border-base-300 text-gray-900 mb-2">Products preference</h2>
                        <div>
                            <div className="flex justify-between border-b border-gray-100 py-1">
                                <span className="font-medium text-gray-700 w-1/4">Brands</span>
                                <span className="text-[#4B4848] w-3/4 ">
                                    {(productsPreference.top_brands || []).join(", ")}
                                </span>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 py-1">
                                <span className="font-medium text-gray-700 w-1/4">Fragrance</span>
                                <span className="text-[#4B4848] w-3/4 ">
                                    {(productsPreference.top_fragrances || []).join(", ")}
                                </span>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 py-1">
                                <span className="font-medium text-gray-700 w-1/4">Texture</span>
                                <span className="text-[#4B4848] w-3/4 ">
                                    {(productsPreference.top_textures || []).join(", ")}
                                </span>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 py-1">
                                <span className="font-medium text-gray-700 w-1/4">Skin concerns</span>
                                <span className="text-[#4B4848] w-3/4 ">{(productsPreference.skin_concerns || []).join(", ")}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 py-1">
                                <span className="font-medium text-gray-700 w-1/4">Naturality</span>
                                <span className="text-[#4B4848] w-3/4">99%</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 py-1">
                                <span className="font-medium text-gray-700 w-1/4">Price point</span>
                                <span className="text-[#4B4848] w-3/4">{productsPreference.most_common_price_range}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 py-1">
                                <span className="font-medium text-gray-700 w-1/4">Packaging</span>
                                <span className="text-[#4B4848] w-3/4">??</span>
                            </div>
                        </div>
                    </div>
                ) : null
            }




            {/* Morning and Nighttime Routine */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                    <h3 className="text-md font-semibold text-gray-900 border-b-3 border-base-300">Morning routine</h3>
                    <div className="space-y-2 mt-3">
                        <div className="flex justify-between border-b border-gray-100">
                            <span className="font-medium text-gray-700">{productsPreference?.latest_am_product?.product_type}</span>
                            <a
                                href={productsPreference?.latest_am_product?.url || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline text-sm"
                            >
                                {productsPreference?.latest_am_product?.product_name}
                            </a>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="text-md font-semibold text-gray-900  border-b-3 border-base-300">Nighttime routine</h3>
                    <div className="space-y-2 mt-3">
                        <div className="flex justify-between border-b border-gray-100">
                            <span className="font-medium text-gray-700">{productsPreference?.latest_pm_product?.product_type}</span>
                            <a
                                href={productsPreference?.latest_pm_product?.url || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline text-sm"
                            >
                                {productsPreference?.latest_pm_product?.product_name}
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
                            <button className="p-1 hover:bg-gray-100 rounded" onClick={() => setSelectedProductMonth((m) => (m === 1 ? 12 : m - 1))}>
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <select
                                value={selectedProductMonth}
                                onChange={(e) => setSelectedProductMonth(Number(e.target.value))}
                                className="text-sm rounded px-2 py-1"
                            >
                                {MONTHS.map((mo) => (
                                    <option key={mo.value} value={mo.value}>{mo.label}</option>
                                ))}
                            </select>
                            <button className="p-1 hover:bg-gray-100 rounded" onClick={() => setSelectedProductMonth((m) => (m === 12 ? 1 : m + 1))}>
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-xl">
                        {topProductsLoading ? (
                            <div className="text-gray-500">Loading top products...</div>
                        ) : topProductsError ? (
                            <div className="text-red-500">Failed to load top products: {topProductsErrorObj?.message}</div>
                        ) : Array.isArray(topProducts) && topProducts.length > 0 ? (
                            topProducts.map((p, index) => {
                                const name = p.product || p.name || String(p)
                                const diffRaw = p.difference_percentage ?? p.difference_percentage
                                const diffStr = typeof diffRaw === 'number' ? `${diffRaw}%` : String(diffRaw)
                                return (
                                    <div key={index} className="flex items-center justify-between py-2 border-b border-base-300">
                                        <div className="text-sm flex-1 text-gray-900">{name}</div>
                                        <div className="flex items-center gap-3">
                                            <span className={`text-sm ${getGrowthBadgeClass(String(diffStr))}`}>{diffStr}</span>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="text-gray-500">No top products for this month.</div>
                        )}
                    </div>
                </div>

                {/* Displaying Top Ingredients */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-md font-semibold text-gray-900">Top Ingredients</h3>
                        <div className="flex items-center gap-2">
                            <button className="p-1 hover:bg-gray-100 rounded" onClick={() => setSelectedIngredientMonth((m) => (m === 1 ? 12 : m - 1))}>
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <select
                                value={selectedIngredientMonth}
                                onChange={(e) => setSelectedIngredientMonth(Number(e.target.value))}
                                className="text-sm rounded px-2 py-1"
                            >
                                {MONTHS.map((mo) => (
                                    <option key={mo.value} value={mo.value}>{mo.label}</option>
                                ))}
                            </select>
                            <button className="p-1 hover:bg-gray-100 rounded" onClick={() => setSelectedIngredientMonth((m) => (m === 12 ? 1 : m + 1))}>
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <div className="space-y-2 bg-white rounded-xl p-4">
                        {topIngredientsLoading ? (
                            <div className="text-gray-500">Loading top ingredients...</div>
                        ) : topIngredientsError ? (
                            <div className="text-red-500">Failed to load top ingredients: {topIngredientsErrorObj?.message}</div>
                        ) : Array.isArray(topIngredients) && topIngredients.length > 0 ? (
                            topIngredients.map((ing, index) => {
                                const name = ing.ingredient || ing.name || String(ing)
                                const diffRaw = ing.difference_percentage ?? ing.difference_percentage
                                const diffStr = typeof diffRaw === 'number' ? `${diffRaw}%` : String(diffRaw)
                                return (
                                    <div key={index} className="flex items-center justify-between py-2 border-b border-base-200">
                                        <div className="text-sm flex-1 text-gray-900">{name}</div>
                                        <div className="flex items-center gap-3">
                                            <span className={`text-sm ${getGrowthBadgeClass(String(diffStr))}`}>{diffStr}</span>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="text-gray-500">No top ingredients for this month.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}


