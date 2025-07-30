import React, { useState } from 'react';
import { Search, ChevronDown, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MentorInboxComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('Active');
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    
    const conversations = [
        {
            id: 1,
            name: 'Janet Arias',
            message: 'Hi, I have a question',
            time: '9:30',
            avatar: 'https://wallpapers.com/images/hd/pretty-profile-pictures-i1rumnm6oi0lry1s.jpg',
            isOnline: true
        },
        {
            id: 2,
            name: 'Aaron Diaz',
            message: 'Today is perfect, thanks!',
            time: '21:30',
            avatar: 'https://wallpapers.com/images/hd/pretty-profile-pictures-i1rumnm6oi0lry1s.jpg',
            isOnline: true
        },
        {
            id: 3,
            name: 'Gabriel H.',
            message: 'Of course!',
            time: '4pm',
            avatar: 'https://wallpapers.com/images/hd/pretty-profile-pictures-i1rumnm6oi0lry1s.jpg',
            isOnline: false
        }
    ];

    const filteredConversations = conversations.filter(conversation =>
        conversation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conversation.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const navigate = useNavigate();

    return (
        <div className="min-h-screen">
            <div>
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-4 md:px-0 md:py-0">
                    {/* Mobile: Show search or title */}
                    <div className="flex items-center gap-3 flex-1 md:flex-none">
                        {isSearchVisible ? (
                            <div className="flex items-center gap-3 flex-1 md:hidden">
                                <button 
                                    onClick={() => setIsSearchVisible(false)}
                                    className="p-1"
                                >
                                    <ArrowLeft size={20} className="text-gray-600" />
                                </button>
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        placeholder="Search conversations..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        autoFocus
                                    />
                                    <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>
                        ) : (
                            <h1 className="text-lg md:text-xl font-semibold text-gray-800">
                                Inbox ({conversations.length})
                            </h1>
                        )}
                    </div>

                    {/* Desktop: Always show search and filter */}
                    <div className="hidden md:flex items-center gap-4">
                        <div className="relative py-5">
                            <input
                                type="text"
                                placeholder="Search"
                                className="input input-bordered bg-white pl-10 w-64 rounded-lg"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                        
                        <div className="dropdown dropdown-end">
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

                    {/* Mobile: Show search and filter icons */}
                    {!isSearchVisible && (
                        <div className="flex items-center gap-2 md:hidden">
                            <button 
                                onClick={() => setIsSearchVisible(true)}
                                className="p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <Search size={20} className="text-gray-600" />
                            </button>
                            
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-sm flex items-center gap-1">
                                    <span className="text-sm">{activeFilter}</span>
                                    <ChevronDown size={14} />
                                </div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-32 right-0">
                                    <li><a onClick={() => setActiveFilter('Active')}>Active</a></li>
                                    <li><a onClick={() => setActiveFilter('All')}>All</a></li>
                                    <li><a onClick={() => setActiveFilter('Archived')}>Archived</a></li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                {/* Conversations */}
                <div className="card">
                    <div className="card-body p-0">
                        {/* Today Section */}
                        <div className="px-4 md:px-6 py-3">
                            <h2 className="text-sm font-medium text-gray-500 text-center">Today</h2>
                        </div>
                        
                        {/* Conversation List */}
                        <div className="divide-y divide-gray-100">
                            {filteredConversations.map((conversation) => (
                                <div
                                    key={conversation.id}
                                    onClick={() => {
                                        navigate('chatWithUser')
                                    }}
                                    className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-white hover:bg-gray-50 cursor-pointer transition-colors duration-200 mb-2 md:mb-3 mx-2 md:mx-0 rounded-xl active:bg-gray-100"
                                >
                                    {/* Avatar with Online Status */}
                                    <div className="relative flex-shrink-0">
                                        <div className="avatar">
                                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full">
                                                <img
                                                    src={conversation.avatar || "/placeholder.svg"}
                                                    alt={`${conversation.name} avatar`}
                                                    className="rounded-full object-cover"
                                                />
                                            </div>
                                        </div>
                                        {conversation.isOnline && (
                                            <div className="absolute -bottom-0.5 -right-0.5 md:-bottom-1 md:-right-1 w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full border-2 border-white"></div>
                                        )}
                                    </div>

                                    {/* Message Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between mb-1">
                                            <h3 className="font-medium text-gray-800 truncate text-sm md:text-base pr-2">
                                                {conversation.name}
                                            </h3>
                                            <span className="text-xs text-gray-500 flex-shrink-0">
                                                {conversation.time}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-xs md:text-sm text-gray-600 truncate pr-2">
                                                {conversation.message}
                                            </p>
                                            {conversation.isOnline && (
                                                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Empty State */}
                {filteredConversations.length === 0 && (
                    <div className="text-center py-8 md:py-12 px-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-full mb-3 md:mb-4">
                            <Search size={20} className="text-gray-400 md:w-6 md:h-6" />
                        </div>
                        <p className="text-gray-500 text-sm md:text-base">
                            {searchTerm ? 'No conversations found matching your search' : 'No conversations found'}
                        </p>
                        {searchTerm && (
                            <button 
                                onClick={() => setSearchTerm('')}
                                className="mt-2 md:mt-3 text-blue-600 text-sm hover:text-blue-700"
                            >
                                Clear search
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MentorInboxComponent;