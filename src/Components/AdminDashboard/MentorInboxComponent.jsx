import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MentorInboxComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('Active');

    const conversations = [
        {
            id: 1,
            name: 'Janet Arias',
            message: 'Hi, I have a question',
            time: '9:30',
            avatar: '/placeholder.svg?height=40&width=40',
            isOnline: true
        },
        {
            id: 2,
            name: 'Aaron Diaz',
            message: 'Today is perfect, thanks!',
            time: '21:30',
            avatar: '/placeholder.svg?height=40&width=40',
            isOnline: true
        },
        {
            id: 3,
            name: 'Gabriel H.',
            message: 'Of course!',
            time: '4pm',
            avatar: '/placeholder.svg?height=40&width=40',
            isOnline: false
        }
    ];

    const filteredConversations = conversations.filter(conversation =>
        conversation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conversation.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const navigate = useNavigate()
    return (
        <div className="min-h-screen ">
            <div className="">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-xl font-semibold text-gray-800">
                        Inbox ({conversations.length})
                    </h1>

                    <div className="flex items-center gap-4">
                        {/* Search */}
                        <div className="relative py-5 ">
                            <input
                                type="text"
                                placeholder="Search"
                                className="input input-bordered bg-white pl-10 w-64 rounded-lg"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>

                        {/* Active Filter */}
                        <div className="dropdown dropdown-end ">
                            <div tabIndex={0} role="button" className="btn btn-outline bg-white flex items-center gap-2 border border-base-300 rounded-lg">
                                <span>{activeFilter}</span>
                                <ChevronDown size={16} />
                            </div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-32">
                                <li><a onClick={() => setActiveFilter('Active')}>Active</a></li>
                                <li><a onClick={() => setActiveFilter('All')}>All</a></li>
                                <li><a onClick={() => setActiveFilter('Archived')}>Archived</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Conversations */}
                <div className="card  ">
                    <div className="card-body p-0">
                        {/* Today Section */}
                        <div className="px-6 py-3 ">
                            <h2 className="text-sm font-medium text-gray-500 text-center ">Today</h2>
                        </div>

                        {/* Conversation List */}
                        <div className="divide-y divide-gray-100">
                            {filteredConversations.map((conversation) => (
                                <div
                                    key={conversation.id}
                                    onClick={() => {
                                        navigate('chatWithUser')
                                    }}
                                    className="flex items-center gap-4 p-4 bg-white hover:bg-gray-50 cursor-pointer transition-colors duration-200 mb-3 rounded-xl"
                                >
                                    {/* Avatar with Online Status */}
                                    <div className="relative">
                                        <div className="avatar">
                                            <div className="w-12 h-12 rounded-full">
                                                <img
                                                    src={conversation.avatar || "/placeholder.svg"}
                                                    alt={`${conversation.name} avatar`}
                                                    className="rounded-full object-cover"
                                                />
                                            </div>
                                        </div>
                                        {conversation.isOnline && (
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                                        )}
                                    </div>

                                    {/* Message Content */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-gray-800 truncate">
                                            {conversation.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 truncate mt-1">
                                            {conversation.message}
                                        </p>
                                    </div>

                                    {/* Time and Status */}
                                    <div className="flex flex-col items-end gap-2">
                                        <span className="text-xs text-gray-500">
                                            {conversation.time}
                                        </span>
                                        {conversation.isOnline && (
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Empty State */}
                {filteredConversations.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No conversations found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MentorInboxComponent;