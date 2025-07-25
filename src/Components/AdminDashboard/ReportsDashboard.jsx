import React from 'react';
import { ChevronRight, Plus, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ReportsDashboard = () => {
    const monthlyReports = [
        { month: 'January', date: '05/01', time: '10:30' },
        { month: 'February', date: '12/02', time: '11:30' },
        { month: 'March', date: '05/03', time: '14:30' },
        { month: 'April', date: '02/04', time: '10:20' },
        { month: 'May', date: '15/05', time: '20:15' },
    ];

    const handleCreateReport = () => {
        console.log('Creating new report...');
    };

    const handleDownloadReport = (month) => {
        console.log(`Downloading ${month} report...`);
    };

    const navigate = useNavigate();
    return (
        <div className="min-h-screen">
            <div className="">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
                    <span>Sophia Brown</span>
                    <ChevronRight size={16} />
                    <span className="font-medium">Reports</span>
                </div>

                {/* Page Title */}
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Reports</h1>

                {/* Create New Report Button */}
                <div
                    className="bg-[#D2B8A1] hover:bg-[#ad8e73]  transition-colors duration-200 rounded-lg p-4 mb-6 cursor-pointer group"
                    onClick={handleCreateReport}
                >
                    <div className="flex items-center justify-between">
                        <span
                            onClick={() => {
                                navigate('/mentordashboard/reports/create-reports')
                            }}
                            className="font-bold text-white" >Create new report</span>
                        <Plus size={20} className="text-gray-600 group-hover:text-gray-700 transition-colors" />
                    </div>
                </div>

                {/* Monthly Reports List */}
                <div className="space-y-1">
                    {monthlyReports.map((report, index) => (
                        <div
                            key={index}
                            className="bg-white hover:bg-gray-50 transition-colors duration-200 rounded-lg p-4 border border-gray-100 group cursor-pointer"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <h3 className="text-gray-800 font-medium">{report.month}</h3>
                                </div>

                                <div className="flex items-center gap-6 text-sm text-gray-600">
                                    <span>{report.date}</span>
                                    <span>{report.time}</span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDownloadReport(report.month);
                                        }}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                                        title={`Download ${report.month} report`}
                                    >
                                        <Download size={16} className="text-gray-500 hover:text-gray-700" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReportsDashboard;