import AuthNav from '../Components/AuthNav';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { MdOutlineModeEdit, MdOutlineStarBorder } from "react-icons/md";
import { PiBabyLight, PiHeartStraightBold, PiSunLight } from 'react-icons/pi';
import { TbFileReport } from 'react-icons/tb';
import { AiOutlineBarChart, AiOutlineProduct } from 'react-icons/ai';
import { HiOutlineBadgeCheck } from 'react-icons/hi';
import { WiStars } from 'react-icons/wi';
import { IoCallOutline, IoMenu, IoClose } from 'react-icons/io5';
import LoginPageOverLap from '../assets/LoginPageOverLap.png'
import Navbar from '../Components/Navbar';
import useIsMobile from '../hooks/useIsMobile';
import { useEffect, useState, useRef } from 'react';
// Navbar
import AuthNavIcon from '../assets/NavbarLogo.png';
import { Bell, ChevronRight, Info, LogOut, Pencil, Phone } from 'lucide-react';
import annaImg from '../assets/annaImg.png';
import NotificationPopup from '../Components/NotificationPopup';
import useIsBelowMd from '../hooks/useIsBelowMd';
import { BsLayoutSidebarInset } from 'react-icons/bs';
import Swal from 'sweetalert2';
import useCurrentUser from '@/hooks/useCurrentUser';
import axiosApi from '@/api/axiosApi';
import { toast } from 'react-toastify';
import MultiPagePDF from '@/Components/PdfGenerate/MultiPagePDF';
import DownloadPDFButton from '@/Components/PdfReport/DownloadPDFButton';


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
    // NAVBAR ITEMS
    const isMobile = useIsMobile();
    const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
    const [isNavMenuOpen, setIsNavMenuOpen] = useState(false); // State to manage nav menu popup
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to manage mobile menu visibility
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); // State to manage profile menu visibility

    const navigate = useNavigate();
    const navMenuRef = useRef(null);
    const menuButtonRef = useRef(null);

    const { user, loading } = useCurrentUser();

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

    // Toggle nav menu popup
    const toggleNavMenu = () => {
        if (isPopupOpen) {
            setIsPopupOpen(false); // Close notification when nav menu is opened
        }
        setIsNavMenuOpen(!isNavMenuOpen);
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

    // Close nav menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                navMenuRef.current &&
                !navMenuRef.current.contains(event.target) &&
                menuButtonRef.current &&
                !menuButtonRef.current.contains(event.target)
            ) {
                setIsNavMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Close nav menu when a navigation item is clicked
    const handleNavLinkClick = () => {
        setIsNavMenuOpen(false);
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

    // Navigation routes
    const navRoutes = [
        { name: "dashboard", path: "/dashboard" },
        { name: "library", path: "/library" },
        { name: "chat", path: "/chat" },
        { name: "tracker", path: "/tracker" }
    ];

    return (
        <div className='bg-gradient-to-b from-[#FAFAFA] via-[#FFFFFF] to-[#F5EADF] px-10'>
            <div className='pt-6 relative'>
                {/* Navbar */}
                <div className="w-full bg-white shadow-md rounded-xl px-4 sm:px-8 flex justify-between items-center h-[70px]">
                    {/* Logo */}
                    <div
                        onClick={() => navigate('/maindashboard')}
                        className="flex items-center gap-2 h-16 whitespace-nowrap cursor-pointer">
                        <img src={AuthNavIcon || "/placeholder.svg"} alt="Brand Logo" className="w-14 h-18" />
                        <span className="font-semibold lg:text-xl hidden sm:block">YOURSELF BEAUTY</span>
                    </div>

                    {/* Nav Links (desktop only) */}
                    <ul className="hidden md:flex gap-6 text-sm text-[#5B5B5B]">
                        {navRoutes.map((route) => (
                            <li key={route.name}>
                                <NavLink
                                    to={route.path}
                                    className={({ isActive }) =>
                                        `capitalize hover:text-[#0b0544] ${isActive ? 'font-semibold text-[#0b0544]' : ''}`
                                    }
                                >
                                    {route.name}
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
                                <img src={`http://10.10.13.59:8005${user?.image}` || "/placeholder.svg"} alt="User profile" className="w-full h-full object-cover" />
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
                                        <li
                                            onClick={() => {
                                                console.log('clicked logout');
                                                localStorage.removeItem("token");
                                                // Reload the page to reflect the logout
                                                window.location.reload();
                                                setIsProfileMenuOpen(false);
                                            }}
                                            className="py-2 px-3 hover:bg-gray-300 rounded-md cursor-pointer flex gap-5">
                                            <LogOut size={18} />
                                            <span className="flex-1">Log out</span>
                                            <ChevronRight size={18} />
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            ref={menuButtonRef}
                            aria-label={isNavMenuOpen ? "Close menu" : "Open menu"}
                            onClick={toggleNavMenu}
                            className="md:hidden p-2 rounded-full bg-[#131313] text-white text-xl"
                        >
                            {isNavMenuOpen ? <IoClose /> : <IoMenu />}
                        </button>

                        {/* Secondary Menu Button for Sidebar Toggle */}
                        <button
                            aria-label="Toggle sidebar"
                            onClick={toggleView}
                            className="md:hidden p-2 rounded-full bg-[#0b0544] text-white text-xl"
                        >
                            <BsLayoutSidebarInset />
                        </button>
                    </div>

                    {/* Notification Popup */}
                    <NotificationPopup isOpen={isPopupOpen} onClose={togglePopup} />
                </div>

                {/* Navigation Menu Popup */}
                {isNavMenuOpen && (
                    <div
                        ref={navMenuRef}
                        className="absolute top-[100px] left-4 right-4 bg-white shadow-lg rounded-xl z-50 py-4 px-6 border border-base-300"
                    >
                        <ul className="">
                            {navRoutes.map((route) => (
                                <li key={route.name} className="border-b border-base-300 pb-2 last:border-b-0">
                                    <NavLink
                                        to={route.path}
                                        className={({ isActive }) =>
                                            `capitalize block py-2 px-3 text-[#5B5B5B] hover:text-[#0b0544] hover:bg-gray-50 rounded-md transition-colors ${isActive ? 'font-semibold text-[#0b0544] bg-[#EFEBEB]' : ''
                                            }`
                                        }
                                        onClick={handleNavLinkClick}
                                    >
                                        {route.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Sidebar */}
            <div className="relative flex min-h-screen text-gray-800 sm:px-10">
                <div className='absolute bottom-0 right-0'>
                    <img src={LoginPageOverLap || "/placeholder.svg"} alt="OverlapIMG" />
                </div>



                {/* Sidebar */}
                {(viewMode === 'sidebar' || viewMode === 'both') && (
                    <aside className={`sm:mt-10 mt-3 w-full md:w-[240px] lg:w-xs `}>
                        {/* GENERAL */}
                        <h2 className="mt-2 pl-2 text-xs font-semibold text-gray-500 uppercase mb-3">General</h2>
                        <div className='bg-white shadow-md border-r border-gray-200 border rounded-2xl'>
                            <ul className="text-sm text-gray-800 border border-gray-200 rounded-md overflow-hidden ">
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
                                        to="/maindashboard"
                                        onClick={handleSidebarItemClick}
                                        className={({ isActive }) =>
                                            `flex items-center justify-between px-3 py-2 ${isActive ? 'bg-[#EFEBEB] text-[#0b0544] font-medium' : 'hover:bg-gray-100'}`
                                        }>
                                        <span className="flex items-center space-x-2">
                                            <MdOutlineModeEdit className="text-lg" />
                                            <span>Edit Profile</span>
                                        </span>
                                        <span className="text-2xl font-light">›</span>
                                    </NavLink>
                                </li>
                                <li className="border-t border-gray-300">
                                    <NavLink
                                        to="/chat/ai-chat"
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
                                <li
                                    onClick={() => {
                                        Swal.fire({
                                            position: "top-end",
                                            icon: "success",
                                            title: "Your skin routine analysis request has been sent",
                                            text: "We'll notify you when it's ready.",
                                            showConfirmButton: false,
                                            timer: 3500, // Hide after 2.5 seconds
                                        });
                                    }}
                                    className="border-t border-gray-300 cursor-pointer">
                                    <div className="flex items-center justify-between px-3 py-2">
                                        <span
                                            className="flex items-center space-x-2 "
                                        >
                                            <AiOutlineBarChart className="text-lg" />
                                            <span>Routine analysis</span>
                                        </span>
                                        <span className="text-2xl font-light">›</span>
                                    </div>
                                </li>



                                <li className="border-t border-gray-300">
                                    <NavLink
                                        to="badges"
                                        onClick={handleSidebarItemClick}
                                        className={({ isActive }) =>
                                            `flex items-center justify-between px-3 py-2 ${isActive ? 'bg-[#f5f5f5] text-[#0b0544] font-medium' : 'hover:bg-gray-100'}`
                                        }>
                                        <span className="flex items-center space-x-2 z-10">
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
                                            <NotificationSettings />

                        {/* HELP */}
                        <h2 className="mt-4 pl-2 text-xs font-semibold text-gray-500 uppercase mb-3">Help & Privacy</h2>
                        <div className='bg-white shadow-md px-6 py-3 space-y-8 border-r border-gray-200 border rounded-2xl'>
                            <div className="border-b border-gray-300 flex justify-between items-center pb-1">
                                <span className="h-5 flex items-center space-x-2">
                                    <IoCallOutline className="text-lg" />
                                    <span>Support</span>
                                </span>
                                <input type="checkbox" className="toggle toggle-sm scale-75" />
                            </div>




                        </div>

                    </aside>
                )}

                {/* Outlet / Main Content */}
                {(viewMode === 'outlet' || viewMode === 'both') && (
                    <div className='sm:p-10 mt-4 flex-1 px-'>
                        <Outlet></Outlet>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;

// Small inline component to manage notification settings (GET + PATCH)
function NotificationSettings() {
    const [settings, setSettings] = useState({ product_notification_settings: false, ai_recommendation: false, pregnancy_based_notification: false });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState({}); // per-key saving state to avoid race/toggling issues

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        axiosApi.get('/accounts/api/v1/notification-settings')
            .then((res) => {
                console.log('GET /accounts/api/v1/notification-settings response:', res.data);
                if (mounted) setSettings(res.data || {});
            })
            .catch((err) => {
                console.error('Failed to fetch notification settings:', err);
            })
            .finally(() => {
                if (mounted) setLoading(false);
            });

        return () => { mounted = false; };
    }, []);

    const handleToggle = async (key) => {
        if (saving[key]) {
            console.log('Already saving', key);
            return;
        }

        const prev = settings;
        const next = { ...settings, [key]: !settings[key] };

        // optimistic update
        setSettings(next);
        setSaving(s => ({ ...s, [key]: true }));
        console.log('PATCH /accounts/api/v1/notification-settings payload:', next);

        try {
            const res = await axiosApi.patch('/accounts/api/v1/notification-settings', next);
            console.log('PATCH success:', res.data);
            setSettings(res.data || next);
            toast.success('Notification updated');
        } catch (err) {
            console.error('PATCH failed:', err);
            toast.error('Failed to update notification');
            // try to refetch server state to revert UI
            try {
                const ref = await axiosApi.get('/accounts/api/v1/notification-settings');
                console.log('Refetch after failed patch:', ref.data);
                setSettings(ref.data || prev);
            } catch (e) {
                console.error('Refetch also failed:', e);
                setSettings(prev);
            }
        } finally {
            setSaving(s => ({ ...s, [key]: false }));
        }
    };

    return (
        <div className='bg-white shadow-md border-r border-gray-200 border rounded-2xl'>
            {loading ? (
                <div className="px-3 py-4">Loading notification settings...</div>
            ) : (
                <>
                    <div className="border-t border-gray-300 first:border-t-0 flex justify-between items-center px-3 py-4">
                        <span className="h-5 flex items-center space-x-2">
                            <AiOutlineProduct className="text-lg" />
                            <span>New products</span>
                        </span>
                        <input
                            type="checkbox"
                            className="toggle toggle-sm scale-75"
                            checked={!!settings.product_notification_settings}
                            onChange={() => handleToggle('product_notification_settings')}
                        />
                    </div>

                    {/* UV alerts removed as requested */}

                    <div className="border-t border-gray-300 flex justify-between items-center px-3 py-4">
                        <span className="h-5 flex items-center space-x-2">
                            <PiBabyLight className="text-lg" />
                            <span>Pregnant or breastfeeding</span>
                        </span>
                        <input
                            type="checkbox"
                            className="toggle toggle-sm scale-75"
                            checked={!!settings.pregnancy_based_notification}
                            onChange={() => handleToggle('pregnancy_based_notification')}
                        />
                    </div>

                    <div className="border-t border-gray-300 flex justify-between items-center px-3 py-4">
                        <span className="h-5 flex items-center space-x-2">
                            <WiStars className="text-lg" />
                            <span>AI recommendations</span>
                        </span>
                        <input
                            type="checkbox"
                            className="toggle toggle-sm scale-75"
                            checked={!!settings.ai_recommendation}
                            onChange={() => handleToggle('ai_recommendation')}
                        />
                    </div>
                </>
            )}
        </div>
    );
}
