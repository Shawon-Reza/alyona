"use client"

import { NavLink, Outlet, useLocation } from "react-router-dom"
import { ChevronRight } from "lucide-react"
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
            <div className="flex items-center text-sm text-gray-600 mb-6">
                <span className="cursor-pointer hover:text-gray-900">Users List</span>
                <ChevronRight className="w-4 h-4 mx-2" />
                <span className="text-gray-900">Janet A.</span>
            </div>

            {/* Main Content */}
            <div className=" ">
                {location.pathname !== '/admindashboard/user-profile-layout' && (
                    <div>
                        {/* Tabs */}
                        <div className="border-b border-gray-200">
                            <nav className="flex">
                                <NavLink
                                    to="user/profile"
                                    className={({ isActive }) =>
                                        `px-8 py-4 text-sm font-medium border-b-2 transition-colors ${isActive ? "border-amber-500 text-amber-600" : "border-transparent text-gray-500 hover:text-gray-700"
                                        }`
                                    }
                                >
                                    Profile
                                </NavLink>
                                <NavLink
                                    to="user/products"
                                    className={({ isActive }) =>
                                        `px-8 py-4 text-sm font-medium border-b-2 transition-colors ${isActive ? "border-amber-500 text-amber-600" : "border-transparent text-gray-500 hover:text-gray-700"
                                        }`
                                    }
                                >
                                    Products
                                </NavLink>
                                <NavLink
                                    to="user/ai"
                                    className={({ isActive }) =>
                                        `px-8 py-4 text-sm font-medium border-b-2 transition-colors ${isActive ? "border-amber-500 text-amber-600" : "border-transparent text-gray-500 hover:text-gray-700"
                                        }`
                                    }
                                >
                                    AI
                                </NavLink>
                                <NavLink
                                    to="user/dashboard"
                                    className={({ isActive }) =>
                                        `px-8 py-4 text-sm font-medium border-b-2 transition-colors ${isActive ? "border-amber-500 text-amber-600" : "border-transparent text-gray-500 hover:text-gray-700"
                                        }`
                                    }
                                >
                                    Dashboard
                                </NavLink>
                            </nav>
                        </div>

                        {/* User Header */}


                        <div className="p-6 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <img
                                        src={userprofile || "/placeholder.svg"}
                                        alt={userData.name}
                                        className="w-16 h-16 rounded-xl object-cover mr-4"
                                    />
                                    <div>
                                        <h1 className="text-2xl font-semibold text-gray-900">{userData.name}</h1>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                        {userData.status}
                                        <ChevronRight className="w-4 h-4 ml-1" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Content Area - This is where child components will render */}
                <div className="p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
