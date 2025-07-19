import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const NotificationPopup = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('all'); // State to track which tab is active

    if (!isOpen) return null; // Don't render if the popup is closed

    // Notifications
    const notifications = {
        all: [
            { id: 1, title: 'New Product added', message: 'Cleanser Free Oil', type: 'Products' },
            { id: 2, title: 'Your day routine is waiting', message: "Start now and don't lose your streak", type: 'Routine' },
            { id: 3, title: 'Use sunscreen', message: 'UV radiation is very high at this time', type: 'Alert' },
            { id: 4, title: 'You\'ve tried 3 cleansers', message: 'Share my achievement', type: 'Achievement' },
        ],
        unread: [
            { id: 2, title: 'Your day routine is waiting', message: "Start now and don't lose your streak", type: 'Routine' },
            { id: 3, title: 'Use sunscreen', message: 'UV radiation is very high at this time', type: 'Alert' },
        ]
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (

        <div className="fixed top-[110px] rounded-2xl right-5 w-80 bg-white/80 shadow-lg p-4  z-50">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">Notifications</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-lg">
                    &times;
                </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-between mb-4">
                <NavLink
                    to="#"
                    onClick={() => handleTabClick('all')}
                    className={`text-sm font-medium ${activeTab === 'all' ? 'text-[#BB9777]' : 'text-gray-600'}`}
                >
                    All
                </NavLink>
                <NavLink
                    to="#"
                    onClick={() => handleTabClick('unread')}
                    className={`text-sm font-medium ${activeTab === 'unread' ? 'text-[#BB9777]' : 'text-gray-600'}`}
                >
                    Unread
                </NavLink>
            </div>

            {/* Notification List */}
            <div className="space-y-4">
                {notifications[activeTab].map((notification) => (
                    <div key={notification.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <p className="text-sm font-semibold">{notification.title}</p>
                        <p className="text-xs text-gray-500">{notification.message}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificationPopup;
