import React from 'react';
import { FaPaperPlane, FaRegFileAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const reports = [
    { month: 'May 2025' },
    { month: 'April 2025' },
    { month: 'March 2025' },
];

const MonthlySkinReport = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full mt-6">
            <h2 className="text-[22px] font-semibold text-gray-800 mb-3">Reports</h2>
            <div className="space-y-3 w-full">
                {reports.map((report, idx) => (
                    <div
                        key={idx}
                        className="w-full flex justify-between items-center px-4 py-3 bg-[#FFFFFF] rounded-md border border-base-100 shadow-sm"
                    >
                        <span
                            onClick={() => {
                                navigate(`report-details`)
                            }}
                            className="text-sm font-medium text-gray-800 cursor-pointer w-1/2">{report.month}</span>
                        <div className="flex space-x-3 text-base">
                            <FaPaperPlane className="text-[#b5764f]" />
                            <FaRegFileAlt className="text-[#0f0e25]" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MonthlySkinReport;
