// Navbar.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AuthNavIcon from '../assets/NavbarLogo.png';
import { IoMenu } from "react-icons/io5";
import useIsMobile from '../hooks/useIsMobile';
import annaImg from '../assets/annaImg.png';
import { Bell } from 'lucide-react';
import NotificationPopup from './NotificationPopup'; // Import the popup component

const Navbar = () => {
    const isMobile = useIsMobile();
    const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility

    // Toggle popup visibility
    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
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

                <div className="rounded-full w-10 h-10 overflow-hidden">
                    <img src={annaImg} alt="User profile" className="w-full h-full object-cover" />
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
