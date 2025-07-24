"use client"

import { useState, useRef, useEffect } from "react"
import { Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

// Sample data based on the image
const initialUsers = [
    { id: 1, name: "Carlos Ramirez", email: "name@example.com", subscription: "Free", mentor: "-", status: "Active" },
    {
        id: 2,
        name: "Emma Thompson",
        email: "name@example.com",
        subscription: "Premium",
        mentor: "No assigned",
        status: "Active",
    },
    { id: 3, name: "David Lee", email: "name@example.com", subscription: "Premium", mentor: "Maya", status: "Active" },
    { id: 4, name: "Sophia Patel", email: "name@example.com", subscription: "Premium", mentor: "Lily", status: "Active" },
    {
        id: 5,
        name: "Michael Chen",
        email: "name@example.com",
        subscription: "Premium",
        mentor: "Chloe",
        status: "Active",
    },
    {
        id: 6,
        name: "Olivia Martinez",
        email: "name@example.com",
        subscription: "Premium",
        mentor: "Ava",
        status: "Active",
    },
    {
        id: 7,
        name: "James Smith",
        email: "name@example.com",
        subscription: "Premium",
        mentor: "Isabella",
        status: "Active",
    },
    {
        id: 8,
        name: "Isabella Brown",
        email: "name@example.com",
        subscription: "Premium",
        mentor: "Grace",
        status: "Active",
    },
    { id: 9, name: "Liam Wilson", email: "name@example.com", subscription: "Premium", mentor: "Emma", status: "Active" },
    { id: 10, name: "Mia Davis", email: "name@example.com", subscription: "Premium", mentor: "Olivia", status: "Active" },
    { id: 11, name: "Ethan Garcia", email: "name@example.com", subscription: "Premium", mentor: "Mia", status: "Active" },
    {
        id: 12,
        name: "Ava Rodriguez",
        email: "name@example.com",
        subscription: "Premium",
        mentor: "Aria",
        status: "Active",
    },
    {
        id: 13,
        name: "Noah Lewis",
        email: "name@example.com",
        subscription: "Premium",
        mentor: "Scarlett",
        status: "Active",
    },
    {
        id: 14,
        name: "Charlotte Walker",
        email: "name@example.com",
        subscription: "Premium",
        mentor: "Sofia",
        status: "Active",
    },
    { id: 15, name: "Lucas Hall", email: "name@example.com", subscription: "Free", mentor: "-", status: "Banned User" },
    { id: 16, name: "Amelia Young", email: "name@example.com", subscription: "Free", mentor: "-", status: "Active" },
]

// Available mentors for dropdown
const mentors = [
    "Maya",
    "Lily",
    "Chloe",
    "Ava",
    "Isabella",
    "Grace",
    "Emma",
    "Olivia",
    "Mia",
    "Aria",
    "Scarlett",
    "Sofia",
    "No assigned",
]

// Available statuses for dropdown
const statuses = ["Active", "Inactive", "Banned User", "Pending"]

// Add these constants after the existing constants
const subscriptionTypes = ["Premium", "Free", "Producto"]

// Update the component function to include filter panel state and functionality
export default function UserManagementTable() {
    const [users, setUsers] = useState(initialUsers)
    const [searchTerm, setSearchTerm] = useState("")
    const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" })
    const [currentPage, setCurrentPage] = useState(1)
    const [editingMentor, setEditingMentor] = useState(null)
    const [editingStatus, setEditingStatus] = useState(null)
    const [showFilterPanel, setShowFilterPanel] = useState(false)
    const [filters, setFilters] = useState({
        subscription: "",
        status: "",
    })
    const filterPanelRef = useRef(null)

    const usersPerPage = 15
    const totalUsers = 8618 // From the image
    const totalPages = 431 // From the image

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

    // Get sorted users
    const getSortedUsers = () => {
        const sortableUsers = [...users]
        sortableUsers.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === "asc" ? -1 : 1
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === "asc" ? 1 : -1
            }
            return 0
        })
        return sortableUsers
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

    // Filter users based on search term and filters
    const filteredUsers = getSortedUsers().filter((user) => {
        // Search filter
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.subscription.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.mentor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.status.toLowerCase().includes(searchTerm.toLowerCase())

        // Subscription filter
        const matchesSubscription = !filters.subscription || user.subscription === filters.subscription

        // Status filter
        const matchesStatus = !filters.status || user.status === filters.status

        return matchesSearch && matchesSubscription && matchesStatus
    })

    // Pagination
    const indexOfLastUser = currentPage * usersPerPage
    const indexOfFirstUser = indexOfLastUser - usersPerPage
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    // Update mentor
    const updateMentor = (userId, mentor) => {
        setUsers(users.map((user) => (user.id === userId ? { ...user, mentor } : user)))
        setEditingMentor(null)
    }

    // Update status
    const updateStatus = (userId, status) => {
        setUsers(users.map((user) => (user.id === userId ? { ...user, status } : user)))
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
                        className="absolute right-0 top-full mt-2 p-6 bg-white rounded-xl shadow-lg  z-10 w-[500px]"
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
                className="p-4 bg-white rounded-lg shadow relative overflow-auto">
                {/* Search and Filter */}
                <div className="flex justify-between mb-4">

                    <div className="relative">



                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collap">
                        <thead>
                            <tr className="border-b-3 border-base-300">
                                <th className="py-3 px-4 text-left cursor-pointer"

                                    onClick={() => requestSort("name")}>
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
                                            (sortConfig.direction === "asc" ? (
                                                <ChevronUp className="ml-1 h-4 w-4" />
                                            ) : (
                                                <ChevronDown className="ml-1 h-4 w-4" />
                                            ))}
                                    </div>
                                </th>
                                <th className="py-3 px-4 text-left cursor-pointer" onClick={() => requestSort("subscription")}>
                                    <div className="flex items-center">
                                        Subscription
                                        {sortConfig.key === "subscription" &&
                                            (sortConfig.direction === "asc" ? (
                                                <ChevronUp className="ml-1 h-4 w-4" />
                                            ) : (
                                                <ChevronDown className="ml-1 h-4 w-4" />
                                            ))}
                                    </div>
                                </th>
                                <th className="py-3 px-4 text-left cursor-pointer" onClick={() => requestSort("mentor")}>
                                    <div className="flex items-center">
                                        Mentor
                                        {sortConfig.key === "mentor" &&
                                            (sortConfig.direction === "asc" ? (
                                                <ChevronUp className="ml-1 h-4 w-4" />
                                            ) : (
                                                <ChevronDown className="ml-1 h-4 w-4" />
                                            ))}
                                    </div>
                                </th>
                                <th className="py-3 px-4 text-left cursor-pointer" onClick={() => requestSort("status")}>
                                    <div className="flex items-center">
                                        Status
                                        {sortConfig.key === "status" &&
                                            (sortConfig.direction === "asc" ? (
                                                <ChevronUp className="ml-1 h-4 w-4" />
                                            ) : (
                                                <ChevronDown className="ml-1 h-4 w-4" />
                                            ))}
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user) => (
                                <tr key={user.id} className="border-b border-base-300 hover:bg-gray-50 ">
                                    <td
                                        onClick={() => {
                                            navigate('user/profile')
                                        }}
                                        className="py-3 px-4 cursor-pointer">{user.name}</td>
                                    <td className="py-3 px-4">{user.email}</td>
                                    <td className="py-3 px-4">{user.subscription}</td>
                                    <td className="py-3 px-4 cursor-pointer">
                                        {editingMentor === user.id ? (
                                            <div className="relative">
                                                <select
                                                    className="w-full p-2 border rounded-md pr-8"
                                                    value={user.mentor}
                                                    onChange={(e) => updateMentor(user.id, e.target.value)}
                                                    onBlur={() => setEditingMentor(null)}
                                                    autoFocus
                                                >
                                                    {mentors.map((mentor) => (
                                                        <option key={mentor} value={mentor}>
                                                            {mentor}
                                                        </option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="absolute right-2 top-3 h-4 w-4 pointer-events-none" />
                                            </div>
                                        ) : (
                                            <div className="cursor-pointer" onClick={() => setEditingMentor(user.id)}>
                                                {user.mentor}
                                            </div>
                                        )}
                                    </td>
                                    <td className="py-3 px-4 cursor-pointer">
                                        {editingStatus === user.id ? (
                                            <div className="relative">
                                                <select
                                                    className="w-full p-2 border rounded-md pr-8"
                                                    value={user.status}
                                                    onChange={(e) => updateStatus(user.id, e.target.value)}
                                                    onBlur={() => setEditingStatus(null)}
                                                    autoFocus
                                                >
                                                    {statuses.map((status) => (
                                                        <option key={status} value={status}>
                                                            {status}
                                                        </option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="absolute right-2 top-3 h-4 w-4 pointer-events-none" />
                                            </div>
                                        ) : (
                                            <div
                                                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(user.status)}`}
                                                onClick={() => setEditingStatus(user.id)}
                                            >
                                                {user.status}
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
                    <div className="text-sm text-gray-700">1 to 20 of {totalUsers}</div>
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
                            Page {currentPage} of {totalPages}
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
