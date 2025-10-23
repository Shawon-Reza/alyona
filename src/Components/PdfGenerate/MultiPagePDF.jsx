// MultiPagePDF.jsx
import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import domtoimage from 'dom-to-image';
import Page1 from './Page1';
import Page2 from './Page2';

const MultiPagePDF = () => {
    const outletRef = useRef(null);

    const downloadPDF = async () => {
        const input = outletRef.current;
        if (!input) return;

        input.classList.add("pdf-mode");

        // Save original style to restore later
        const originalStyle = { ...input.style };
        input.style.width = '100%';
        input.style.maxWidth = '100%';

        try {
            const dataUrl = await domtoimage.toPng(input, {
                cacheBust: true,
                style: {
                    background: '#fff',
                    color: '#000',
                },
            });

            const pdf = new jsPDF('p', 'mm', 'a4');
            const img = new Image();
            img.src = dataUrl;

            img.onload = function () {
                const imgWidth = 210; // A4 width in mm
                const imgHeight = (img.height * imgWidth) / img.width;

                pdf.addImage(img, 'PNG', 0, 0, imgWidth, imgHeight);

                if (imgHeight > 297) {
                    let y = imgHeight - 297;
                    while (y > 0) {
                        pdf.addPage();
                        pdf.addImage(img, 'PNG', 0, -y, imgWidth, imgHeight);
                        y -= 297;
                    }
                }

                pdf.save('dashboard-data.pdf');
            };
        } catch (error) {
            console.error('PDF Generation Failed:', error);
        } finally {
            input.classList.remove("pdf-mode");
            Object.assign(input.style, originalStyle);
        }
    };

    return (
        <div className="p-6">
            <button
                onClick={downloadPDF}
                className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
                Download PDF
            </button>

            <div ref={outletRef} className="mt-6 bg-white shadow p-8 w-full max-w-[794px]">
                {/* Your printable content here */}
                <h1 className="text-2xl font-bold mb-4">Your Report</h1>
                <p>This will be exported as a PDF. Style it however you like.</p>
                <div className="mt-4 h-[1200px] bg-gray-100">Simulate tall content</div>


                <Page1></Page1>
                <Page2></Page2>



            </div>
        </div>
    );
};

export default MultiPagePDF;
