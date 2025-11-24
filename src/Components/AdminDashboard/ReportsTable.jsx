import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowUp, ArrowDown, ArrowUpDown, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axiosApi from '@/api/axiosApi';

const ReportsTable = () => {
    const [searchTerm, setSearchTerm] = useState('');
    // Local input state to avoid rapid re-renders on every keystroke
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

    // Keep hooks in the same order on every render: place navigation hook here
    const navigate = useNavigate();

    // Pagination removed — render full list

    // Map our column keys to API ordering params
    const orderingFor = (key, direction) => {
        if (!key) return undefined;
        const dirPrefix = direction === 'desc' ? '-' : '';
        if (key === 'name') return `${dirPrefix}user__full_name`;
        if (key === 'month') return `${dirPrefix}month`;
        if (key === 'date') return `${dirPrefix}created_at`;
        return undefined;
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ['reportsData', searchTerm, sortConfig.key, sortConfig.direction],
        queryFn: async () => {
            const params = {};
            const ordering = orderingFor(sortConfig.key, sortConfig.direction);
            if (ordering) params.ordering = ordering;
            if (searchTerm && searchTerm.trim().length) params.search = searchTerm.trim();

            const res = await axiosApi.get('/mentor/api/v1/mentor-report-pdf/', { params });
            // API returns an array of report objects (see user-provided structure)
            return Array.isArray(res.data) ? res.data : [];
        }
    });

    // Debounce updating the actual searchTerm used for queries
    useEffect(() => {
        const t = setTimeout(() => {
            setSearchTerm(inputValue);
        }, 300);
        return () => clearTimeout(t);
    }, [inputValue]);

    console.log(data)

    if (isLoading) return 'Loading...';
    if (error) return 'An error has occurred: ' + (error.message || String(error));







    const list = Array.isArray(data) ? data : [];
    const totalRecords = list.length;

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

    // no-op: downloads are handled by direct report links in the table

    return (
        <div className="min-h-screen sm:p-6">
            <div>
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4 sm:mb-0">Reports</h1>

                    <div className="flex flex-row items-center gap-4 w-full sm:w-auto">
                        {/* Search */}
                        <div className="relative w-full sm:w-64">
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search"
                                className="input input-bordered bg-white pl-10 w-full rounded-lg shadow-md"
                                value={inputValue}
                                onChange={(e) => { setInputValue(e.target.value); }}
                            />
                            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
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
                                        <th className="text-left font-medium text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {list.map((r) => {
                                        const label = r.user_full_name || 'Report';
                                        let dateLabel = '';
                                        try { dateLabel = new Date(r.created_at).toLocaleString(); } catch (e) { dateLabel = r.created_at; }
                                        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                                        const monthLabel = (typeof r.month === 'number' && r.month >= 1 && r.month <= 12) ? monthNames[r.month - 1] : String(r.month || '');

                                        return (
                                            <tr key={r.id} className="hover:bg-gray-50">
                                                <td
                                                    onClick={() => {

                                                        navigate(`/mentordashboard/reports/user-reports/${r.user}`);
                                                    }}

                                                    className="text-gray-800 cursor-pointer">{label}</td>
                                                <td className="text-gray-600">{dateLabel}</td>
                                                <td className="text-gray-600">{monthLabel}</td>
                                                <td>
                                                    <a href={r.report_file} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm p-2" title="Open report">
                                                        <Download size={16} className="text-gray-500" />
                                                    </a>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div className="text-sm font-bold text-gray-600 text-end px-5 pb-2 mt-3">Total: {totalRecords.toLocaleString()}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportsTable;
