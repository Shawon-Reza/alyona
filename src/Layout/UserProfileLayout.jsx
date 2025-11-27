"use client"
import { NavLink, Outlet, useLocation, useNavigate, useParams } from "react-router-dom"
import { ChevronRight, ChevronLeft } from 'lucide-react'
import userprofile from '../assets/userprofile.png'
import { use } from "react"
import { useQuery } from "@tanstack/react-query"
import axiosApi from "@/api/axiosApi"


export default function UserProfileLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location)
    const { id } = useParams();





    const { isPending, error, data } = useQuery({
        queryKey: ['userInfo', id],
        queryFn: async () => {
            const res = await axiosApi.get(`/admin_panel/api/v1/minimal-user-info/${id}`);
            return res.data;
        },
    })
    console.log(data)
    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <div className="min-h-screen " >
            {/* Breadcrumb */}
            <div className="flex items-center text-xs md:text-sm text-gray-600 mb-4 md:mb-6 px-4 md:px-0 mt-4">
                <span
                    onClick={() => {
                        navigate("/admindashboard/userlist")
                    }}
                    className="cursor-pointer hover:text-gray-900 truncate">Users List</span>
                <ChevronRight className="w-3 h-3 md:w-4 md:h-4 mx-1 md:mx-2 flex-shrink-0" />
                <span className="text-gray-900 truncate">{data?.full_name || 'Unnamed User'}</span>
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
                                        src={`http://10.10.13.80:8005${data?.image_url || "user.svg"}`}
                                        alt={data?.full_name || "User Avatar"}

                                        className="w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl object-cover mr-3 md:mr-4 flex-shrink-0"
                                    />
                                    <div className="min-w-0 flex-1">
                                        <h1 className="text-lg md:text-2xl font-semibold text-gray-900 truncate">
                                            {data?.full_name || 'Unnamed User'}
                                        </h1>
                                        {/* Mobile: Show status below name */}
                                        <div className="md:hidden mt-1">
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                {data?.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {/* Desktop: Show status on the right */}
                                <div className="hidden md:flex items-center">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                        {data?.is_active ? 'Active' : 'Inactive'}
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
                                    to="profile"
                                    end={false}

                                    className={({ isActive }) =>
                                        `px-4 md:px-8 py-3 md:py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${isActive
                                            ? "border-amber-500 text-amber-600"
                                            : "border-transparent text-gray-500 hover:text-gray-700"
                                        }`
                                    }
                                >
                                    Profile
                                </NavLink>
                                <NavLink
                                    to="products"
                                    className={({ isActive }) =>
                                        `px-4 md:px-8 py-3 md:py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${isActive
                                            ? "border-amber-500 text-amber-600"
                                            : "border-transparent text-gray-500 hover:text-gray-700"
                                        }`
                                    }
                                >
                                    Products
                                </NavLink>
                                <NavLink
                                    to="ai"
                                    className={({ isActive }) =>
                                        `px-4 md:px-8 py-3 md:py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${isActive
                                            ? "border-amber-500 text-amber-600"
                                            : "border-transparent text-gray-500 hover:text-gray-700"
                                        }`
                                    }
                                >
                                    AI
                                </NavLink>
                                <NavLink
                                    to="dashboard"
                                    className={({ isActive }) =>
                                        `px-4 md:px-8 py-3 md:py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${isActive
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
                <div className="py-4 xl:p-6">
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