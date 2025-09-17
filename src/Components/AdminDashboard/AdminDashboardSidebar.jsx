import { NavLink, useNavigate } from "react-router-dom"; // Import NavLink from react-router-dom
import { LayoutGrid, Users, ShoppingBag, UserPlus, LogOut } from "lucide-react";
import AdminDashboardNavbar from "./AdminDashboardNavbar";
import useIsBelowMd from "../../hooks/useIsBelowMd";
import logo from "../../assets/logo.png"

export default function AdminDashboardSidebar({ handleSidebarItemClick, toggleView }) {
    const isBelowMd = useIsBelowMd();
    const navigate = useNavigate()

    return (
        <div className={`w-72 min-h-[calc(100vh-50px)] mb-5 shadow-lg  bg-white/50 border-r border-base-100 rounded-2xl ${isBelowMd ? "w-screen pr-10" : " "}`}>
            <div className="p-6">

                {/* Navbar Show only when Device is below medium size. */}
                {isBelowMd && (
                    <div className="mb-5 -mt-6">
                        <AdminDashboardNavbar toggleView={toggleView}></AdminDashboardNavbar>
                    </div>
                )}

                 {/* Logo */}
                            <div className="flex items-center mb-8">
                                <img
                                    src={logo} // Replace with your actual logo path
                                    alt="Logo"
                                    className="w-10 md:w-12 h-12 md:h-15 rounded-full"
                                />
                                <span className="ml-3 font-semibold text-lg text-gray-700">YOURSELF BEAUTY</span>
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
                        to="/admindashboard/userlist"
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
