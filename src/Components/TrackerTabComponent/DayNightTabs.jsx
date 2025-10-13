import { NavLink, useLocation } from 'react-router-dom';
import ProductFeedback from './ProductFeedback';


export default function DayNightTabs() {
    const { pathname } = useLocation();

    // Extract the base path (e.g., "daily-skincare", "addon-skincare", etc.)
    const basePath = pathname.split('/').slice(2, 3)[0] || 'daily-skincare';



   




    return (
        <div className="relative flex border-b border-gray-200 mt-6">
            <NavLink
                to={`/tracker/${basePath}/day`}
                end
                className={({ isActive }) =>
                    `w-1/2 text-center py-2 text-sm font-medium transition-all ${isActive
                        ? 'text-[#B1805A] border-b-2 border-[#B1805A]'
                        : 'text-gray-600 hover:text-[#B1805A]'
                    }`
                }
            >
                Day
            </NavLink>

            <NavLink
                to={`/tracker/${basePath}/night`}
                className={({ isActive }) =>
                    `w-1/2 text-center py-2 text-sm font-medium transition-all ${isActive
                        ? 'text-[#B1805A] border-b-2 border-[#B1805A]'
                        : 'text-gray-600 hover:text-[#B1805A]'
                    }`
                }
            >
                Night
            </NavLink>


          



        </div>
    );
}
