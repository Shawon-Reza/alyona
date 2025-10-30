import { Outlet } from 'react-router-dom';
import AdminDashboardSidebar from '../Components/AdminDashboard/AdminDashboardSidebar';
import AdminDashboardNavbar from '../Components/AdminDashboard/AdminDashboardNavbar';
import useIsBelowMd from '../hooks/useIsBelowMd';
import { useEffect, useState, useRef } from 'react';
import { Download } from 'lucide-react';
import domtoimage from 'dom-to-image-more';
import jsPDF from 'jspdf';

const AdminDashboard = () => {
    const isBelowMd = useIsBelowMd();
    const [viewMode, setViewMode] = useState('sidebar');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const outletRef = useRef(null); // ✅ attach ref to capture content

    useEffect(() => {
        if (!isBelowMd) {
            setViewMode('both');
            setSidebarOpen(false);
        } else {
            setViewMode('outlet');
        }
    }, [isBelowMd]);

    const toggleView = () => {
        if (isBelowMd) {
            setSidebarOpen(!sidebarOpen);
        }
    };

    const handleSidebarItemClick = () => {
        if (isBelowMd) {
            setSidebarOpen(false);
        }
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    const downloadPDF = async () => {
        const input = outletRef.current;
        if (!input) return;

        input.classList.add("pdf-mode"); // Add safe-mode class

        // Temporarily override styles for large screens
        const originalStyle = input.style; // Store original styles
        input.style.width = '100%'; // Ensure it spans the full page width
        input.style.maxWidth = '100%'; // Remove max-width for smaller devices

        // Override any other responsive classes
        input.classList.remove("min-w-full");  // Example of removing responsive class
        input.classList.add("w-full"); // Make sure it uses full width like on large screen

        try {
            const dataUrl = await domtoimage.toPng(input, {
                cacheBust: true,
                style: {
                    background: '#fff',
                    color: '#000',
                },
            });

            const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size in mm
            const img = new Image();
            img.src = dataUrl;

            img.onload = function () {
                const imgWidth = 210;  // A4 width in mm (fixed width)
                const imgHeight = (img.height * imgWidth) / img.width; // Maintain aspect ratio

                // Add the first page with the image
                pdf.addImage(img, 'PNG', 0, 0, imgWidth, imgHeight);

                // Track the current yPosition on the page (after the first page content)
                let yPosition = imgHeight;

                // If content exceeds the height, add new pages
                while (yPosition > pdf.internal.pageSize.height) {
                    pdf.addPage(); // Add a new page
                    yPosition -= pdf.internal.pageSize.height; // Adjust position for the next page
                }

                // Add remaining part of the image on the next page
                pdf.addImage(img, 'PNG', 0, yPosition, imgWidth, imgHeight);

                // Save the PDF
                pdf.save('dashboard-data.pdf');
            };
        } catch (error) {
            console.error('PDF Generation Failed:', error);
        } finally {
            input.classList.remove("pdf-mode"); // Restore normal state
            input.style = originalStyle; // Restore original styles
        }
    };








    return (
        <div className="flex min-h-screen bg-gradient-to-br from-white via-[#f7f1ec] to-white">
            {/* Mobile Sidebar Overlay */}
            {isBelowMd && sidebarOpen && (
                <div
                    className="fixed inset-0 bg-white z-40 md:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar Component */}
            <div
                className={`
                    ${isBelowMd
                        ? `fixed left-0 top-0 h-full z-50 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`
                        : 'relative'}
                    ${viewMode === 'sidebar' || viewMode === 'both' || (isBelowMd && sidebarOpen) ? 'block' : 'hidden'}
                `}
            >
                <div className={`sticky top-0 ${isBelowMd ? 'pt-6 px-4' : 'pt-6 px-6 max-h-screen overflow-y-auto'}`}>
                    <AdminDashboardSidebar
                        handleSidebarItemClick={handleSidebarItemClick}
                        toggleView={toggleView}
                        closeSidebar={closeSidebar}
                        isMobile={isBelowMd}
                    />
                </div>
            </div>

            {/* Main Content Area */}
            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col min-h-screen ${isBelowMd ? 'w-full' : ''}`}>
                {/* Navbar */}
                <div className="flex-shrink-0 px-4 md:px-6 py-4 md:py-6">
                    <AdminDashboardNavbar
                        toggleView={toggleView}
                        isMobile={isBelowMd}
                        sidebarOpen={sidebarOpen}
                    />
                </div>
                <div className="flex items-center gap-3">
                    {/* <button
                        onClick={downloadPDF}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium transition-colors"
                    >
                        Download PDF
                        <Download className="w-4 h-4" />
                    </button> */}
                </div>

                {/* Content Area */}
                <div className={`flex-1 px-4 md:px-6 pb-4 md:pb-6 ${viewMode === 'outlet' || viewMode === 'both' ? 'block' : 'hidden'}`}>
                    {/* ⬇️ Move ref here */}
                    <div ref={outletRef} className="space-y-4">
                        {/* <div className="flex items-center gap-3">
                            <button
                                onClick={downloadPDF}
                                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium transition-colors"
                            >
                                Download PDF
                                <Download className="w-4 h-4" />
                            </button>
                        </div> */}

                        {/* Only this part will be in PDF */}
                        <div className="bg-white shadow-md rounded-md p-4">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AdminDashboard;
