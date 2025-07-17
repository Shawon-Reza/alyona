import React, { useRef, useEffect, useState } from 'react';
import { Paperclip, Send, Camera, RefreshCcw } from 'lucide-react';
import AboutMySkin from './AboutMySkin';
import Productimgfordetails from '../assets/Productimgfordetails.png';

const FaceScan = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [imageSrc, setImageSrc] = useState('');
    const [captured, setCaptured] = useState(false);

    useEffect(() => {
        const initCamera = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            } catch (err) {
                console.error('Camera access error:', err);
            }
        };
        initCamera();
    }, []);

    const capturePhoto = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (!canvas || !video) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        setImageSrc(dataUrl);
        setCaptured(true);
    };

    const retakePhoto = () => {
        setCaptured(false);
        setImageSrc('');
    };

    return (
        <div className="flex flex-col h-full overflow-hidden px-2 lg:px-4">
            {/* Date */}
            <div className="text-[14px] text-gray-500 bg-[#EFEBEB] text-center mb-3 mt-1 w-fit px-4 py-1 rounded-full mx-auto">
                May 5
            </div>

            {/* Main Content */}
            <div className="flex flex-1 flex-col lg:flex-row gap-6 overflow-hidden">
                {/* Video or Captured Image */}
                <div className="w-full lg:w-1/2 flex justify-center items-center">
                    <div className="relative aspect-square w-full max-w-[480px]  min-h-[480px] bg-black rounded-xl overflow-hidden shadow-md">
                        {!captured ? (
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <img src={imageSrc} alt="Captured" className="w-full h-full object-cover" />
                        )}

                        {/* Face Grid Overlay */}
                        <div className="absolute inset-0 pointer-events-none">
                            <img src="/facial-grid.svg" alt="Face Grid" className="w-full h-full opacity-80" />
                        </div>

                        {/* Action Button */}
                        <div className="absolute bottom-3 right-3 flex gap-2">
                            {!captured ? (
                                <button
                                    onClick={capturePhoto}
                                    className="bg-white rounded-full p-2 shadow hover:bg-gray-100 transition"
                                >
                                    <Camera size={18} />
                                </button>
                            ) : (
                                <button
                                    onClick={retakePhoto}
                                    className="bg-white rounded-full p-2 shadow hover:bg-gray-100 transition"
                                >
                                    <RefreshCcw size={18} />
                                </button>
                            )}
                        </div>

                        <canvas ref={canvasRef} className="hidden" />
                    </div>
                </div>

                {/* Analysis & Product */}
                <div className="flex flex-col gap-6 w-full lg:w-1/2 overflow-y-auto pr-2 pt-6">
                    <AboutMySkin />

                    <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm max-w-sm">
                        <img
                            src={Productimgfordetails}
                            alt="Product"
                            className="w-10 h-20 object-contain rounded-2xl"
                        />
                        <p className="text-sm font-semibold text-gray-800 leading-tight">
                            Ceramide Hydrating <br />
                            Night Cream
                        </p>
                    </div>
                </div>
            </div>

            {/* Chat Input */}
            <div className="pt-4">
                <div className="w-full border-t border-gray-200 bg-white/50 backdrop-blur-[100px] px-4 py-3 rounded-b-2xl">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-between w-full bg-white rounded-lg px-4 py-2 shadow-sm">
                            <input
                                type="text"
                                placeholder="Write a message"
                                className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                            />
                            <button className="p-1.5 rounded-full hover:bg-gray-100 transition">
                                <Paperclip size={18} className="text-gray-500" />
                            </button>
                        </div>
                        <button className="w-12 h-10 flex items-center justify-center bg-[#0D0A44] text-white rounded-lg hover:opacity-90 transition">
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FaceScan;
