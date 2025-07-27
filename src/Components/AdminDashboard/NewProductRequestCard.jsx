"use client"

import { useState } from "react"
import { X, Trash2, Plus, ChevronDown, ChevronUp } from "lucide-react"
import { useNavigate } from "react-router-dom"

const productRequestsData = [
    { id: 1, product: "Product 1", brand: "Brand name", user: "User name" },
    { id: 2, product: "Product 2", brand: "Brand name", user: "User name" },
    { id: 3, product: "Product 3", brand: "Brand name", user: "User name" },
    { id: 4, product: "Product 4", brand: "Brand name", user: "User name" },
    { id: 5, product: "Product 5", brand: "Brand name", user: "User name" },
]

export default function NewProductRequestCard() {
    const [visibleCount, setVisibleCount] = useState(1)
    const showMore = () => setVisibleCount(productRequestsData.length)
    const showLess = () => setVisibleCount(1)

    const isExpanded = visibleCount === productRequestsData.length

    const navigate = useNavigate();


    return (
        <div className="p-6 flex items-center justify-center">
            <div className="card  shadow-md w-full ">
                <div className="card-body p-4">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-[#181818]">New product requests</h3>
                        <button className="btn btn-ghost btn-sm btn-circle text-orange-600">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="space-y-2">
                        {productRequestsData.slice(0, visibleCount).map((request) => (
                            <div key={request.id} className="rounded-lg border border-base-100/50 bg-white/50 p-4">

                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center sm:gap-20 gap-5">
                                        <p className="font-bold">{request.product}</p>
                                        <a href="#" className="link link-primary text-[#5B5B5B] text-sm underline">
                                            {request.brand}
                                        </a>
                                        <a href="#" className="link link-primary text-[#5B5B5B] text-sm underline">
                                            {request.user}
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="btn btn-ghost btn-sm btn-circle">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => {
                                                navigate('/admindashboard/newproduct-requestpage')
                                            }}
                                            className="btn btn-ghost btn-sm btn-circle">
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {productRequestsData.length > 1 && (
                        <div className=" text-center">
                            {!isExpanded ? (
                                <button onClick={showMore} className="btn btn-link btn-sm text-gray-500">
                                    Show more <ChevronDown className="w-4 h-4 ml-1" />
                                </button>
                            ) : (
                                <button onClick={showLess} className="btn btn-link btn-sm text-gray-500">
                                    Show less <ChevronUp className="w-4 h-4 ml-1" />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
