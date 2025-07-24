
import { Outlet } from 'react-router-dom'; // Import Outlet for nested routing
import AdminDashboardSidebar from '../Components/AdminDashboard/AdminDashboardSidebar';
import AdminDashboardNavbar from '../Components/AdminDashboard/AdminDashboardNavbar';
import useIsBelowMd from '../hooks/useIsBelowMd';
import { useEffect, useState } from 'react';

const AdminDashboard = () => {
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
            // Set to 'outlet' on small screens to hide sidebar and show content
            setViewMode('outlet');
        }
    };


    return (
        <div className="px-6 flex min-h-screen bg-gradient-to-br from-white via-[#f7f1ec] to-white">
            {/* Sidebar Component */}


            {
                (viewMode === 'sidebar' || viewMode === 'both')
                &&
                (
                    <div className='mt-6 '>
                        <AdminDashboardSidebar
                            handleSidebarItemClick={handleSidebarItemClick}
                            toggleView={toggleView}
                        />

                    </div>
                )
            }



            {/* Main Content Area */}
            <div className="flex-1 p-6 ">


                <div>
                    <AdminDashboardNavbar toggleView={toggleView} />
                </div>





                {
                    (viewMode === 'outlet' || viewMode === 'both')
                    &&
                    (

                        < div className='h-screen overflow-auto'>
                            <Outlet />
                        </div>
                    )
                }

            </div>
        </div >
    );
};

export default AdminDashboard;
