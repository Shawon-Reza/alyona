"use client"

import { useState, useRef, useEffect } from "react"
import {
    Search,
    ChevronDown,
    ChevronUp,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Plus,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

// Sample data based on the image
const initialMentors = [
    {
        id: 1,
        name: "Carlos Ramirez",
        email: "name@example.com",
        users: 15,
        region: "Region 2",
        mentor: "(555) 123-4567",
        status: "Active",
    },
    {
        id: 2,
        name: "Emma Thompson",
        email: "name@example.com",
        users: 2,
        region: "Region 3",
        mentor: "(555) 234-5678",
        status: "Active",
    },
    {
        id: 3,
        name: "David Lee",
        email: "name@example.com",
        users: 5,
        region: "Region 1",
        mentor: "(555) 234-5678",
        status: "Active",
    },
    {
        id: 4,
        name: "Sophia Patel",
        email: "name@example.com",
        users: 7,
        region: "Region 2",
        mentor: "(555) 345-6789",
        status: "Active",
    },
    {
        id: 5,
        name: "Michael Chen",
        email: "name@example.com",
        users: 1,
        region: "Region 3",
        mentor: "(555) 456-7890",
        status: "Active",
    },
    {
        id: 6,
        name: "Olivia Martinez",
        email: "name@example.com",
        users: 2,
        region: "Region 1",
        mentor: "(555) 567-8901",
        status: "Active",
    },
    {
        id: 7,
        name: "James Smith",
        email: "name@example.com",
        users: 9,
        region: "Region 2",
        mentor: "(555) 678-9012",
        status: "Active",
    },
    {
        id: 8,
        name: "Isabella Brown",
        email: "name@example.com",
        users: 0,
        region: "Region 3",
        mentor: "(555) 789-0123",
        status: "Active",
    },
    {
        id: 9,
        name: "Liam Wilson",
        email: "name@example.com",
        users: 14,
        region: "Region 1",
        mentor: "(555) 890-1234",
        status: "Active",
    },
    {
        id: 10,
        name: "Mia Davis",
        email: "name@example.com",
        users: 12,
        region: "Region 2",
        mentor: "(555) 901-2345",
        status: "Active",
    },
    {
        id: 11,
        name: "Ethan Garcia",
        email: "name@example.com",
        users: 12,
        region: "Region 3",
        mentor: "(555) 012-3456",
        status: "Active",
    },
    {
        id: 12,
        name: "Ava Rodriguez",
        email: "name@example.com",
        users: 14,
        region: "Region 1",
        mentor: "(555) 135-2468",
        status: "Active",
    },
    {
        id: 13,
        name: "Noah Lewis",
        email: "name@example.com",
        users: 14,
        region: "Region 2",
        mentor: "(555) 246-3579",
        status: "Active",
    },
    {
        id: 14,
        name: "Charlotte Walker",
        email: "name@example.com",
        users: 1,
        region: "Region 3",
        mentor: "(555) 357-4680",
        status: "Active",
    },
    {
        id: 15,
        name: "Lucas Hall",
        email: "name@example.com",
        users: "Free",
        region: "Region 1",
        mentor: "(555) 468-5791",
        status: "Banned User",
    },
    {
        id: 16,
        name: "Amelia Young",
        email: "name@example.com",
        users: "2024-07-21",
        region: "Region 2",
        mentor: "(555) 579-6802",
        status: "Active",
    },
]

// Available regions for filter
const regions = ["Region 1", "Region 2", "Region 3"]

// Available statuses for dropdown
const statuses = ["Active", "Inactive", "Banned User", "Pending"]

export default function MentorManagementTable() {
    const [mentors, setMentors] = useState(initialMentors)
    const [searchTerm, setSearchTerm] = useState("")
    const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" })
    const [currentPage, setCurrentPage] = useState(1)
    const [editingStatus, setEditingStatus] = useState(null)
    const [showFilterPanel, setShowFilterPanel] = useState(false)
    const [filters, setFilters] = useState({
        region: "",
        status: "",
    })
    const filterPanelRef = useRef(null)

    const mentorsPerPage = 20
    const totalMentors = 8618 // From the image
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

    // Get sorted mentors
    const getSortedMentors = () => {
        const sortableMentors = [...mentors]
        sortableMentors.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === "asc" ? -1 : 1
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === "asc" ? 1 : -1
            }
            return 0
        })
        return sortableMentors
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
            region: "",
            status: "",
        })
    }

    // Filter mentors based on search term and filters
    const filteredMentors = getSortedMentors().filter((mentor) => {
        // Search filter
        const matchesSearch =
            mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mentor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mentor.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mentor.mentor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mentor.status.toLowerCase().includes(searchTerm.toLowerCase())

        // Region filter
        const matchesRegion = !filters.region || mentor.region === filters.region

        // Status filter
        const matchesStatus = !filters.status || mentor.status === filters.status

        return matchesSearch && matchesRegion && matchesStatus
    })

    // Pagination
    const indexOfLastMentor = currentPage * mentorsPerPage
    const indexOfFirstMentor = indexOfLastMentor - mentorsPerPage
    const currentMentors = filteredMentors.slice(indexOfFirstMentor, indexOfLastMentor)

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    // Update status
    const updateStatus = (mentorId, status) => {
        setMentors(mentors.map((mentor) => (mentor.id === mentorId ? { ...mentor, status } : mentor)))
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

    // Handle add mentor
    const handleAddMentor = () => {
        console.log("Add mentor clicked")
    }
    const navigate = useNavigate()
    return (
        <div className=" rounded-lg shadow relative mt-4">
            {/* Header with Search, Add Mentor, and Filter */}
            <div className="flex justify-between items-center mb-4">
                <div className="relative w-64">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full pl-10 pr-4 py-2 border rounded-lg"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>

                <div className="flex items-center gap-3">
                    {/* Add Mentor */}
                    <button
                        onClick={() => {
                            handleAddMentor()
                            navigate('create-user-mentor')
                        }}
                        className="flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors cursor-pointer"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add a mentor
                    </button>

                    <div className="relative ">
                        <button
                            className="flex items-center px-4 py-2 border rounded-lg bg-gray-100 cursor-pointer"
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
                                className="absolute right-0 top-full mt-2 p-6 bg-white rounded-lg shadow-lg border z-10 w-[400px]"
                            >
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Region</label>
                                        <div className="relative">
                                            <select
                                                className="w-full p-2 border rounded-md appearance-none pl-3 pr-10"
                                                value={filters.region}
                                                onChange={(e) => setFilters({ ...filters, region: e.target.value })}
                                            >
                                                <option value="">All Regions</option>
                                                {regions.map((region) => (
                                                    <option key={region} value={region}>
                                                        {region}
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
                                                className="w-full p-2 border rounded-md appearance-none pl-3 pr-10"
                                                value={filters.status}
                                                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                            >
                                                <option value="">All Statuses</option>
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
                                        className="px-6 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50"
                                    >
                                        Clear
                                    </button>
                                    <button
                                        onClick={applyFilters}
                                        className="px-6 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600"
                                    >
                                        Apply filter
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-2xl">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-base-300">
                            <th className="py-3 px-4 text-left cursor-pointer" onClick={() => requestSort("name")}>
                                <div className="flex items-center">
                                    Mentors
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
                            <th className="py-3 px-4 text-left cursor-pointer" onClick={() => requestSort("users")}>
                                <div className="flex items-center">
                                    Users
                                    {sortConfig.key === "users" &&
                                        (sortConfig.direction === "asc" ? (
                                            <ChevronUp className="ml-1 h-4 w-4" />
                                        ) : (
                                            <ChevronDown className="ml-1 h-4 w-4" />
                                        ))}
                                </div>
                            </th>
                            <th className="py-3 px-4 text-left cursor-pointer" onClick={() => requestSort("region")}>
                                <div className="flex items-center">
                                    Region
                                    {sortConfig.key === "region" &&
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
                        {currentMentors.map((mentor) => (
                            <tr key={mentor.id} className="border-b border-base-300 hover:bg-gray-50">
                                <td className="py-3 px-4">{mentor.name}</td>
                                <td className="py-3 px-4">{mentor.email}</td>
                                <td className="py-3 px-4">{mentor.users}</td>
                                <td className="py-3 px-4">{mentor.region}</td>
                                <td className="py-3 px-4">{mentor.mentor}</td>
                                <td className="py-3 px-4">
                                    {editingStatus === mentor.id ? (
                                        <div className="relative">
                                            <select
                                                className="w-full p-2 border rounded-md pr-8"
                                                value={mentor.status}
                                                onChange={(e) => updateStatus(mentor.id, e.target.value)}
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
                                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium cursor-pointer ${getStatusClass(mentor.status)}`}
                                            onClick={() => setEditingStatus(mentor.id)}
                                        >
                                            {mentor.status}
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
                <div className="text-sm text-gray-700">1 to 20 of {totalMentors.toLocaleString()}</div>
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
    )
}
