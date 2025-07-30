import React, { useState } from 'react';
import { Search, ArrowUp, ArrowDown, ArrowUpDown, Download, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ReportsTable = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [timeFilter, setTimeFilter] = useState('This month');

    const userData = [
        { id: 1, name: 'Janel Aries', date: '06-01-2025 11:15', month: 'June' },
        { id: 2, name: 'Liam Smith', date: '06-02-2025 11:15', month: 'June' },
        { id: 3, name: 'Sophia Brown', date: '06-03-2025 11:15', month: 'June' },
        { id: 4, name: 'Noah Davis', date: '06-04-2025 11:15', month: 'June' },
        { id: 5, name: 'Olivia Wilson', date: '06-05-2025 11:15', month: 'June' },
        { id: 6, name: 'James Taylor', date: '06-06-2025 11:15', month: 'June' },
        { id: 7, name: 'Isabella Martinez', date: '06-07-2025 11:15', month: 'June' },
        { id: 8, name: 'Mason Anderson', date: '06-08-2025 11:15', month: 'June' },
        { id: 9, name: 'Ava Thomas', date: '06-09-2025 11:15', month: 'June' },
        { id: 10, name: 'Ethan Jackson', date: '06-10-2025 11:15', month: 'June' },
        { id: 11, name: 'Mia White', date: '06-11-2025 11:15', month: 'June' },
        { id: 12, name: 'Lucas Harris', date: '06-12-2025 11:15', month: 'June' },
        { id: 13, name: 'Charlotte Clark', date: '06-13-2025 11:15', month: 'June' },
        { id: 14, name: 'Henry Lewis', date: '06-14-2025 11:15', month: 'June' },
        { id: 15, name: 'Amelia Robinson', date: '06-15-2025 11:15', month: 'June' },
        { id: 16, name: 'Alexander Walker', date: '06-16-2025 11:15', month: 'June' },
    ];

    const totalRecords = 8618;
    const recordsPerPage = 20;
    const totalPages = 431;

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (columnKey) => {
        if (sortConfig.key === columnKey) {
            return sortConfig.direction === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
        }
        return <ArrowUpDown size={14} className="opacity-50" />;
    };

    const handleDownload = (user) => {
        console.log(`Downloading report for ${user.name}`);
    };

    const filteredData = userData.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const navigate = useNavigate();
    return (
        <div className="min-h-screen sm:p-6">
            <div>
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4 sm:mb-0">Reports</h1>

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                        {/* Search */}
                        <div className="relative w-full sm:w-64">
                            <input
                                type="text"
                                placeholder="Search"
                                className="input input-bordered bg-white pl-10 w-full rounded-lg shadow-md"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>

                        {/* Time Filter */}
                        <select
                            className="select select-bordered bg-white rounded-lg shadow-md mt-4 sm:mt-0 w-full sm:w-auto"
                            value={timeFilter}
                            onChange={(e) => setTimeFilter(e.target.value)}
                        >
                            <option>This month</option>
                            <option>Last month</option>
                            <option>Last 3 months</option>
                            <option>Last 6 months</option>
                            <option>This year</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="card bg-white shadow-sm">
                    <div className="card-body p-0">
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th
                                            className="cursor-pointer hover:bg-gray-50 text-left font-medium text-gray-700"
                                            onClick={() => handleSort('name')}
                                        >
                                            <div className="flex items-center gap-2">
                                                Users
                                                {getSortIcon('name')}
                                            </div>
                                        </th>
                                        <th
                                            className="cursor-pointer hover:bg-gray-50 text-left font-medium text-gray-700"
                                            onClick={() => handleSort('date')}
                                        >
                                            <div className="flex items-center gap-2">
                                                Date
                                                {getSortIcon('date')}
                                            </div>
                                        </th>
                                        <th
                                            className="cursor-pointer hover:bg-gray-50 text-left font-medium text-gray-700"
                                            onClick={() => handleSort('month')}
                                        >
                                            <div className="flex items-center gap-2">
                                                Month
                                                {getSortIcon('month')}
                                            </div>
                                        </th>
                                        <th
                                            className="cursor-pointer hover:bg-gray-50 text-left font-medium text-gray-700"
                                            onClick={() => handleSort('actions')}
                                        >
                                            <div className="flex items-center gap-2">
                                                Actions
                                                {getSortIcon('actions')}
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50">
                                            <td
                                                onClick={() => {
                                                    navigate('/mentordashboard/reports/user-reports');
                                                }}
                                                className="text-gray-800 cursor-pointer">{user.name}</td>
                                            <td className="text-gray-600">{user.date}</td>
                                            <td className="text-gray-600">{user.month}</td>
                                            <td>
                                                <button
                                                    className="btn btn-ghost btn-sm p-2"
                                                    onClick={() => handleDownload(user)}
                                                    title="Download report"
                                                >
                                                    <Download size={16} className="text-gray-500" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-6 flex-col sm:flex-row">
                    <div className="text-sm text-gray-600 mb-4 sm:mb-0">
                        1 to {recordsPerPage} of {totalRecords.toLocaleString()}
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            className="btn btn-ghost btn-sm"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(1)}
                        >
                            <ChevronsLeft size={16} />
                        </button>
                        <button
                            className="btn btn-ghost btn-sm"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            <ChevronLeft size={16} />
                        </button>

                        <span className="text-sm text-gray-600 mx-4">
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            className="btn btn-ghost btn-sm"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            <ChevronRight size={16} />
                        </button>
                        <button
                            className="btn btn-ghost btn-sm"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(totalPages)}
                        >
                            <ChevronsRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportsTable;
