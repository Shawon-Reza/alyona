"use client"

import { Menu, User, ChevronDown } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function AdminDashboardNavbar({ toggleView }) {
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)


    const navigate = useNavigate()
    return (
        <nav className="w-full h-16 bg-white/50 rounded-xl border-b border-orange-100 px-4 md:px-6 flex items-center justify-between">
            <div>

            </div>

            {/* Mobile Menu Button - visible on small screens */}
            <button className="md:hidden p-2 rounded-lg hover:bg-orange-50 transition-colors">
                <Menu
                    onClick={toggleView}
                    className="w-6 h-6 text-gray-600 cursor-pointer" />
            </button>

            {/* Desktop User Profile Section - visible on medium screens and up */}
            <div className="hidden md:flex items-center gap-4">
                {/* User Profile Dropdown */}
                <div className="relative">
                    <button
                        // onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}

                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-orange-50 transition-colors cursor-pointer"
                    >
                        {/* User Avatar */}
                        <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-orange-600" />
                        </div>

                        {/* User Info */}
                        <div className="text-left">
                            <div className="text-sm font-medium text-gray-800">Alyona</div>
                            <div className="text-xs text-gray-500">Admin</div>
                        </div>

                        {/* Dropdown Arrow */}
                        <ChevronDown
                            className={`w-4 h-4 text-gray-400 transition-transform ${isProfileDropdownOpen ? "rotate-180" : ""}`}
                        />
                    </button>

                    {/* Dropdown Menu */}
                    {isProfileDropdownOpen && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-orange-100 rounded-lg shadow-lg py-2 z-50">
                            <a href="/maindashboard"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 transition-colors">
                                View Profile
                            </a>
                            <a
                                href="/settings"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 transition-colors"
                            >
                                Settings
                            </a>
                            <hr className="my-2 border-orange-100" />
                            <button
                                onClick={() => {
                                    // Add logout logic here
                                    console.log("Logging out...")
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}
