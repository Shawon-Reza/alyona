import React, { useEffect, useState } from 'react';
import { FaDownload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axiosApi from '@/api/axiosApi';

// Base URL for media files. Prefer vite env var `VITE_IMG_BASE`, fallback to local dev host.
const IMG_BASE = import.meta.env.VITE_IMG_BASE || 'http://10.10.13.80:8005';

const MonthlySkinReport = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);

    // Decode token once and set userId if available
    useEffect(() => {             
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const parts = token.split('.');
            if (parts.length < 2) return;
            const payload = parts[1];
            const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
            const pad = base64.length % 4;
            const padded = base64 + (pad ? '='.repeat(4 - pad) : '');
            const json = decodeURIComponent(Array.prototype.map.call(atob(padded), (c) => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            const parsed = JSON.parse(json);
            if (parsed && parsed.user_id) setUserId(parsed.user_id);
        } catch (e) {
            // ignore decode errors
        }
    }, []);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['monthlySkinReports', userId],
        queryFn: async () => {
            if (userId) {
                const res = await axiosApi.get(`/accounts/api/v1/user-report/${userId}`);
                return res.data;
            }
            const res = await axiosApi.get('/accounts/api/v1/user-report/');
            return res.data;
        }
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div className="text-sm text-red-500">An error has occurred: {String(error)}</div>;

    const list = Array.isArray(data) ? data : [];

    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    return (
        <div className="w-full mt-6">
            <h2 className="text-[22px] font-semibold text-gray-800 mb-3">Reports</h2>
            <div className="space-y-3 w-full">
                {list.length === 0 ? (
                    <div className="text-sm text-gray-500">No reports available.</div>
                ) : (
                    list.map((item, index) => {
                        const rpt = (item && item.report) ? item.report : item;
                        const timeline = item && item.timeline ? item.timeline : '';
                        let label = '';
                        if (timeline && timeline.indexOf(',') !== -1) {
                            const [m, y] = timeline.split(',');
                            const mi = parseInt(m, 10) - 1;
                            label = `${monthNames[mi] || m} ${y}`;
                        } else if (rpt && rpt.created_at) {
                            try { label = new Date(rpt.created_at).toLocaleDateString(); } catch (e) { label = rpt.created_at; }
                        }

                        const reportFile = rpt && rpt.report_file ? rpt.report_file : null;
                        let downloadUrl = null;
                        if (reportFile) {
                            if (typeof reportFile === 'string' && (reportFile.startsWith('http://') || reportFile.startsWith('https://'))) {
                                downloadUrl = reportFile;
                            } else if (typeof reportFile === 'string' && reportFile.startsWith('/')) {
                                downloadUrl = IMG_BASE + reportFile;
                            } else {
                                downloadUrl = reportFile;
                            }
                        }

                        const keyId = (rpt && rpt.id) || item.id || index;

                        return (
                            <div key={keyId} className="w-full flex justify-between items-center px-4 py-3 bg-[#FFFFFF] rounded-md border border-base-100 shadow-sm">
                                <span onClick={() => { navigate(`report-details/${(rpt && rpt.id) || item.id || ''}`); }} className="text-sm font-medium text-gray-800 cursor-pointer w-1/2">{label || 'Report'}</span>
                                <div className="flex space-x-3 text-base items-center">
                                    {downloadUrl ? (
                                        <a href={downloadUrl} target="_blank" rel="noreferrer" className="text-sm text-gray-700 flex items-center gap-2">
                                            <FaDownload />
                                            <span className="hidden sm:inline">Download</span>
                                        </a>
                                    ) : (
                                        <span className="text-sm text-gray-400">No file</span>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default MonthlySkinReport;
