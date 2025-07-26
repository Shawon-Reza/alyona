"use client"
import { NavLink, Outlet, useLocation } from "react-router-dom"
import { ChevronRight, ChevronLeft } from 'lucide-react'
import userprofile from '../assets/userprofile.png'

const userData = {
    name: "Janet Arias",
    avatar: "/placeholder.svg?height=60&width=60",
    status: "Active",
}

export default function UserProfileLayout() {
    const location = useLocation();
    console.log(location)

    return (
        <div className="min-h-screen ">
            {/* Breadcrumb */}
            <div className="flex items-center text-xs md:text-sm text-gray-600 mb-4 md:mb-6 px-4 md:px-0 mt-4">
                <span className="cursor-pointer hover:text-gray-900 truncate">Users List</span>
                <ChevronRight className="w-3 h-3 md:w-4 md:h-4 mx-1 md:mx-2 flex-shrink-0" />
                <span className="text-gray-900 truncate">Janet A.</span>
            </div>

            {/* Main Content */}
            <div className="">
                {location.pathname !== '/admindashboard/user-profile-layout' && (
                    <div>
                        {/* Mobile Back Button - Only visible on mobile */}
                        <div className="md:hidden px-4 mb-4">
                            <button 
                                onClick={() => window.history.back()}
                                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4 mr-1" />
                                <span className="text-sm">Back to Users</span>
                            </button>
                        </div>

                        {/* User Header */}
                        <div className="p-4 md:p-6 border-b border-gray-100">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div className="flex items-center mb-3 md:mb-0">
                                    <img
                                        src={userprofile || "/placeholder.svg"}
                                        alt={userData.name}
                                        className="w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl object-cover mr-3 md:mr-4 flex-shrink-0"
                                    />
                                    <div className="min-w-0 flex-1">
                                        <h1 className="text-lg md:text-2xl font-semibold text-gray-900 truncate">
                                            {userData.name}
                                        </h1>
                                        {/* Mobile: Show status below name */}
                                        <div className="md:hidden mt-1">
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                {userData.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {/* Desktop: Show status on the right */}
                                <div className="hidden md:flex items-center">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                        {userData.status}
                                        <ChevronRight className="w-4 h-4 ml-1" />
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="border-b border-gray-200 sticky top-0 z-10">
                            {/* Mobile: Horizontal scrollable tabs */}
                            <nav className="flex md:flex overflow-x-auto scrollbar-hide">
                                <NavLink
                                    to="user/profile"
                                    className={({ isActive }) =>
                                        `px-4 md:px-8 py-3 md:py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
                                            isActive 
                                                ? "border-amber-500 text-amber-600" 
                                                : "border-transparent text-gray-500 hover:text-gray-700"
                                        }`
                                    }
                                >
                                    Profile
                                </NavLink>
                                <NavLink
                                    to="user/products"
                                    className={({ isActive }) =>
                                        `px-4 md:px-8 py-3 md:py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
                                            isActive 
                                                ? "border-amber-500 text-amber-600" 
                                                : "border-transparent text-gray-500 hover:text-gray-700"
                                        }`
                                    }
                                >
                                    Products
                                </NavLink>
                                <NavLink
                                    to="user/ai"
                                    className={({ isActive }) =>
                                        `px-4 md:px-8 py-3 md:py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
                                            isActive 
                                                ? "border-amber-500 text-amber-600" 
                                                : "border-transparent text-gray-500 hover:text-gray-700"
                                        }`
                                    }
                                >
                                    AI
                                </NavLink>
                                <NavLink
                                    to="user/dashboard"
                                    className={({ isActive }) =>
                                        `px-4 md:px-8 py-3 md:py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
                                            isActive 
                                                ? "border-amber-500 text-amber-600" 
                                                : "border-transparent text-gray-500 hover:text-gray-700"
                                        }`
                                    }
                                >
                                    Dashboard
                                </NavLink>
                            </nav>
                        </div>
                    </div>
                )}

                {/* Content Area - This is where child components will render */}
                <div className="py-4 md:p-6">
                    <Outlet />
                </div>
            </div>

            {/* Custom CSS for hiding scrollbar */}
            <style jsx>{`
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    )
}