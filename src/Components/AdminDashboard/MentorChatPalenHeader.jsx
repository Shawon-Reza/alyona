import React from 'react';
import { FileText, MessageCircle, Bell, Video } from 'lucide-react';
import userprofile from '../../assets/userprofile.png'
import { useLocation, useNavigate } from 'react-router-dom';

const MentorChatPalenHeader = () => {


    const location = useLocation()

    // console.log(location)
    const navigate = useNavigate()
    return (
        <div className="">
            <div className="px-4 py-3">

                <div className="flex items-center justify-between">
                    {/* User Profile */}
                    <div className="flex items-center gap-3">
                        {/* Avatar with Online Status */}
                        <div className="relative">
                            <div className="avatar">
                                <div className="w-12 h-12 rounded-xl">
                                    <img
                                        src={userprofile}
                                        alt="Janet Arias profile"
                                        className=" object-cover"
                                    />
                                </div>
                            </div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>

                        {/* User Name */}
                        <h2 className="text-lg font-medium text-gray-800">Janet Arias</h2>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                        <button className="btn btn-circle btn-ghost bg-gray-100 hover:bg-gray-200">
                            <FileText size={20} className="text-gray-600" />
                        </button>

                        <button className="btn btn-circle btn-ghost bg-gray-100 hover:bg-gray-200">
                            <MessageCircle size={20} className="text-gray-600" />
                        </button>

                        <button className="btn btn-circle btn-ghost bg-gray-100 hover:bg-gray-200">
                            <Bell size={20} className="text-gray-600" />
                        </button>

                        <button
                            onClick={() => {
                                navigate('videocall')
                            }}
                            className={`btn btn-circle bg-indigo-900 hover:bg-indigo-800 border-none ${location?.pathname == '/mentordashboard/chats/chatWithUser/videocall' ? "hidden" : ""}`}>
                            <Video size={20} className="text-white" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MentorChatPalenHeader;