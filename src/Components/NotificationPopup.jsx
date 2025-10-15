import axiosApi from '@/api/axiosApi';
import React, { useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const NotificationPopup = ({ isOpen, onClose, notifications = [], setNotifications }) => {
    const [activeTab, setActiveTab] = useState('all');


    const handleClickOnNotification = (id) => {
        console.log("Cliked notification:", id)
        // Make notification as read
        axiosApi.get(`/messaging/api/v1/notifications/${id}`)
            .then(res => {
                console.log("Notification marked as read:", res.data);
                // Optionally update local state to reflect the change
                setNotifications((prev) =>
                    prev.map((n) =>
                        n.id === id ? { ...n, is_read: true } : n
                    )
                );
            })
            .catch(err => {
                console.error("Error marking notification as read:", err);
            });

    }

    const handleDeleteNotification = (id) => {

        axiosApi.delete(`/messaging/api/v1/notifications/${id}`)
            .then(res => {
                console.log("Notification deleted: ", res.data);
            })
            .catch(err => {
                console.error("Error deleting notification:", err);
            });
        // Optionally update local state to reflect the change
        setNotifications((prev) =>
            prev.filter((n) => n.id !== id)
        );
    }

    const handleDeleteAllNotifications = () => {
        axiosApi.delete(`/messaging/api/v1/notifications`)
            .then(res => {
                console.log("All Notifications deleted: ", res.data);
                setNotifications([]);
            })
            .catch(err => {
                console.error("Error deleting all notifications:", err);
            });

    }



    if (!isOpen) return null;
    console.log(notifications)
    // Filter unread notifications based on `is_read`
    const unreadNotifications = notifications.filter(n => !n.is_read);
    const displayed = activeTab === 'unread' ? unreadNotifications : notifications;

    return (
        <div className="fixed top-[117px] lg:top-[134px] right-4 lg:right-10 w-80 rounded-2xl bg-white/80 shadow-lg p-4 z-50 ">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">Notifications</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-lg">
                    &times;
                </button>
            </div>

            {/* Tabs */}
            <div className="flex justify-between ">
                <NavLink
                    to="#"
                    onClick={() => setActiveTab('all')}
                    className={`text-sm font-medium ${activeTab === 'all' ? 'text-[#BB9777]' : 'text-gray-600'}`}
                >
                    All
                </NavLink>
                <NavLink
                    to="#"
                    onClick={() => setActiveTab('unread')}
                    className={`text-sm font-medium ${activeTab === 'unread' ? 'text-[#BB9777]' : 'text-gray-600'}`}
                >
                    Unread
                </NavLink>
            </div>
            <div className='my-1 mt-2 flex justify-between cursor-pointer underline underline-offset-4 decoration-gray-500 text-sm'>
                <p></p>
                <p
                    onClick={() => {
                        handleDeleteAllNotifications()
                    }}
                >Delete All</p>
            </div>

            {/* Notifications */}
            <div className="space-y-4 overflow-y-auto pr-1 max-h-[calc(100vh-450px)] overflaw-y-auto ">
                {displayed.length === 0 && (
                    <p className="text-sm text-gray-400 text-center">No notifications</p>
                )}

                {displayed.map((notification) => (
                    <div
                        onClick={() => handleClickOnNotification(notification?.id)}
                        key={notification?.id}
                        className={`cursor-pointer flex items-center justify-between p-3 border border-gray-200 rounded-lg ${!notification.is_read ? 'bg-gray-100' : 'bg-white'
                            } hover:bg-gray-50 transition`}
                    >
                        <div>
                            <p className="text-sm font-semibold">Notification</p>
                            <p className="text-xs text-gray-500">{notification.text}</p>
                        </div>

                        <MdDeleteOutline
                            onClick={(e) => {
                                e.stopPropagation(); // 🛑 Prevent parent click
                                handleDeleteNotification(notification?.id);
                            }}
                            size={20}
                            className="z-50 hover:scale-115 transform transition-transform duration-700 ease-in-out"
                        />

                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificationPopup;
