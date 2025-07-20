import { NavLink } from 'react-router-dom';

const tabs = [
    { label: 'Daily Skincare', to: 'daily-skincare' },
    { label: 'Add on Skincare', to: 'addon-skincare' },
    { label: 'Body Care', to: 'body-care' },
    { label: 'Hair Care', to: 'hair-care' },
    { label: 'Perfume', to: 'perfume' },
];


export default function TrackerTabs() {
    return (
        <div className="flex border-b border-gray-200 rounded-t-xl bg-white">
            {tabs.map((tab) => (
                <NavLink
                    key={tab.to}
                    to={tab.to}
                    className={({ isActive }) =>
                        `px-4 py-3 text-[10px] sm:text-sm md:text-lg xl:text-xl font-medium transition-all ${isActive
                            ? 'text-[#B1805A] border-b-2 border-[#B1805A] font-semibold'
                            : 'text-gray-600 hover:text-[#B1805A]'
                        }`
                    }
                >
                    {tab.label}
                </NavLink>
            ))}
        </div>
    );
}
