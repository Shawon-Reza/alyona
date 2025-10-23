import React from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import PDFReport from './PDFReport';

// Sample data structure - replace with your backend data
const sampleData = {
    // Page 1 data
    tipOfMonth: "You've been using Niacinamide consistently for 4 weeks — keep going! It usually takes 8—12 weeks to see full brightening effects.*",
    articles: [
        { title: 'Articles 1', link: 'www.document-link.com' },
        { title: 'Articles 2', link: 'www.document-link.com' }
    ],
    morningRoutine: [
        'Alpha Beta Pore Perfecting Cleansing Gel',
        'Peptide Serum',
        'Kakadu C Brightening Daily Cleanser',
        'Oil-To-Milk Cleanser'
    ],
    eveningRoutine: [
        'Alpha Beta Pore Perfecting Cleansing Gel',
        'Kakadu C Brightening Daily Cleanser',
        'Oil-To-Milk Cleanser'
    ],

    // Page 2 data
    userName: 'Shawon Reza',
    month: 'Month',
    consistentProducts: [
        'Alpha Beta Pore Perfecting Cleansing Gel',
        'Peptide Serum',
        'Kakadu C Brightening Daily Cleanser',
        'Oil-To-Milk Cleanser'
    ],
    newProducts: [
        'Purifying Facial Toner',
        'Peptide Serum'
    ],
    recommendation: 'hydration....',
    goalProgress: 60,
    goal: 'Use moisturizer for 1 month',
    bestStreak: 6,
    totalDays: 18
};

const DownloadPDFButton = ({ reportData = sampleData }) => {
    return (
        <div className="inline-block">

            <div style={{ height: '100vh', width:"100vh", border: '1px solid #ccc' }}>
                <PDFViewer width="100%" height="100%">
                    <PDFReport data={reportData} />
                </PDFViewer>
            </div>
            <PDFDownloadLink
                document={<PDFReport data={reportData} />}
                fileName={`skincare-report-${new Date().toISOString().split('T')[0]}.pdf`}
                className="inline-flex items-center px-2 py-1 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
                {({ blob, url, loading, error }) =>
                    loading ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            ...
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            {/* Download Report */}
                        </span>
                    )
                }
            </PDFDownloadLink>
        </div>
    );
};

export default DownloadPDFButton;