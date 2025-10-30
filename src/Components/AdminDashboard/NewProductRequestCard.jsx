"use client"

import { useState } from "react"
import { X, Trash2, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import axiosApi from "@/api/axiosApi"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

export default function NewProductRequestCard() {
    const today = new Date()
    const currentMonthNumber = (today.getMonth() + 1).toString().padStart(2, "0")
    const [selectedMonthWaitlist, setSelectedMonthWaitlist] = useState(currentMonthNumber)
    const [expanded, setExpanded] = useState(false)
    const navigate = useNavigate()

    const { isPending: waitListLoading, error: waitListError, data: waitList } = useQuery({
        queryKey: ['waitList', selectedMonthWaitlist],
        queryFn: async () => {
            const res = await axiosApi.get(`/admin_panel/api/v1/waiting-list/${selectedMonthWaitlist}`)
            return res.data
        },
    })

    const queryClient = useQueryClient()

    // show either the full waitList (when expanded) or only the first item initially
    const displayList = expanded ? waitList : waitList?.slice(0, 1)

    const handleDeleteRequest = async (requestId) => {
        console.log(requestId)

        try {
            await axiosApi.delete(`/admin_panel/api/v1/waiting-list-delete/${requestId}`)
            console.log("Successfully deleted")
            toast.success("Request deleted successfully")
            // refetch the waitlist for the currently selected month so UI stays in sync
            try {
                await queryClient.invalidateQueries({ queryKey: ['waitList', selectedMonthWaitlist] })
            } catch (e) {
                // fallback: log but don't block user
                console.error('Failed to invalidate waitList query', e)
            }
        } catch (error) {
            console.error("Error deleting request:", error)
            toast.error("Failed to delete request")
        }

    }

    const handleAddToProducts = async (requestId) => {
        console.log(requestId)
        navigate(`/admindashboard/products/addproduct`)

    }

    return (
        <div className="p-6">
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
                        {waitListLoading ? (
                            <div className="p-6 text-center">Loading waitlist…</div>
                        ) : waitListError ? (
                            <div className="p-6 text-center text-red-600">Failed to load waitlist</div>
                        ) : (
                            <div className="overflow-y-auto transition-max-h duration-200" style={{ maxHeight: expanded ? '16rem' : '6rem' }}>
                                <table className="table w-full">
                                    <thead>
                                        <tr>
                                            <th className="text-sm">Product</th>

                                            <th className="text-sm">User name</th>
                                            <th className="text-right text-sm">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {displayList?.map((request, index) => (
                                            <tr key={index}>
                                                <td className="text-sm">{request?.name || request?.product || request?.product_name}</td>

                                                <td>
                                                    <a href="#" className="link link-primary text-sm">
                                                        {request?.user_name || request?.user}
                                                    </a>
                                                </td>
                                                <td className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button className="btn btn-ghost btn-sm" onClick={() => handleDeleteRequest(request.id)}>
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                        <button 
                                                        onClick={() => handleAddToProducts(request.id)}
                                                        className="btn btn-ghost btn-sm">
                                                            <Plus className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden">
                        {waitListLoading ? (
                            <div className="p-4 text-center">Loading waitlist…</div>
                        ) : waitListError ? (
                            <div className="p-4 text-center text-red-600">Failed to load waitlist</div>
                        ) : (
                            <div className="space-y-3 overflow-y-auto" style={{ maxHeight: expanded ? '20rem' : '5rem' }}>
                                {displayList?.map((request, index) => (
                                    <div key={index} className="bg-white rounded-lg border border-gray-100 p-3">
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-medium text-sm text-gray-900 truncate">{request?.name || request?.product}</div>

                                                    <div className="text-xs text-gray-500">
                                                        User:{' '}
                                                        <a href="#" className="link link-primary">
                                                            {request?.user_name || request?.user}
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="flex gap-1 ml-2">
                                                    <button className="btn btn-ghost btn-xs p-1" onClick={() => handleDeleteRequest(request.id)}>
                                                        <Trash2 className="w-3 h-3" />
                                                    </button>
                                                    <button className="btn btn-ghost btn-xs p-1" onClick={() => handleAddToProducts(request.id)}>
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* See more / Show less control */}
                    {(!waitListLoading && !waitListError && waitList && waitList.length > 1) && (
                        <div className="mt-3 flex justify-end">
                            <button
                                className="btn btn-ghost btn-sm"
                                onClick={() => {
                                    setExpanded((s) => !s)
                                }}
                            >
                                {expanded ? 'Show less' : 'See more'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
