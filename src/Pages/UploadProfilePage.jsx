import React, { useRef, useState } from 'react';
import { FaCamera, FaImage } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import LoginPageOverLap from '../assets/LoginPageOverLap.png';
import AuthenticationNav from '../Components/AuthenticationNav';
import { ChevronRight } from 'lucide-react';


const UploadProfilePage = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleFromGallery = () => {
        if (fileInputRef.current) fileInputRef.current.click();
    };

    const handleContinue = () => {
        if (!imagePreview) {
            alert("Please upload your picture");
            return;
        }

        console.log("Image selected:", imagePreview);
        setTimeout(() => navigate('/StartQuizPage'), 1000);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-[#f7f1ec] to-white relative px-4 pb-20">
            {/* Top Navigation */}
            <AuthenticationNav />

            {/* Background Flower (desktop only) */}
            <div className="absolute bottom-11 right-10 hidden sm:block ">
                <img src={LoginPageOverLap} alt="Decorative Flower" className="scale-115" />
            </div>

            {/* Main Section */}
            <div className="flex-1 flex flex-col items-center justify-center text-center max-w-xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
                    We want to know you better
                </h2>
                <p className="text-sm md:text-base text-gray-600 mb-6">
                    Add these fields to personalize your experience
                </p>

                {/* Upload Circle */}
                <div className="w-28 h-28 rounded-full bg-gray-200 border-2 border-dashed border-gray-400 overflow-hidden flex items-center justify-center mb-2">
                    {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="object-cover w-full h-full" />
                    ) : (
                        <span className="text-sm text-gray-500">Upload</span>
                    )}
                </div>

                <p className="text-lg font-bold text-gray-500 mb-6">Upload your picture</p>

                {/* Hidden File Input */}
                <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleImageChange}
                />

                {/* Upload Options */}
                <div className="flex  sm:flex-row gap-3 justify-center mb-8">
                    <button
                        onClick={() => fileInputRef.current.click()}
                        className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition"
                    >
                        <FaCamera /> From my camera
                    </button>
                    <button
                        onClick={handleFromGallery}
                        className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition"
                    >
                        <FaImage /> From my gallery
                    </button>
                </div>

                {/* Continue Button for Desktop */}
                <div className="hidden md:flex w-full max-w-xs mb-8">
                    <button
                        onClick={handleContinue}
                        className="w-full flex items-center justify-between px-5 gap-2 bg-[#0c0c36] text-white py-3 rounded-md text-base hover:bg-[#1c1c4f] transition"
                    >
                        Continue <ChevronRight />
                    </button>
                </div>
            </div>

            {/* Sticky Continue Button for Mobile */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-t md:hidden">
                <button
                    onClick={handleContinue}
                    className="w-full flex items-center justify-between px-5 gap-2 bg-[#0c0c36] text-white py-3 rounded-md text-base hover:bg-[#1c1c4f] transition"
                >
                    Continue
                    <ChevronRight />
                </button>
            </div>
        </div>
    );
};

export default UploadProfilePage;
