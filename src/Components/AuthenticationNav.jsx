import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthNavIcon from '../assets/NavbarLogo.png';
import { User } from 'lucide-react';
import useIsMobile from '../hooks/useIsMobile';

const AuthenticationNav = () => {
    const isMobile = useIsMobile();
    // console.log(isMobile);
    const navigate = useNavigate();
    return (
        <div className="w-full flex justify-between items-center px-6 py-4  from-white via-[#f3ebe6] to-white text-sm sm:text-lg">
            {/* Left: Logo */}
            <div className="flex items-center gap-2">
                <img src={AuthNavIcon} alt="Logo" className="w-10 h-12" />
                <span className="text-[#0c0c36] font-medium tracking-wide">YOURSELF BEAUTY</span>
            </div>

            {/* Right: Log in & Join */}
            <div className="flex items-center gap-4">
                <button className=" font-medium text-[#0c0c36] hover:underline">Log in</button>
                <button
                    onClick={() => navigate('/maindashboard')}
                    className="flex items-center gap-2 bg-[#0c0c36] text-white  font-medium px-4 py-2 rounded-md hover:bg-[#1c1c4f] cursor-pointer z-100">
                    <User className="w-4 h-4" />
                    Join
                </button>
            </div>
        </div>
    );
};

export default AuthenticationNav;
