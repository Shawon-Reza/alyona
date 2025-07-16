import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthNavIcon from '../assets/AuthNavIcon.png'; // Replace with your actual logo later
import { IoMenu } from "react-icons/io5";
import useIsMobile from '../hooks/useIsMobile';

const AuthNav = () => {
    const isMobile = useIsMobile();

    return (
        <div
            className="w-full bg-white shadow-md rounded-xl px-8 flex justify-between items-center">

            {/* Logo Section */}
            <div className="flex items-center gap-2">
                <img src={AuthNavIcon} alt="Logo" className="" />
            </div>

            {/* Nav Links */}
            <ul className="hidden md:flex gap-6 text-sm text-[#5B5B5B]">
                <li>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `hover:text-[#0b0544] ${isActive ? 'font-semibold text-[#0b0544]' : ''}`
                        }
                    >
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/library"
                        className={({ isActive }) =>
                            `hover:text-[#0b0544] ${isActive ? 'font-semibold text-[#0b0544]' : ''}`
                        }
                    >
                        Library
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/chat"
                        className={({ isActive }) =>
                            `hover:text-[#0b0544] ${isActive ? 'font-semibold text-[#0b0544]' : ''}`
                        }
                    >
                        Chat
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/tracker"
                        className={({ isActive }) =>
                            `hover:text-[#0b0544] ${isActive ? 'font-semibold text-[#0b0544]' : ''}`
                        }
                    >
                        Tracker
                    </NavLink>
                </li>
            </ul>

            {/* Auth Buttons + Mobile Menu */}
            <div className="flex items-center gap-4">
                <button className="text-sm text-[#1e1e2f] hover:underline">Log in</button>
                <button className="bg-[#0c0c36] text-white px-4 py-2 rounded-md text-sm hover:bg-[#1c1c4f] transition">
                    Join
                </button>

                {isMobile && (
                    <div className="md:hidden border p-2 rounded-full text-2xl bg-[#131313] text-white">
                        <IoMenu />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthNav;
