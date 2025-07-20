import AuthNav from '../Components/AuthNav';
import { NavLink, Outlet } from 'react-router-dom';
import { MdOutlineModeEdit, MdOutlineStarBorder } from "react-icons/md";
import { PiBabyLight, PiHeartStraightBold, PiSunLight } from 'react-icons/pi';
import { TbFileReport } from 'react-icons/tb';
import { AiOutlineBarChart, AiOutlineProduct } from 'react-icons/ai';
import { HiOutlineBadgeCheck } from 'react-icons/hi';
import { WiStars } from 'react-icons/wi';
import { IoCallOutline, IoMenu } from 'react-icons/io5';
import LoginPageOverLap from '../assets/LoginPageOverLap.png'
import Navbar from '../Components/Navbar';
import useIsMobile from '../hooks/useIsMobile';
import { useEffect, useState } from 'react';
// Navbar
import AuthNavIcon from '../assets/NavbarLogo.png';
import { Bell } from 'lucide-react';
import annaImg from '../assets/annaImg.png';
import NotificationPopup from '../Components/NotificationPopup';
import useIsBelowMd from '../hooks/useIsBelowMd';


const plans = [
    {
        title: 'Free',
        price: '0€',
        features: [
            'Basic skin analysis and profile creation',
            'Limited access to product library',
            'Basic routine tracking',
            'UV index alerts',
            'Smart AI suggestions to boost your skincare game'
        ],
        bg: 'bg-white',
    },
    {
        title: 'Premium',
        price: '7€',
        features: [
            'All free features',
            'Monthly reports on your skincare progress',
            'Free skincare consultation once a month, send a request for your routine being analyzed by a real human',
        ],
        bg: 'bg-gradient-to-b from-[#f6ede7] to-[#f5e5d9]',
    },
    {
        title: 'Luxury',
        price: '17€',
        features: [
            'All standard features',
            'Skincare coach',
            'Live chat with your curator',
        ],
        bg: 'bg-gradient-to-b from-[#d5ccf5] to-[#f4d9d8]',
    },
];

const paymentHistory = [
    { plan: 'Premium', date: '15/06/2025', total: '7€' },
    { plan: 'Free', date: '15/05/2025', total: '0€' },
];

const Dashboard = () => {

    // nAVBAR iTEAMS
    const isMobile = useIsMobile();
    const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility

    // Toggle popup visibility
    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const isBelowMd = useIsBelowMd();
    console.log(isBelowMd)
    const [viewMode, setViewMode] = useState('sidebar');
    useEffect(() => {
        if (!isBelowMd) {
            setViewMode('both'); // Show both for larger screens
        } else {
            setViewMode('sidebar'); // Default to sidebar on small screens
        }
    }, [isBelowMd]);

    const toggleView = () => {
        if (isBelowMd) {
            setViewMode((prev) => (prev === 'sidebar' ? 'outlet' : 'sidebar'));
        }
    };

    const handleSidebarItemClick = () => {
        if (isBelowMd) {
            setViewMode('outlet');
        }
    };


    return (

        <div className='bg-gradient-to-b from-[#FAFAFA] via-[#FFFFFF] to-[#F5EADF] px-10'>
            <div className='  pt-6'>
                {/* Navbar */}

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


                        <button
                            aria-label="Open menu"
                            onClick={toggleView}
                            className="md:hidden p-2 rounded-full bg-[#131313] text-white text-xl"
                        >
                            <IoMenu />
                        </button>

                    </div>

                    {/* Notification Popup */}
                    <NotificationPopup isOpen={isPopupOpen} onClose={togglePopup} />
                </div>

            </div>


            {/* Sidebar */}
            <div className=" relative flex min-h-screen  text-gray-800 sm:px-10 ">

                <div className='absolute bottom-0 right-0'>
                    <img src={LoginPageOverLap} alt="OverlapIMG" />
                </div>


                {/* Sidebar */}
                {(viewMode === 'sidebar' || viewMode === 'both') && (
                    <aside className={`mt-10 w-full  md:w-[240px] lg:w-xs `}>

                        {/* GENERAL */}
                        <h2 className="mt-2 pl-2 text-xs font-semibold text-gray-500 uppercase mb-3">General</h2>

                        <div className=' bg-white shadow-md  border-r border-gray-200 border rounded-2xl'>

                            <ul className="text-sm text-gray-800 border border-gray-200 rounded-md overflow-hidden">

                                <li className="border-t border-gray-200 first:border-t-0">
                                    <NavLink
                                        to=""
                                        onClick={handleSidebarItemClick}
                                        className={({ isActive }) =>
                                            `flex items-center justify-between px-3 py-2 ${isActive ? 'bg-[#EFEBEB] text-[#0b0544] font-medium' : 'hover:bg-gray-100'}`
                                        }>
                                        <span className="flex items-center space-x-2">
                                            <MdOutlineStarBorder className="text-lg" />
                                            <span>Subscription Plan</span>
                                        </span>
                                        <span className="text-2xl font-light">›</span>
                                    </NavLink>
                                </li>

                                <li className="border-t border-gray-300">
                                    <NavLink
                                        to="/edit-profile"
                                        onClick={handleSidebarItemClick}
                                        className={({ isActive }) =>
                                            `flex items-center justify-between px-3 py-2 ${isActive ? 'bg-[#EFEBEB] text-[#0b0544] font-medium' : 'hover:bg-gray-100'}`
                                        }>
                                        <span className="flex items-center space-x-2">
                                            <MdOutlineModeEdit className="text-lg" />                                      <span>Edit Profile</span>
                                        </span>
                                        <span className="text-2xl font-light">›</span>
                                    </NavLink>
                                </li>

                                <li className="border-t border-gray-300">
                                    <NavLink
                                        to="/skin-type-test"
                                        onClick={handleSidebarItemClick}
                                        className={({ isActive }) =>
                                            `flex items-center justify-between px-3 py-2 ${isActive ? 'bg-[#EFEBEB] text-[#0b0544] font-medium' : 'hover:bg-gray-100'}`
                                        }>
                                        <span className="flex items-center space-x-2">
                                            <MdOutlineStarBorder className="text-lg" />
                                            <span>Skin Type Test</span>
                                        </span>
                                        <span className="text-2xl font-light">›</span>
                                    </NavLink>
                                </li>

                                <li className="border-t border-gray-300 flex justify-between items-center px-3 py-2 hover:bg-gray-100">
                                    <span className="flex items-center space-x-2">
                                        <PiBabyLight className="text-lg" />
                                        <span>Pregnant or breastfeeding</span>
                                    </span>
                                    <input type="checkbox" className="toggle toggle-sm scale-75" />
                                </li>

                                <li className="border-t border-gray-300">
                                    <NavLink
                                        to="about-my-skin"
                                        onClick={handleSidebarItemClick}
                                        className={({ isActive }) =>
                                            `flex items-center justify-between px-3 py-2 ${isActive ? 'bg-[#EFEBEB] text-[#0b0544] font-medium' : 'hover:bg-gray-100'}`
                                        }>
                                        <span className="flex items-center space-x-2">
                                            <PiHeartStraightBold className="text-lg" />
                                            <span>About my skin</span>
                                        </span>
                                        <span className="text-2xl font-light">›</span>
                                    </NavLink>
                                </li>

                                <li className="border-t border-gray-300">
                                    <NavLink
                                        to="monthly-report"
                                        onClick={handleSidebarItemClick}
                                        className={({ isActive }) =>
                                            `flex items-center justify-between px-3 py-2 ${isActive ? 'bg-[#f5f5f5] text-[#0b0544] font-medium' : 'hover:bg-gray-100'}`
                                        }>
                                        <span className="flex items-center space-x-2">
                                            <TbFileReport className="text-lg" />
                                            <span>Monthly skin report</span>
                                        </span>
                                        <span className="text-2xl font-light">›</span>
                                    </NavLink>
                                </li>

                                <li className="border-t border-gray-300">
                                    <NavLink
                                        to="/routine-analysis"
                                        onClick={handleSidebarItemClick}
                                        className={({ isActive }) =>
                                            `flex items-center justify-between px-3 py-2 ${isActive ? 'bg-[#f5f5f5] text-[#0b0544] font-medium' : 'hover:bg-gray-100'}`
                                        }>
                                        <span className="flex items-center space-x-2">
                                            <AiOutlineBarChart className="text-lg" />
                                            <span>Routine analysis</span>
                                        </span>
                                        <span className="text-2xl font-light">›</span>
                                    </NavLink>
                                </li>

                                <li className="border-t border-gray-300">
                                    <NavLink
                                        to="badges"
                                        onClick={handleSidebarItemClick}
                                        className={({ isActive }) =>
                                            `flex items-center justify-between px-3 py-2 ${isActive ? 'bg-[#f5f5f5] text-[#0b0544] font-medium' : 'hover:bg-gray-100'}`
                                        }>
                                        <span className="flex items-center space-x-2">
                                            <HiOutlineBadgeCheck className="text-lg" />
                                            <span>Badges</span>
                                        </span>
                                        <span className="text-2xl font-light">›</span>
                                    </NavLink>
                                </li>
                            </ul>


                        </div>


                        {/* NOTIFICATIONS */}
                        <h2 className="mt-4 pl-2 text-xs font-semibold text-gray-500 uppercase mb-3">Notifications</h2>

                        <div className='bg-white shadow-md border-r border-gray-200 border rounded-2xl'>
                            <div className="border-t border-gray-300 first:border-t-0 flex justify-between items-center px-3 py-4">
                                <span className="h-5 flex items-center space-x-2">
                                    <AiOutlineProduct className="text-lg" />
                                    <span>New products</span>
                                </span>
                                <input type="checkbox" className="toggle toggle-sm scale-75" />
                            </div>

                            <div className="border-t border-gray-300 flex justify-between items-center px-3 py-4">
                                <span className="h-5 flex items-center space-x-2">
                                    <PiSunLight className="text-lg" />
                                    <span>UV alerts</span>
                                </span>
                                <input type="checkbox" className="toggle toggle-sm scale-75" />
                            </div>

                            <div className="border-t border-gray-300 flex justify-between items-center px-3 py-4">
                                <span className="h-5 flex items-center space-x-2">

                                    <WiStars className="text-lg" />
                                    <span>AI recommendations</span>
                                </span>
                                <input type="checkbox" className="toggle toggle-sm scale-75" />
                            </div>
                        </div>

                        {/* HELP */}
                        <h2 className="mt-4 pl-2 text-xs font-semibold text-gray-500 uppercase mb-3">Help & Privacy</h2>
                        <div className='bg-white shadow-md px-6 py-3 space-y-8 border-r border-gray-200 border rounded-2xl '>

                            <div className="border-b border-gray-300 flex justify-between items-center  pb-1">
                                <span className="h-5 flex items-center space-x-2">

                                    <IoCallOutline ars className="text-lg" />
                                    <span>Support</span>
                                </span>
                                <input type="checkbox" className="toggle toggle-sm scale-75" />
                            </div>
                        </div>
                    </aside>
                )}


                {/* Outlet / Main Content */}
                {(viewMode === 'outlet' || viewMode === 'both') && (
                    <div className='sm:p-10 mt-4 flex-1 px-5 hidd'>
                        <Outlet></Outlet>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
