import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Eye, Edit, Bell, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MentorUsersTable = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [filterOpen, setFilterOpen] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    
    const userData = [
        {
            id: 1,
            name: 'Carlos Ramirez',
            isNew: true,
            lastContact: null,
            nextMeeting: null,
            lastReport: null,
            status: 'Active'
        },
        {
            id: 2,
            name: 'Emma Thompson',
            lastContact: '05-10-2025 11:15',
            nextMeeting: { date: '06-10-2025 11:15', isTomorrow: true },
            lastReport: '2025-08-03',
            status: 'Active'
        },
        {
            id: 3,
            name: 'Liam Smith',
            lastContact: '06-05-2025 16:45',
            nextMeeting: '06-15-2025 16:45',
            lastReport: '2025-08-04',
            status: 'Active'
        },
        {
            id: 4,
            name: 'Sophia Brown',
            lastContact: '03-25-2025 09:30',
            nextMeeting: '06-15-2025 09:30',
            lastReport: '2025-08-05',
            status: 'Active'
        },
        {
            id: 5,
            name: 'Noah Davis',
            lastContact: '04-15-2025 12:00',
            nextMeeting: '06-15-2025 12:00',
            lastReport: '2025-08-06',
            status: 'Active'
        },
        {
            id: 6,
            name: 'Olivia Wilson',
            lastContact: '05-20-2025 14:15',
            nextMeeting: null,
            lastReport: '2025-08-07',
            status: 'Active'
        },
        {
            id: 7,
            name: 'James Taylor',
            lastContact: '06-30-2025 12:00',
            nextMeeting: null,
            lastReport: '2025-08-08',
            status: 'Active'
        },
        {
            id: 8,
            name: 'Isabella Martinez',
            lastContact: '03-30-2025 08:30',
            nextMeeting: null,
            lastReport: '2025-08-09',
            status: 'Active'
        },
        {
            id: 9,
            name: 'Mason Anderson',
            lastContact: '04-10-2025 15:00',
            nextMeeting: null,
            lastReport: '2025-08-10',
            status: 'Active'
        },
        {
            id: 10,
            name: 'Ava Thomas',
            lastContact: '05-14-2025 10:15',
            nextMeeting: null,
            lastReport: '2025-08-11',
            status: 'Active'
        },
        {
            id: 11,
            name: 'Ethan Jackson',
            lastContact: '06-22-2025 13:45',
            nextMeeting: null,
            lastReport: '2025-08-12',
            status: 'Active'
        },
        {
            id: 12,
            name: 'Mia White',
            lastContact: '03-18-2025 17:30',
            nextMeeting: null,
            lastReport: '2025-08-13',
            status: 'Active'
        },
        {
            id: 13,
            name: 'Lucas Harris',
            lastContact: '04-12-2025 19:00',
            nextMeeting: null,
            lastReport: '2025-08-14',
            status: 'Active'
        },
        {
            id: 14,
            name: 'Charlotte Clark',
            lastContact: '05-01-2025 07:45',
            nextMeeting: null,
            lastReport: '2025-08-15',
            status: 'Not subscribed'
        },
        {
            id: 15,
            name: 'Henry Lewis',
            lastContact: '06-28-2025 16:00',
            nextMeeting: null,
            lastReport: '2025-08-16',
            status: 'Active'
        }
    ];

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (columnKey) => {
        if (sortConfig.key === columnKey) {
            return sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
        }
        return <ChevronUp size={14} className="opacity-50" />;
    };

    const filteredData = userData.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAction = (action, user) => {
        console.log(`${action} action for user:`, user.name);
    };

    const navigate = useNavigate();

    return (
        <div className=" pr-0 md:pr-6">
            <div className=" md:px-0">
                {/* Header */}
                <div className=" md:mb-6">
                    {/* Mobile Header */}
                    <div className="md:hidden">
                        {isSearchVisible ? (
                            <div className="flex items-center gap-3 py-4">
                                <button 
                                    onClick={() => setIsSearchVisible(false)}
                                    className="p-1"
                                >
                                    <ArrowLeft size={20} className="text-gray-600" />
                                </button>
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        placeholder="Search users..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        autoFocus
                                    />
                                    <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between py-4">
                                <h1 className="text-xl font-semibold text-gray-800">Users</h1>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => setIsSearchVisible(true)}
                                        className="p-2 hover:bg-gray-100 rounded-lg"
                                    >
                                        <Search size={20} className="text-gray-600" />
                                    </button>
                                    <div className="dropdown dropdown-end">
                                        <div
                                            tabIndex={0}
                                            role="button"
                                            className="btn btn-ghost btn-sm flex items-center gap-1"
                                            onClick={() => setFilterOpen(!filterOpen)}
                                        >
                                            <span className="text-sm">Filter</span>
                                            <ChevronUp size={14} />
                                        </div>
                                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-32 right-0">
                                            <li><a>All Users</a></li>
                                            <li><a>Active</a></li>
                                            <li><a>Not subscribed</a></li>
                                            <li><a>New Users</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Desktop Header */}
                    <div className="hidden md:block">
                        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Users</h1>
                        <div className="flex items-center justify-between">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="input input-bordered bg-white pl-10 w-64"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                            <div className="dropdown dropdown-end">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn border shadow-md border-base-300 btn-outline bg-white flex items-center gap-2"
                                    onClick={() => setFilterOpen(!filterOpen)}
                                >
                                    <span>Filter</span>
                                    <ChevronUp size={16} />
                                </div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-32">
                                    <li><a>All Users</a></li>
                                    <li><a>Active</a></li>
                                    <li><a>Not subscribed</a></li>
                                    <li><a>New Users</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="card bg-white shadow-sm border border-gray-100 mx-0">
                    <div className="card-body p-0">
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr className="border-b-3 border-gray-200">
                                        <th
                                            className="cursor-pointer hover:bg-gray-50 text-left font-medium text-gray-700"
                                            onClick={() => handleSort('name')}
                                        >
                                            <div className="flex items-center gap-2">
                                                Users
                                                {getSortIcon('name')}
                                            </div>
                                        </th>
                                        {/* Desktop only columns */}
                                        <th
                                            className="hidden md:table-cell cursor-pointer hover:bg-gray-50 text-left font-medium text-gray-700"
                                            onClick={() => handleSort('lastContact')}
                                        >
                                            <div className="flex items-center gap-2">
                                                Last contact
                                                {getSortIcon('lastContact')}
                                            </div>
                                        </th>
                                        <th
                                            className="hidden md:table-cell cursor-pointer hover:bg-gray-50 text-left font-medium text-gray-700"
                                            onClick={() => handleSort('nextMeeting')}
                                        >
                                            <div className="flex items-center gap-2">
                                                Next meeting
                                                {getSortIcon('nextMeeting')}
                                            </div>
                                        </th>
                                        <th
                                            className="hidden md:table-cell cursor-pointer hover:bg-gray-50 text-left font-medium text-gray-700"
                                            onClick={() => handleSort('lastReport')}
                                        >
                                            <div className="flex items-center gap-2">
                                                Last Report
                                                {getSortIcon('lastReport')}
                                            </div>
                                        </th>
                                        <th
                                            className="hidden md:table-cell cursor-pointer hover:bg-gray-50 text-left font-medium text-gray-700"
                                            onClick={() => handleSort('status')}
                                        >
                                            <div className="flex items-center gap-2">
                                                Status
                                                {getSortIcon('status')}
                                            </div>
                                        </th>
                                        <th className="cursor-pointer hover:bg-gray-50 text-left font-medium text-gray-700">
                                            <div className="flex items-center gap-2">
                                                Actions
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50">
                                            <td
                                                onClick={() => {
                                                    navigate('notification-composer')
                                                }}
                                                className="text-gray-800 cursor-pointer"
                                            >
                                                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium">{user.name}</span>
                                                        {user.isNew && (
                                                            <span className="badge badge-sm bg-amber-100 text-amber-800 border-amber-200">
                                                                New
                                                            </span>
                                                        )}
                                                    </div>
                                                    {/* Mobile: Show status below name */}
                                                    <div className="md:hidden">
                                                        <span className={`badge badge-sm ${user.status === 'Active'
                                                            ? 'bg-green-100 text-green-800 border-green-200'
                                                            : 'bg-gray-100 text-gray-600 border-gray-200'
                                                            }`}>
                                                            {user.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            {/* Desktop only columns */}
                                            <td className="hidden md:table-cell text-gray-600">
                                                {user.lastContact || '-'}
                                            </td>
                                            <td className="hidden md:table-cell text-gray-600">
                                                {user.nextMeeting ? (
                                                    <div className="flex items-center gap-2">
                                                        {typeof user.nextMeeting === 'object' ? user.nextMeeting.date : user.nextMeeting}
                                                        {typeof user.nextMeeting === 'object' && user.nextMeeting.isTomorrow && (
                                                            <span className="badge badge-sm bg-amber-600 text-white">
                                                                Tomorrow
                                                            </span>
                                                        )}
                                                    </div>
                                                ) : '-'}
                                            </td>
                                            <td className="hidden md:table-cell text-gray-600">
                                                {user.lastReport || '-'}
                                            </td>
                                            <td className="hidden md:table-cell">
                                                <span className={`badge badge-sm ${user.status === 'Active'
                                                    ? 'bg-green-100 text-green-800 border-green-200'
                                                    : 'bg-gray-100 text-gray-600 border-gray-200'
                                                    }`}>
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="flex items-center gap-1 md:gap-2">
                                                    <button
                                                        className="btn btn-ghost btn-sm p-1 md:p-2"
                                                        onClick={() => handleAction('view', user)}
                                                        title="View user"
                                                    >
                                                        <Eye size={14} className="md:w-4 md:h-4 text-gray-500" />
                                                    </button>
                                                    <button
                                                        className="btn btn-ghost btn-sm p-1 md:p-2"
                                                        onClick={() => handleAction('edit', user)}
                                                        title="Edit user"
                                                    >
                                                        <Edit size={14} className="md:w-4 md:h-4 text-gray-500" />
                                                    </button>
                                                    <button
                                                        className="btn btn-ghost btn-sm p-1 md:p-2"
                                                        onClick={() => handleAction('notify', user)}
                                                        title="Send notification"
                                                    >
                                                        <Bell size={14} className="md:w-4 md:h-4 text-gray-500" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Empty State */}
                {filteredData.length === 0 && (
                    <div className="text-center py-8 md:py-12">
                        <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-full mb-3 md:mb-4">
                            <Search size={20} className="text-gray-400 md:w-6 md:h-6" />
                        </div>
                        <p className="text-gray-500 text-sm md:text-base">
                            {searchTerm ? 'No users found matching your search' : 'No users found'}
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

export default MentorUsersTable;