import { Outlet } from 'react-router-dom';
import AdminDashboardSidebar from '../Components/AdminDashboard/AdminDashboardSidebar';
import AdminDashboardNavbar from '../Components/AdminDashboard/AdminDashboardNavbar';
import useIsBelowMd from '../hooks/useIsBelowMd';
import { useEffect, useState } from 'react';

const AdminDashboard = () => {
    const isBelowMd = useIsBelowMd();
    const [viewMode, setViewMode] = useState('sidebar');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (!isBelowMd) {
            setViewMode('both'); // Show both for larger screens
            setSidebarOpen(false); // Close mobile sidebar when switching to desktop
        } else {
            setViewMode('outlet'); // Default to content on mobile
        }
    }, [isBelowMd]);

    const toggleView = () => {
        if (isBelowMd) {
            setSidebarOpen(!sidebarOpen);
        }
    };

    const handleSidebarItemClick = () => {
        if (isBelowMd) {
            setSidebarOpen(false); // Close sidebar when item is clicked on mobile
        }
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-white via-[#f7f1ec] to-white">
            {/* Mobile Sidebar Overlay */}
            {isBelowMd && sidebarOpen && (
                <div
                    className="fixed inset-0 bg-white z-40 md:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar Component */}
            <div className={`
                ${isBelowMd
                    ? `fixed left-0 top-0 h-full z-50 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`
                    : 'relative'
                }
                ${viewMode === 'sidebar' || viewMode === 'both' || (isBelowMd && sidebarOpen) ? 'block' : 'hidden'}
            `}>
                <div
                    className={`sticky top-0 ${isBelowMd ? 'pt-6 px-4' : 'pt-6 px-6 max-h-screen  overflow-y-auto'}`}
                >
                    <AdminDashboardSidebar
                        handleSidebarItemClick={handleSidebarItemClick}
                        toggleView={toggleView}
                        closeSidebar={closeSidebar}
                        isMobile={isBelowMd}
                    />
                </div>

            </div>

            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col min-h-screen ${isBelowMd ? 'w-full' : ''}`}>
                {/* Navbar */}
                <div className="flex-shrink-0 px-4 md:px-6 py-4 md:py-6">
                    <AdminDashboardNavbar
                        toggleView={toggleView}
                        isMobile={isBelowMd}
                        sidebarOpen={sidebarOpen}
                    />
                </div>

                {/* Content Area */}
                <div className={`flex-1 px-4 md:px-6 pb-4 md:pb-6 ${viewMode === 'outlet' || viewMode === 'both' ? 'block' : 'hidden'
                    }`}>
                    <div className="h-full overflow-auto  ">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;