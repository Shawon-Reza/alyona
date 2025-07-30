import React from 'react';
import { NavLink } from 'react-router-dom'; // Importing NavLink for routing
import { FaHome, FaComments, FaFileAlt, FaBell, FaSignOutAlt } from 'react-icons/fa'; // Icons for sidebar items
import logo from '../../assets/logo.png'

const MentorDashboardSidebar = ({handleSidebarItemClick}) => {
    return (
        <div className="h-full w-[calc(100vw-50px)] md:w-64 bg-white shadow-md p-6 rounded-2xl">
            {/* Logo */}
            <div className="flex items-center mb-8">
                <img
                    src={logo} // Replace with your actual logo path
                    alt="Logo"
                    className="w-10 h-12 rounded-full"
                />
                <span className="ml-3 font-semibold text-lg text-gray-700">YOURSELF BEAUTY</span>
            </div>

            {/* Sidebar Navigation */}
            <div className="space-y-6">
                <NavLink
                    to="/mentordashboard"
                    end // This is the correct path for Home
                    onClick={handleSidebarItemClick}
                    className={({ isActive }) =>
                        isActive
                            ? "flex items-center space-x-3 py-3 px-4 text-gray-900 bg-[#F5EBE2] rounded-lg"
                            : "flex items-center space-x-3 py-3 px-4 text-gray-600 hover:bg-[#f7f1ec] rounded-lg"
                    }
                >
                    <FaHome className="w-5 h-5" />
                    <span>Home</span>
                </NavLink>

                <NavLink
                    to="chats"
                    onClick={handleSidebarItemClick}
                    className={({ isActive }) =>
                        isActive
                            ? "flex items-center space-x-3 py-3 px-4 text-gray-900 bg-[#f7f1ec] rounded-lg"
                            : "flex items-center space-x-3 py-3 px-4 text-gray-600 hover:bg-[#f7f1ec] rounded-lg"
                    }
                >
                    <FaComments className="w-5 h-5" />
                    <span>Chats</span>
                </NavLink>

                <NavLink
                    to="reports"
                    onClick={handleSidebarItemClick}
                    className={({ isActive }) =>
                        isActive
                            ? "flex items-center space-x-3 py-3 px-4 text-gray-900 bg-[#f7f1ec] rounded-lg"
                            : "flex items-center space-x-3 py-3 px-4 text-gray-600 hover:bg-[#f7f1ec] rounded-lg"
                    }
                >
                    <FaFileAlt className="w-5 h-5" />
                    <span>Reports</span>
                </NavLink>

                {/* Notification Composer Link */}
                <NavLink
                    to="notification-composer"
                    onClick={handleSidebarItemClick}
                    className={({ isActive }) =>
                        isActive
                            ? "flex items-center space-x-3 py-3 px-4 text-gray-900 bg-[#f7f1ec] rounded-lg"
                            : "flex items-center space-x-3 py-3 px-4 text-gray-600 hover:bg-[#f7f1ec] rounded-lg"
                    }
                >
                    <FaBell className="w-5 h-5" />
                    <span>Send Notifications</span>
                </NavLink>

                <NavLink
                    to="/logout"
                    className={({ isActive }) =>
                        isActive
                            ? "flex items-center space-x-3 py-3 px-4 text-gray-900 bg-[#f7f1ec] rounded-lg"
                            : "flex items-center space-x-3 py-3 px-4 text-gray-600 hover:bg-[#f7f1ec] rounded-lg"
                    }
                >
                    <FaSignOutAlt className="w-5 h-5" />
                    <span>Log out</span>
                </NavLink>
            </div>
        </div>
    );
};

export default MentorDashboardSidebar;
