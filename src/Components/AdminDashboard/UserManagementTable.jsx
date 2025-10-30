"use client"

import { useState, useRef, useEffect } from "react"
import { Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import useGetTotalUsers from "@/hooks/useGetTotalUsers"
import axiosApi from "@/api/axiosApi"
import { useQuery } from "@tanstack/react-query"
import { toast } from "react-toastify"


// Available statuses for dropdown
const statuses = ["Active", "Inactive"]

// Subscription types
const subscriptionTypes = ["Free", "Premium monthly", "Premium Yearly", "Luxury monthly", "Luxury Yearly"]

export default function UserManagementTable() {
    const [currentPage, setCurrentPage] = useState(1)
    const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" })
    const [searchTerm, setSearchTerm] = useState("")
    const [searchValue, setSearchValue] = useState()
    const [filters, setFilters] = useState({
        subscription: "",
        status: "",
    })

    const { isPending, error, data } = useGetTotalUsers({ currentPage, sortConfig, searchTerm, filters })
    if (isPending) {
        return <div className="text-center text-gray-500">Loading...</div>
    }

    // [MOD] keep a local render array
    const [users, setUsers] = useState(data?.results || []) // [unchanged init]
    const [editingMentor, setEditingMentor] = useState(null)
    const [editingStatus, setEditingStatus] = useState(null)
    const [showFilterPanel, setShowFilterPanel] = useState(false)

    const filterPanelRef = useRef(null)

    const usersPerPage = 12
    const totalUsers = data?.count
    const totalPages = data?.total_pages


    // Get Mentor List
    const { isPending: mentorIsPending, error: mentorError, data: mentorlist } = useQuery({
        queryKey: ['mentorlist'],
        queryFn: async () => {
            const res = await axiosApi.get(`/admin_panel/api/v1/mentor-list`)
            return res.data
        }
    })

    // mentor list loaded




    // [MOD] sync users from server + safe defaults so selects are controlled
    useEffect(() => {
        setUsers(
            (data?.results || []).map((u) => ({
                ...u,
                mentor: u?.mentor ?? "No assigned",
                status: u?.is_active ?? "Inactive",
                // your payload used subscription_plan in the last message; surface both safely:
                subscription: u?.subscription ?? u?.subscription_plan ?? "none",
            }))
        )
    }, [data])

    // Close filter panel when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                filterPanelRef.current &&
                !filterPanelRef.current.contains(event.target) &&
                !event.target.closest("button[data-filter-toggle]")
            ) {
                setShowFilterPanel(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [filterPanelRef])

    // Handle sorting
    const requestSort = (key) => {
        let direction = "asc"
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc"
        }
        setSortConfig({ key, direction })
    }

    // Handle search
    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
        setCurrentPage(1)
    }

    // Apply filters
    const applyFilters = () => {
        setShowFilterPanel(false)
        setCurrentPage(1)
    }

    // Clear filters
    const clearFilters = () => {
        setFilters({
            subscription: "",
            status: "",
        })
    }

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    // Update mentor (UI; plug API call here)
    const updateMentor = (userId, mentor) => {
        const matchedMentor = mentorlist?.find((m) => m.full_name === mentor)
        setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, mentor } : user)))
        setEditingMentor(null)

        if (!userId || !matchedMentor?.id) {
            toast.error('Mentor assignment failed: missing user or mentor')
            return
        }

        axiosApi
            .post(`/admin_panel/api/v1/mentor-relation`, {
                mentee: userId,
                mentor: matchedMentor.id,
            })
            .then(() => {
                toast.success('Mentor assigned — they can now communicate in chat.')
            })
            .catch((error) => {
                console.error('Error updating mentor relation:', error)
                toast.error('Failed to assign mentor')
            })
    }

    // Update status (UI; plug API call here if needed)
    const updateStatus = (userId, status) => {
        setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, status } : user)))
        setEditingStatus(null)
    }

    // Get status class
    const getStatusClass = (status) => {
        switch (status) {
            case "Active":
                return "bg-green-100 text-green-800"
            case "Banned User":
                return "bg-red-100 text-red-800"
            case "Inactive":
                return "bg-gray-100 text-gray-800"
            case "Pending":
                return "bg-yellow-100 text-yellow-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const navigate = useNavigate()
    const start = ((currentPage - 1) * usersPerPage) + 1
    const end = Math.min(currentPage * usersPerPage, totalUsers || 0) // [MOD] safe end on last page


    const handleChangeStatus = async (userId) => {
        try {
            await axiosApi.patch(`/admin_panel/api/v1/ban-user/${userId}`)
            toast.success('User status changed successfully')
        } catch (error) {
            console.error('Error changing status:', error)
            toast.error('Failed to change user status')
        }
    }

    return (
        <div className="">
            <div className="flex justify-between my-5 relative">
                <div className="relative w-64">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full pl-10 pr-4 py-2 border-base-100 shadow-xl rounded-lg"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <button
                    className="flex items-center px-4 py-2 border border-base-300 shadow-md rounded-lg bg-gray-100 cursor-pointer"
                    onClick={() => setShowFilterPanel(!showFilterPanel)}
                    data-filter-toggle
                >
                    Filter
                    <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showFilterPanel ? "rotate-180" : ""}`} />
                </button>

                {/* Filter Panel */}
                {showFilterPanel && (
                    <div
                        ref={filterPanelRef}
                        className="absolute right-0 top-full mt-2 p-6 bg-white rounded-xl shadow-lg  z-10 w-[380px] sm:w-[500px]"
                    >
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Subscription</label>
                                <div className="relative">
                                    <select
                                        className="w-full p-2 border rounded-md appearance-none pl-3 pr-10 cursor-pointer"
                                        value={filters.subscription}
                                        onChange={(e) => setFilters({ ...filters, subscription: e.target.value })}
                                    >
                                        <option value="">Select</option>
                                        {subscriptionTypes.map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Status</label>
                                <div className="relative">
                                    <select
                                        className="w-full p-2 border rounded-md appearance-none pl-3 pr-10 cursor-pointer"
                                        value={filters.status}
                                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                    >
                                        <option value="">Select</option>
                                        {statuses.map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-4 mt-6">
                            <button
                                onClick={clearFilters}
                                className="px-6 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 cursor-pointer"
                            >
                                Clear
                            </button>
                            <button
                                onClick={applyFilters}
                                className="px-6 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 cursor-pointer"
                            >
                                Apply filter
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div
                style={{ height: 'calc(100vh - 210px)' }}
                className="p-4 bg-white rounded-lg shadow relative overflow-auto"
            >
                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b-3 border-base-300">
                                <th
                                    className="py-3 px-4 text-left cursor-pointer"
                                    onClick={() => requestSort("name")}
                                >
                                    <div className="flex items-center">
                                        Users
                                        {sortConfig.key === "name" &&
                                            (sortConfig.direction === "asc" ? (
                                                <ChevronUp className="ml-1 h-4 w-4" />
                                            ) : (
                                                <ChevronDown className="ml-1 h-4 w-4" />
                                            ))}
                                    </div>
                                </th>
                                <th className="py-3 px-4 text-left cursor-pointer" onClick={() => requestSort("email")}>
                                    <div className="flex items-center">
                                        Email
                                        {sortConfig.key === "email" &&
                                            (sortConfig.direction === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />)}
                                    </div>
                                </th>
                                <th className="py-3 px-4 text-left cursor-pointer" onClick={() => requestSort("subscription")}>
                                    <div className="flex items-center">
                                        Subscription
                                        {sortConfig.key === "subscription" &&
                                            (sortConfig.direction === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />)}
                                    </div>
                                </th>
                                <th className="py-3 px-4 text-left cursor-pointer" onClick={() => requestSort("mentor")}>
                                    <div className="flex items-center">
                                        Mentor
                                        {sortConfig.key === "mentor" &&
                                            (sortConfig.direction === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />)}
                                    </div>
                                </th>
                                <th className="py-3 px-4 text-left cursor-pointer" onClick={() => requestSort("status")}>
                                    <div className="flex items-center">
                                        Status
                                        {sortConfig.key === "status" &&
                                            (sortConfig.direction === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />)}
                                    </div>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {/* [MOD] render from local `users` */}
                            {users.map((user) => (
                                <tr key={user.id} className="border-b border-base-300 hover:bg-gray-50 ">
                                    <td
                                        onClick={() => {
                                            navigate(`/admindashboard/userlist/user/${user.id}`) // or navigate(`/user/profile/${user.id}`)
                                        }}
                                        className="py-3 px-4 cursor-pointer"
                                    >
                                        {user?.full_name || 'null'}
                                    </td>

                                    <td className="py-3 px-4">{user?.email}</td>

                                    {/* [MOD] subscription is taken from normalized field */}
                                    <td className="py-3 px-4">{user?.subscription}</td>

                                    {/* Mentor */}
                                    <td className="py-3 px-4 cursor-pointer">
                                        {editingMentor === user?.id ? (
                                            <div className="relative">
                                                <select
                                                    className="p-1 border rounded-md w-full"
                                                    value={user.mentor ?? "Not assigned"}
                                                    onChange={(e) => updateMentor(user.id, e.target.value)}
                                                    onBlur={() => setEditingMentor(null)}
                                                    autoFocus
                                                    style={{
                                                        maxHeight: "calc(100vh - 200px)",
                                                        overflowY: "auto",
                                                    }}
                                                >
                                                    {mentorlist?.map((mentor) => (
                                                        <option key={mentor.id} value={mentor?.full_name}>
                                                            {mentor?.full_name}
                                                        </option>
                                                    ))}
                                                </select>

                                            </div>
                                        ) : (
                                            <div className="cursor-pointer" onClick={() => setEditingMentor(user.id)}>
                                                {user?.mentor_profile || 'Not assigned'}
                                            </div>
                                        )}
                                    </td>

                                    {/* Status */}
                                    <td className="py-3 px-4 cursor-pointer">
                                        {editingStatus === user.id ? (
                                            <div className="relative">
                                                <select
                                                    className="p-1 border rounded-md "
                                                    value={user.status ?? "Inactive"}            // [MOD] controlled + safe default
                                                    onChange={(e) => {
                                                        handleChangeStatus(user.id)
                                                        updateStatus(user.id, e.target.value)
                                                    }}
                                                    onBlur={() => setEditingStatus(null)}
                                                    autoFocus
                                                >
                                                    {statuses.map((status) => (
                                                        <option key={status} value={status}>
                                                            {status}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        ) : (
                                            <div
                                                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(user.status)}`}
                                                onClick={() => setEditingStatus(user.id)}
                                            >
                                                {user.status || 'No status'}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-gray-700">
                        {start} to {end} of {totalUsers}
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="p-1 rounded-md hover:bg-gray-100" onClick={() => paginate(1)} disabled={currentPage === 1}>
                            <ChevronsLeft className="h-5 w-5" />
                        </button>
                        <button
                            className="p-1 rounded-md hover:bg-gray-100"
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <span className="text-sm">
                            Page {currentPage} of {data?.total_pages || 0}
                        </span>
                        <button
                            className="p-1 rounded-md hover:bg-gray-100"
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                        <button
                            className="p-1 rounded-md hover:bg-gray-100"
                            onClick={() => paginate(totalPages)}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronsRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
