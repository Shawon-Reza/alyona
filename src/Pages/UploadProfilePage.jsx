import React, { useRef, useState } from 'react';
import { FaCamera, FaImage } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import LoginPageOverLap from '../assets/LoginPageOverLap.png'

const UploadProfilePage = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFromGallery = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleContinue = () => {
        if (!imagePreview) {
            alert("Please upload your picture");
            return;
        }

        // handle saving image, uploading or navigating
        console.log("Image selected:", imagePreview);

        setTimeout(() => {
            navigate('/StartQuizPage');
        }, 2000);
        // change to actual path
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-white via-[#f7f1ec] to-white flex flex-col items-center justify-center relative overflow-hidden px-4">

            <div className='absolute bottom-0 right-0'>
                <img src={LoginPageOverLap} alt="OverlapIMG" />
            </div>

            {/* Top Nav */}
            <div className="absolute top-0 left-0 w-full flex justify-between items-center px-8 py-6">
                <div className="text-xl font-semibold text-[#2c2c2c] flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#1e1e2f] text-white rounded-full flex items-center justify-center font-bold">YB</div>
                    YOURSELF BEAUTY
                </div>
                <div className="space-x-4">
                    <button className="text-sm text-[#1e1e2f] hover:underline">Log in</button>
                    <button className="bg-[#0c0c36] text-white px-4 py-2 rounded-md text-sm hover:bg-[#1c1c4f]">Join</button>
                </div>
            </div>

            {/* Center Content */}
            <div className="text-center mt-24">
                <h2 className="text-2xl font-semibold text-gray-800">We want to know you better</h2>
                <p className="text-gray-500 mt-2 mb-6">Add these fields to personalize your experience</p>

                {/* Upload Circle */}
                <div className="w-28 h-28 rounded-full bg-gray-200 mx-auto mb-4 border-2 border-dashed border-gray-400 overflow-hidden flex items-center justify-center">
                    {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="object-cover w-full h-full" />
                    ) : (
                        <span className="text-sm text-gray-500">Upload</span>
                    )}
                </div>

                {/* Hidden File Input */}
                <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleImageChange}
                />

                {/* Upload Buttons */}
                <div className="flex justify-center gap-4 mb-6">
                    <button
                        className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => fileInputRef.current.click()}
                    >
                        <FaCamera /> From my camera
                    </button>
                    <button
                        className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleFromGallery}
                    >
                        <FaImage /> From my gallery
                    </button>
                </div>

                {/* Continue Button */}
                <button
                    onClick={handleContinue}
                    className="bg-[#0c0c36] text-white px-10 py-3 rounded-md text-sm hover:bg-[#1c1c4f]"
                >
                    Continue
                </button>
            </div>

            {/* Decorative Flower Illustration
            <div className="absolute bottom-0 right-4 opacity-10 pointer-events-none">
                <img
                    src="https://static.thenounproject.com/png/124207-200.png"
                    alt="Flower Illustration"
                    className="w-40 md:w-60"
                />
            </div> */}
        </div>
    );
};

export default UploadProfilePage;
