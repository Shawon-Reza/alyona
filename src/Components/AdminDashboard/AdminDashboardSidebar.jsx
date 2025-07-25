import { NavLink, useNavigate } from "react-router-dom"; // Import NavLink from react-router-dom
import { LayoutGrid, Users, ShoppingBag, UserPlus, LogOut } from "lucide-react";
import AdminDashboardNavbar from "./AdminDashboardNavbar";
import useIsBelowMd from "../../hooks/useIsBelowMd";

export default function AdminDashboardSidebar({ handleSidebarItemClick, toggleView }) {
    const isBelowMd = useIsBelowMd();
    const navigate = useNavigate()

    return (
        <div className={`w-full h-screen bg-white/50 border-r border-base-100 rounded-xl ${isBelowMd ? "w-screen pr-10" : " "}`}>
            <div className="p-6">

                {/* Navbar Show only when Device is below medium size. */}
                {isBelowMd && (
                    <div className="mb-5">
                        <AdminDashboardNavbar toggleView={toggleView}></AdminDashboardNavbar>
                    </div>
                )}

                {/* Logo/Brand */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-orange-400 rounded-full"></div>
                    </div>
                    <span className="font-medium text-gray-800 text-sm tracking-wide">YOURSELF BEAUTY</span>
                </div>

                {/* Navigation Items */}
                <nav className="space-y-2">
                    {/* Dashboard - Active */}
                    <NavLink
                        to="/admindashboard"
                        onClick={handleSidebarItemClick}
                        end
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? 'bg-orange-100 text-gray-800 font-medium' : 'text-gray-600 hover:bg-orange-100 hover:text-gray-800'} transition-colors`
                        }
                    >
                        <LayoutGrid className="w-5 h-5" />
                        <span>Dashboard</span>
                    </NavLink>

                    {/* Users */}
                    <NavLink
                        to="/admindashboard/user-profile-layout"
                        onClick={handleSidebarItemClick}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? 'bg-orange-100 text-gray-800 font-medium' : 'text-gray-600 hover:bg-orange-100 hover:text-gray-800'} transition-colors`
                        }
                    >
                        <Users className="w-5 h-5" />
                        <span>Users</span>
                    </NavLink>

                    {/* Products */}
                    <NavLink
                        to="products"
                        onClick={handleSidebarItemClick}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? 'bg-orange-100 text-gray-800 font-medium' : 'text-gray-600 hover:bg-orange-100 hover:text-gray-800'} transition-colors`
                        }
                    >
                        <ShoppingBag className="w-5 h-5" />
                        <span>Products</span>
                    </NavLink>

                    {/* Create a mentor */}
                    <NavLink
                        to="create-mentor"
                        onClick={handleSidebarItemClick}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? 'bg-orange-100 text-gray-800 font-medium' : 'text-gray-600 hover:bg-orange-100 hover:text-gray-800'} transition-colors`
                        }
                    >
                        <UserPlus className="w-5 h-5" />
                        <span>Create a mentor</span>
                    </NavLink>

                    {/* Log out */}
                    <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-orange-100 hover:text-gray-800 transition-colors w-full text-left">
                        <LogOut className="w-5 h-5" />
                        <span>Log out</span>
                    </button>
                </nav>
            </div>
        </div>
    );
}
