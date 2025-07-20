import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AuthNavIcon from '../assets/NavbarLogo.png';
import { IoMenu } from "react-icons/io5";
import useIsMobile from '../hooks/useIsMobile';
import annaImg from '../assets/annaImg.png';
import { Bell, ChevronRight, Info, LogOut, Pencil, Phone } from 'lucide-react';
import NotificationPopup from './NotificationPopup'; // Import the popup component

const Navbar = () => {
    const isMobile = useIsMobile();
    const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); // State to manage profile menu visibility

    // Toggle notification popup visibility
    const togglePopup = () => {
        if (isProfileMenuOpen) {
            setIsProfileMenuOpen(false); // Close profile menu when notification is opened
        }
        setIsPopupOpen(!isPopupOpen); // Toggle notification popup visibility
    };

    // Toggle profile menu visibility
    const toggleProfileMenu = () => {
        if (isPopupOpen) {
            setIsPopupOpen(false); // Close notification popup when profile menu is opened
        }
        setIsProfileMenuOpen(!isProfileMenuOpen); // Toggle profile menu visibility
    };

    return (
        <div className="w-full bg-white shadow-md rounded-xl px-4 sm:px-8 flex justify-between items-center h-[70px]">
            {/* Logo */}
            <div className="flex items-center gap-2 h-16 whitespace-nowrap">
                <img src={AuthNavIcon} alt="Brand Logo" className="w-14 h-18" />
                <span className="font-semibold lg:text-xl hidden sm:block">YOURSELF BEAUTY</span>
            </div>

            {/* Nav Links (desktop only) */}
            <ul className="hidden md:flex gap-6 text-sm text-[#5B5B5B]">
                {["dashboard", "library", "chat", "tracker"].map((route) => (
                    <li key={route}>
                        <NavLink
                            to={`/${route}`}
                            className={({ isActive }) =>
                                `capitalize hover:text-[#0b0544] ${isActive ? 'font-semibold text-[#0b0544]' : ''}`
                            }
                        >
                            {route}
                        </NavLink>
                    </li>
                ))}
            </ul>

            {/* Auth/Profile & Menu */}
            <div className="flex items-center gap-3 sm:gap-4">
                {/* Notification Icon */}
                <div className="p-2 rounded-full border border-base-300 cursor-pointer" onClick={togglePopup}>
                    <Bell />
                </div>

                <div className="relative">
                    <div
                        className="rounded-full w-10 h-10 overflow-hidden cursor-pointer"
                        onClick={toggleProfileMenu} 
                    >
                        <img src={annaImg} alt="User profile" className="w-full h-full object-cover" />
                    </div>

                    {/* Profile Menu Popup */}
                    {isProfileMenuOpen && (
                        <div
                            className="fixed top-[117px] lg:top-[134px] rounded-2xl right-4 lg:right-10 w-80 bg-white/80 shadow-lg p-4  z-50 "
                        >
                            <ul className="text-sm space-y-5">
                                {/* My Profile */}
                                <li className="flex items-center gap-5 py-2 px-3 hover:bg-gray-300 cursor-pointer border-b hover:rounded-md">
                                    <Pencil size={18} />
                                    <span className="flex-1">My profile</span>
                                    <ChevronRight size={18} />
                                </li>

                                {/* Support */}
                                <li className="flex items-center gap-5 py-2 px-3 hover:bg-gray-300 border-b cursor-pointer hover:rounded-md">
                                    <Phone size={18} />
                                    <span className="flex-1">Support</span>
                                    <ChevronRight size={18} />
                                </li>

                                {/* Privacy Policy */}
                                <li className="flex items-center gap-5 py-2 px-3 hover:bg-gray-300 border-b cursor-pointer hover:rounded-md">
                                    <Info size={18} />
                                    <span className="flex-1">Privacy Policy</span>
                                    <ChevronRight size={18} />
                                </li>

                                {/* Log out */}
                                <li className="py-2 px-3 hover:bg-gray-300 rounded-md cursor-pointer flex gap-5">
                                    <LogOut size={18} />
                                    <span className="flex-1">Log out</span>
                                    <ChevronRight size={18} />
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                {isMobile && (
                    <button
                        aria-label="Open menu"
                        className="md:hidden p-2 rounded-full bg-[#131313] text-white text-xl"
                    >
                        <IoMenu />
                    </button>
                )}
            </div>

            {/* Notification Popup */}
            <NotificationPopup isOpen={isPopupOpen} onClose={togglePopup} />
        </div>
    );
};

export default Navbar;
