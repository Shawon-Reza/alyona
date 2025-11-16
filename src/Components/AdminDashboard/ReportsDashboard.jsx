import React, { useState } from 'react';
import { ChevronRight, Plus, Download } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axiosApi from '@/api/axiosApi';
import { FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';


const IMG_BASE = import.meta.env.VITE_IMG_BASE || 'http://10.10.13.80:8005';

const ReportsDashboard = () => {
    const { id } = useParams();
    const navigate = useNavigate();


    // Create modal state and form (hooks must run unconditionally and before early returns)
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [createForm, setCreateForm] = useState({ month: '', year: '', notes: '' });
    const queryClient = useQueryClient();
    const [isCreating, setIsCreating] = useState(false);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['monthlySkinReports'],
        queryFn: async () => {
            const res = await axiosApi.get(`/accounts/api/v1/user-report/${id}`);
            return res.data;
        }
    });
    console.log(data)
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div className="text-sm text-red-500">An error has occurred: {String(error)}</div>;



    const handleCreateReport = () => {
        setShowCreateModal(true);
    };
    
    const handleCreateChange = (e) => {
        const { name, value } = e.target;
        setCreateForm((s) => ({ ...s, [name]: value }));
    };

    

    const handleConfirmCreate = async () => {
        // Prepare payload, ensure numeric month/year
        const payload = {
            month: createForm.month ? Number(createForm.month) : undefined,
            year: createForm.year ? Number(createForm.year) : undefined,
            notes: createForm.notes || ''
        };

        console.log('Create report payload:', payload);

        if (!id) {
            console.warn('No user id available in route params; cannot create report');
            setShowCreateModal(false);
            return;
        }

        try {
            setIsCreating(true);
            const res = await axiosApi.get(`/mentor/api/v1/monthly-report-pdf/${id}/`, {
                params: {
                    month: payload.month,
                    year: payload.year,
                }
            });
            console.log('Report generation response:', res.data);
            // Invalidate and refetch report list
            queryClient.invalidateQueries(['monthlySkinReports']);
            toast.success('Report created successfully');
        } catch (e) {
            console.error('Failed to generate report:', e);
            toast.error('Failed to create report. Please try again.');
        } finally {
            setIsCreating(false);
            setShowCreateModal(false);
            setCreateForm({ month: '', year: '', notes: '' });
        }
    };
    const list = Array.isArray(data) ? data : [];

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return (
        <div className="min-h-screen">
            <div className="">
                
                {/* Page Title */}
                <h1 className="text-2xl font-semibold text-gray-800 mb-6 mt-2">Reports</h1>

                {/* Create New Report Button */}
                <div
                    className="bg-[#D2B8A1] hover:bg-[#ad8e73]  transition-colors duration-200 rounded-lg p-4 mb-6 cursor-pointer group"
                    onClick={handleCreateReport}
                >
                    <div className="flex items-center justify-between">
                        <span
                            // onClick={() => {
                            //     navigate('/mentordashboard/reports/create-reports')
                            // }}
                            className="font-bold text-white" >Create new report</span>
                        <Plus size={20} className="text-gray-600 group-hover:text-gray-700 transition-colors" />
                    </div>
                </div>

                {/* Create Report Modal */}
                {showCreateModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                            <h3 className="text-lg font-semibold mb-4">Create New Report</h3>

                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm text-gray-600">Month</label>
                                    <select name="month" value={createForm.month} onChange={handleCreateChange} className="input input-bordered w-full mt-1 ">
                                        <option value="">Select month</option>
                                        {monthNames.map((mn, i) => (
                                            <option key={i} value={i + 1}>{mn}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-600">Year</label>
                                    <input name="year" value={createForm.year} onChange={handleCreateChange} type="number" className="input input-bordered w-full mt-1" />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-600">Notes (optional)</label>
                                    <textarea name="notes" value={createForm.notes} onChange={handleCreateChange} className="textarea textarea-bordered w-full mt-1" rows={3} />
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end gap-3">
                                <button onClick={() => setShowCreateModal(false)} className="btn btn-ghost">Cancel</button>
                                <button onClick={handleConfirmCreate} disabled={isCreating} className="btn btn-primary">
                                    {isCreating ? 'Creating...' : 'Confirm'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Monthly Reports List.................................. */}
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
            </div>
        </div>
    );
};

export default ReportsDashboard;