
import { Outlet } from 'react-router-dom'; // Import Outlet for nested routing
import AdminDashboardSidebar from '../Components/AdminDashboard/AdminDashboardSidebar';
import AdminDashboardNavbar from '../Components/AdminDashboard/AdminDashboardNavbar';

const AdminDashboard = () => {
    return (
        <div className="px-6 flex min-h-screen bg-gradient-to-br from-white via-[#f7f1ec] to-white">
            {/* Sidebar Component */}

            <div className='mt-6 '>
                <AdminDashboardSidebar></AdminDashboardSidebar>
            </div>




            {/* Main Content Area */}
            <div className="flex-1 p-6 ">

                <div>
                    <AdminDashboardNavbar></AdminDashboardNavbar>
                </div>

                {/* Display content based on the route selected */}
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
