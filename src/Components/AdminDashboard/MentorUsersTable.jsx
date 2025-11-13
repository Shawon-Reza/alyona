import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, ChevronDown, ChevronUp, Eye, Edit, Bell, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axiosApi from '@/api/axiosApi';

const MentorUsersTable = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [filterOpen, setFilterOpen] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const { data: users = [], isLoading, error } = useQuery({
        queryKey: ['assigned-users'],
        queryFn: async () => {
            const res = await axiosApi.get('/mentor/api/v1/assigned-users');
            return res.data ;
        },
    });
    console.log(users)

    const visibleData = useMemo(() => {
        const q = (searchTerm || '').trim().toLowerCase();
        const filtered = users.filter(user => (user.full_name || '').toLowerCase().includes(q));

        if (!sortConfig.key) return filtered;

        const key = sortConfig.key;
        const dir = sortConfig.direction === 'asc' ? 1 : -1;

        const getVal = (u) => {
            // handle nested next_meeting object
            if (key === 'next_meeting') {
                const nm = u.next_meeting;
                if (!nm) return '';
                return typeof nm === 'object' ? (nm.date || '') : nm;
            }
            if (key === 'status') {
                return u.status ? 'Active' : 'Inactive';
            }
            return (u[key] ?? '')
        };

        return [...filtered].sort((a, b) => {
            const va = getVal(a);
            const vb = getVal(b);
            // normalize
            const sa = String(va).toLowerCase();
            const sb = String(vb).toLowerCase();
            if (sa < sb) return -1 * dir;
            if (sa > sb) return 1 * dir;
            return 0;
        });
    }, [users, searchTerm, sortConfig]);

    const navigate = useNavigate();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error.message}</p>;

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

    const handleAction = (action, user) => {
        console.log(`${action} action for user:`, user.full_name);
    };

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
                                            onClick={() => handleSort('full_name')}
                                        >
                                            <div className="flex items-center gap-2">
                                                Users
                                                {getSortIcon('full_name')}
                                            </div>
                                        </th>
                                        {/* Desktop only columns */}
                                        <th
                                            className="hidden md:table-cell cursor-pointer hover:bg-gray-50 text-left font-medium text-gray-700"
                                            onClick={() => handleSort('last_contacted')}
                                        >
                                            <div className="flex items-center gap-2">
                                                Last contact
                                                {getSortIcon('last_contacted')}
                                            </div>
                                        </th>
                                        <th
                                            className="hidden md:table-cell cursor-pointer hover:bg-gray-50 text-left font-medium text-gray-700"
                                            onClick={() => handleSort('next_meeting')}
                                        >
                                            <div className="flex items-center gap-2">
                                                Next meeting
                                                {getSortIcon('next_meeting')}
                                            </div>
                                        </th>
                                        <th
                                            className="hidden md:table-cell cursor-pointer hover:bg-gray-50 text-left font-medium text-gray-700"
                                            onClick={() => handleSort('last_report')}
                                        >
                                            <div className="flex items-center gap-2">
                                                Last Report
                                                {getSortIcon('last_report')}
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
                                    {visibleData.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50">
                                            <td
                                                onClick={() => {
                                                    navigate('notification-composer')
                                                }}
                                                className="text-gray-800 cursor-pointer"
                                            >
                                                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium">{user.full_name}</span>
                                                        {(user.last_contacted === null || user.last_contacted === undefined) && (
                                                            <span className="badge badge-sm bg-amber-100 text-amber-800 border-amber-200">
                                                                New
                                                            </span>
                                                        )}
                                                    </div>
                                                    {/* Mobile: Show status below name */}
                                                    <div className="md:hidden">
                                                        <span className={`badge badge-sm ${user.status
                                                            ? 'bg-green-100 text-green-800 border-green-200'
                                                            : 'bg-gray-100 text-gray-600 border-gray-200'
                                                            }`}>
                                                            {user.status ? 'Active' : 'Not subscribed'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            {/* Desktop only columns */}
                                            <td className="hidden md:table-cell text-gray-600">
                                                {user.last_contacted || '-'}
                                            </td>
                                            <td className="hidden md:table-cell text-gray-600">
                                                {user.next_meeting ? (
                                                    <div className="flex items-center gap-2">
                                                        {typeof user.next_meeting === 'object' ? user.next_meeting.date : user.next_meeting}
                                                        {typeof user.next_meeting === 'object' && user.next_meeting.isTomorrow && (
                                                            <span className="badge badge-sm bg-amber-600 text-white">
                                                                Tomorrow
                                                            </span>
                                                        )}
                                                    </div>
                                                ) : '-'}
                                            </td>
                                            <td className="hidden md:table-cell text-gray-600">
                                                {user.last_report || '-'}
                                            </td>
                                            <td className="hidden md:table-cell">
                                                <span className={`badge badge-sm ${user.status
                                                    ? 'bg-green-100 text-green-800 border-green-200'
                                                    : 'bg-gray-100 text-gray-600 border-gray-200'
                                                    }`}>
                                                    {user.status ? 'Active' : 'Not subscribed'}
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
                {visibleData.length === 0 && (
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