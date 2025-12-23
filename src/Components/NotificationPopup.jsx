import axiosApi from '@/api/axiosApi';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdDeleteOutline } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import Swal from 'sweetalert2';

const NotificationPopup = ({ isOpen, onClose, notifications = [], setNotifications }) => {
    const [activeTab, setActiveTab] = useState('all');
    const navigate = useNavigate();


    const handleClickOnNotification = (notification) => {
        if (!notification) return;
        console.log('Clicked notification:', notification.id);
        const id = notification.id;
        // Make notification as read
        axiosApi.get(`/messaging/api/v1/notifications/${id}`)
            .then(res => {
                console.log('Notification marked as read:', res.data);
                // Update local state to reflect the change
                setNotifications((prev) =>
                    prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
                );
                // For Reminder notifications, navigate accordingly
                // Navigate based on category and target_url for Reminder notifications
                if (notification.category === 'Reminder') {
                    const target = notification.target_url;
                    if (target) {
                        // If target_url exists, go to extra quiz with that id
                        navigate(`/extraquiz/${target}`);
                    } else {
                        // otherwise go to missed quiz page
                        navigate('/missedquiz');
                    }
                    // close popup after navigation
                    if (typeof onClose === 'function') onClose();

                } else if (notification.category === 'Mentor') {
                    // For Mentor notifications, open the monthly report dashboard
                    navigate('/dashboard/monthly-report');
                    if (typeof onClose === 'function') onClose();
                } else if (notification.category === 'Goal') {
                    // Goal notifications take the user to the skincare tracker
                    navigate('/tracker/skincare/day');
                    if (typeof onClose === 'function') onClose();
                } else if (notification.category === 'Product') {
                    const target = notification.target_url;
                    if (target) {
                        // If target_url exists, navigate to the product detail page
                        navigate(`/library/product-detail/${target}`);
                    } else {
                        // otherwise go to the product library
                        navigate('/library');
                    }
                    // close popup after navigation
                    if (typeof onClose === 'function') onClose();
                }
            })
            .catch(err => {
                console.error('Error marking notification as read:', err);
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

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete all!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosApi.delete(`/messaging/api/v1/notifications`)
                    .then(res => {
                        console.log("All Notifications deleted: ", res.data);
                        setNotifications([]);
                        Swal.fire({
                            title: "Deleted!",
                            text: "All notifications have been deleted.",
                            icon: "success"
                        });
                    })
                    .catch(err => {
                        console.error("Error deleting all notifications:", err);
                    });
            }
        });

    }



    if (!isOpen) return null;
    console.log(notifications)
    // Filter unread notifications based on `is_read`
    const unreadNotifications = notifications.filter(n => !n.is_read);
    const displayed = activeTab === 'unread' ? unreadNotifications : notifications;

    return (
        <div className="fixed top-[117px] lg:top-[134px] right-4 lg:right-10 w-80 rounded-2xl bg-white/95 shadow-xl p-4 z-50 ">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">Notifications</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-lg">
                    &times;
                </button>
            </div>

            <div className='flex items-center  justify-between  mb-3'>
                {/* Tabs */}
                <div className="flex gap-5 ">
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
            </div>

            {/* Notifications */}
            <div className="space-y-4 overflow-y-auto pr-1 max-h-[calc(100vh-450px)] overflaw-y-auto ">
                {displayed.length === 0 && (
                    <p className="text-sm text-gray-400 text-center">No notifications</p>
                )}

                {displayed.map((notification) => {
                    // map categories to light background colors
                    const categoryBgMap = {
                        Reminder: 'bg-[#fff8ec]',
                        Routine: 'bg-[#fff8ec]',
                        Mentor: 'bg-[#f3f0ff]',
                        Product: 'bg-[#f0fdf4]',
                        "Level up": 'bg-[#f0f9ff]',
                        Admin: "bg-[#6366F1]/20",

                    };
                    const cardBg = categoryBgMap[notification?.category] || 'bg-white';

                    // Try to parse notification.text as JSON payload
                    let payload = null;
                    try {
                        payload = typeof notification.text === 'string' ? JSON.parse(notification.text) : notification.text;
                    } catch (e) {
                        payload = { message: notification.text };
                    }

                    const isRoutine = notification?.category === 'Reminder' || notification?.category === 'Routine';

                    const am = payload?.weekly_streak?.am_usage || [];
                    const pm = payload?.weekly_streak?.pm_usage || [];

                    const DayBlocks = ({ values, isAM }) => (
                        <div className="flex items-center gap-2">
                            {(values || []).map((v, i) => (
                                <div
                                    key={i}
                                    className={`w-5 h-2 rounded-sm ${v ? (isAM ? 'bg-[#BB9777]' : 'bg-[#7271E3]') : 'bg-gray-200'} transition`}
                                />
                            ))}
                        </div>
                    );

                    // Visual prominence: unread (is_read === false) should appear stronger; read items are muted.
                    const mutedClass = notification?.is_read ? 'opacity-60' : '';
                    // Add a subtle ring/border for unread notifications, color depends on category
                    const categoryRingMap = {
                        Reminder: 'ring-1 ring-[#B1805A]/20',
                        Routine: 'ring-1 ring-[#B1805A]/20',
                        Mentor: 'ring-1 ring-[#7C6DFE]/15',
                        Product: 'ring-1 ring-[#10B981]/15',
                        'Level up': 'ring-1 ring-[#06B6D4]/15',
                        // Admin : 'ring-1 ring-gray-200/20',
                    };
                    const ringClass = !notification?.is_read ? (categoryRingMap[notification?.category] || 'ring-1 ring-gray-200/20') : '';

                    return (
                        <div
                            onClick={() => handleClickOnNotification(notification)}
                            key={notification?.id}
                            className={`cursor-pointer flex items-center justify-between p-3 border border-gray-200 rounded-lg ${cardBg} ${ringClass} ${mutedClass} hover:brightness-95 transition`}
                        >
                            {isRoutine && payload?.weekly_streak ? (
                                <div
                                    className="flex items-start gap-3 w-full">
                                    <div
                                        onClick={() => {
                                            navigate("/tracker/skincare/day")
                                        }}
                                        className="flex-1 ">
                                        <p className="text-sm font-semibold">{notification?.category}</p>
                                        <p className="text-xs text-gray-500 mb-2">{payload?.message || ''}</p>

                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3">
                                                <Sun color="#BB9777" size={18} />
                                                <DayBlocks values={am} isAM={true} />
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Moon color="#7271E3" size={18} />
                                                <DayBlocks values={pm} isAM={false} />
                                            </div>
                                        </div>
                                    </div>

                                    <MdDeleteOutline
                                        onClick={(e) => {
                                            e.stopPropagation(); // 🛑 Prevent parent click
                                            handleDeleteNotification(notification?.id);
                                        }}
                                        size={20}
                                        className="z-50 shrink-0"
                                    />
                                </div>
                            ) : (
                                <>
                                    <div>
                                        <p className="text-sm font-semibold">{notification?.category}</p>
                                        <p className="text-xs text-gray-500">{payload?.message ?? notification.text}</p>
                                    </div>

                                    <MdDeleteOutline
                                        onClick={(e) => {
                                            e.stopPropagation(); // 🛑 Prevent parent click
                                            handleDeleteNotification(notification?.id);
                                        }}
                                        size={20}
                                        className="z-50 shrink-0"
                                    />
                                </>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default NotificationPopup;
