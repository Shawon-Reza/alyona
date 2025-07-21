import React from 'react';
import SubscribersBySubscription from './SubscribersBySubscription'; // Assuming this is the correct path
import { NavLink, Outlet } from 'react-router-dom';
import NewProductRequestCard from './NewProductRequestCard';

const AdminDashboardComponent = () => {
    return (
        <div>
            {/* Displaying Subscribers By Subscription */}
            <SubscribersBySubscription />



            {/* Tab Navigation */}
            <div className="flex justify-between items-center border- border-[#9e7e6b]  w-full px-6">

                {/* General Tab */}
                <NavLink
                    to="general" // This is the relative path for the "General" tab
                    className={({ isActive }) =>
                        `text-xl font-medium w-1/2 text-center ${isActive ? 'text-[#9e7e6b] border-b-2 border-[#9e7e6b] pb-2' : 'text-[#181818]'}` // Add padding-bottom when active
                    }
                >
                    General
                </NavLink>

                {/* Users Tab */}
                <NavLink
                    to="users" // This is the relative path for the "Users" tab
                    className={({ isActive }) =>
                        `text-xl font-medium w-1/2 text-center ${isActive ? 'text-[#9e7e6b] border-b-2 border-[#9e7e6b] pb-2' : 'text-[#181818]'}` // Add padding-bottom when active
                    }
                >
                    Users
                </NavLink>
            </div>
            
            <div>
                <NewProductRequestCard></NewProductRequestCard>
            </div>

            {/* Content Display */}
            <div>
                <Outlet /> {/* Dynamic content based on route */}
            </div>
        </div>
    );
};

export default AdminDashboardComponent;
