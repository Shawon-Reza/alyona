import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthNavIcon from '../assets/NavbarLogo.png';
import { IoMenu, IoClose } from "react-icons/io5";
import useIsMobile from '../hooks/useIsMobile';
import annaImg from '../assets/annaImg.png';
import { Bell, ChevronRight, Info, LogOut, Pencil, Phone } from 'lucide-react';
import NotificationPopup from './NotificationPopup'; // Import the popup component
import useCurrentUser from '../hooks/useCurrentUser'; // Custom hook to fetch current user info


const Navbar = () => {
    const isMobile = useIsMobile();
    const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); // State to manage profile menu visibility
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to manage mobile menu visibility

    const mobileMenuRef = useRef(null);
    const mobileButtonRef = useRef(null);

    const { user, loading } = useCurrentUser(); // Fetch current user info using custom hook
console.log(user)
    // Toggle notification popup visibility
    const togglePopup = () => {
        if (isProfileMenuOpen) {
            setIsProfileMenuOpen(false); // Close profile menu when notification is opened
        }
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false); // Close mobile menu when notification is opened
        }
        setIsPopupOpen(!isPopupOpen); // Toggle notification popup visibility
    };


    // Toggle profile menu visibility
    const toggleProfileMenu = () => {
        if (isPopupOpen) {
            setIsPopupOpen(false); // Close notification popup when profile menu is opened
        }
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false); // Close mobile menu when profile menu is opened
        }
        setIsProfileMenuOpen(!isProfileMenuOpen); // Toggle profile menu visibility
    };

    // Toggle mobile menu visibility
    const toggleMobileMenu = () => {
        if (isPopupOpen) {
            setIsPopupOpen(false); // Close notification popup when mobile menu is opened
        }
        if (isProfileMenuOpen) {
            setIsProfileMenuOpen(false); // Close profile menu when mobile menu is opened
        }
        setIsMobileMenuOpen(!isMobileMenuOpen); // Toggle mobile menu visibility
    };

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target) &&
                mobileButtonRef.current &&
                !mobileButtonRef.current.contains(event.target)
            ) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Close mobile menu when a navigation item is clicked
    const handleNavLinkClick = () => {
        setIsMobileMenuOpen(false);
    };

    const navigate = useNavigate();

    // Navigation routes
    const navRoutes = ["dashboard", "library", "chat", "tracker"];

    return (
        <div className="w-full bg-white shadow-md rounded-xl px-4 sm:px-8 flex justify-between items-center h-[70px] relative">
            {/* Logo */}
            <div className="flex items-center gap-2 h-16 whitespace-nowrap">
                <img src={AuthNavIcon || "/placeholder.svg"} alt="Brand Logo" className="w-14 h-18" />
                <span className="font-semibold lg:text-xl hidden sm:block">YOURSELF BEAUTY</span>
            </div>

            {/* Nav Links (desktop only) */}
            <ul className="hidden md:flex gap-6 text-sm text-[#5B5B5B]">
                {navRoutes.map((route) => (
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
                        <img src={annaImg || "/placeholder.svg"} alt="User profile" className="w-full h-full object-cover" />
                    </div>

                    {/* Profile Menu Popup */}
                    {isProfileMenuOpen && (
                        <div
                            className="fixed top-[117px] lg:top-[134px] rounded-2xl right-4 lg:right-10 w-80 bg-white/80 shadow-lg p-4 z-50"
                        >
                            <ul className="text-sm space-y-5">
                                {/* My Profile */}
                                <li className="flex items-center gap-5 py-2 px-3 hover:bg-gray-300 cursor-pointer border-b hover:rounded-md">
                                    <Pencil size={18} />
                                    <span
                                        onClick={() => {
                                            navigate('/maindashboard');
                                            setIsProfileMenuOpen(false);
                                        }}
                                        className="flex-1 z-10"
                                    >
                                        My profile
                                    </span>
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
                                    <span
                                        onClick={() => {
                                            console.log('clicked logout');
                                            localStorage.removeItem("token");
                                            // Reload the page to reflect the logout
                                            window.location.reload();
                                            setIsProfileMenuOpen(false);
                                        }}
                                        className="flex-1"
                                    >Log out</span>
                                    <ChevronRight size={18} />
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                {isMobile && (
                    <button
                        ref={mobileButtonRef}
                        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                        className="md:hidden p-2 rounded-full bg-[#131313] text-white text-xl cursor-pointer"
                        onClick={toggleMobileMenu}
                    >
                        {isMobileMenuOpen ? <IoClose /> : <IoMenu />}
                    </button>
                )}
            </div>

            {/* Mobile Menu Popup */}
            {isMobileMenuOpen && (
                <div
                    ref={mobileMenuRef}
                    className="absolute top-[100px] left-0 right-0 bg-white shadow-lg rounded-b-xl z-50 py-4 px-6 "
                >
                    <ul className="">
                        {navRoutes.map((route) => (
                            <li key={route} className="border-b border-base-300 pb-2">
                                <NavLink
                                    to={`/${route}`}
                                    className={({ isActive }) =>
                                        `capitalize block py-2 text-[#5B5B5B] hover:text-[#0b0544] ${isActive ? 'font-semibold text-[#0b0544]' : ''
                                        }`
                                    }
                                    onClick={handleNavLinkClick}
                                >
                                    {route}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Notification Popup */}
            <NotificationPopup isOpen={isPopupOpen} onClose={togglePopup} />
        </div>
    );
};

export default Navbar;