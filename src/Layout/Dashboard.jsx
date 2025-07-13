
import AuthNav from '../Components/AuthNav';
import { NavLink, Outlet } from 'react-router-dom';
import { MdOutlineModeEdit, MdOutlineStarBorder } from "react-icons/md";
import { PiBabyLight, PiHeartStraightBold, PiSunLight } from 'react-icons/pi';
import { TbFileReport } from 'react-icons/tb';
import { AiOutlineBarChart, AiOutlineProduct } from 'react-icons/ai';
import { HiOutlineBadgeCheck } from 'react-icons/hi';
import { WiStars } from 'react-icons/wi';
import { IoCallOutline } from 'react-icons/io5';

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


    return (
        <div className="flex min-h-screen bg-[#f7f5f2] text-gray-800 px-10">
            <div className=''>
                <AuthNav></AuthNav>
            </div>

            {/* Sidebar */}
            <aside className="mt-28 w-64 ">

                {/* GENERAL */}
                <h2 className="mt-2 pl-2 text-xs font-semibold text-gray-500 uppercase mb-3">General</h2>

                <div className='w-64 bg-white shadow-md  border-r border-gray-200 border rounded-2xl'>

                    <ul className="text-sm text-gray-800 border border-gray-200 rounded-md overflow-hidden">
                        <li className="border-t border-gray-200 first:border-t-0">
                            <NavLink to="/dashboard" className={({ isActive }) =>
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
                            <NavLink to="/edit-profile" className={({ isActive }) =>
                                `flex items-center justify-between px-3 py-2 ${isActive ? 'bg-[#EFEBEB] text-[#0b0544] font-medium' : 'hover:bg-gray-100'}`
                            }>
                                <span className="flex items-center space-x-2">
                                    <MdOutlineModeEdit className="text-lg" />                                      <span>Edit Profile</span>
                                </span>
                                <span className="text-2xl font-light">›</span>
                            </NavLink>
                        </li>

                        <li className="border-t border-gray-300">
                            <NavLink to="/skin-type-test" className={({ isActive }) =>
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
                            <NavLink to="/about-my-skin" className={({ isActive }) =>
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
                            <NavLink to="/monthly-report" className={({ isActive }) =>
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
                            <NavLink to="/routine-analysis" className={({ isActive }) =>
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
                            <NavLink to="/badges" className={({ isActive }) =>
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
                <h2 className="mt-2 pl-2 text-xs font-semibold text-gray-500 uppercase mb-3">Notifications</h2>

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
                <h2 className="mt-2 pl-2 text-xs font-semibold text-gray-500 uppercase mb-3">Help & Privacy</h2>
                <div className='bg-white shadow-md p-6 space-y-8 border-r border-gray-200 border rounded-2xl '>

                    <div className="border-b border-gray-300 flex justify-between items-center  py-4">
                        <span className="h-5 flex items-center space-x-2">

                            <IoCallOutline  ars className="text-lg" />
                            <span>Support</span>
                        </span>
                        <input type="checkbox" className="toggle toggle-sm scale-75" />
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <Outlet></Outlet>

        </div>
    );
};

export default Dashboard;
