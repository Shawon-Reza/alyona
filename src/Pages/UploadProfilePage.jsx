import React, { useRef, useState } from 'react';
import { FaCamera, FaImage } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import LoginPageOverLap from '../assets/LoginPageOverLap.png';
import AuthenticationNav from '../Components/AuthenticationNav';
import { ChevronRight } from 'lucide-react';
import axios from 'axios'; // Import axios for making API requests
import axiosApi from '@/api/axiosApi';
import { toast } from 'react-toastify';

const UploadProfilePage = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null); // State to store the image file
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        // Basic validation for file type and size
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Please upload a valid image.');
                return;
            }
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                alert('File size should not exceed 5MB.');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
            setImageFile(file); // Store the file in the state
        }
    };

    const handleFromGallery = () => {
        if (fileInputRef.current) fileInputRef.current.click();
    };

    // Function to send the image to the backend
    const uploadImage = async () => {
        if (!imageFile) {
            alert('Please upload your picture');
            return;
        }

        const formData = new FormData();
        formData.append('image', imageFile); // Append the image file to FormData

        console.log('Final Image Data:', imageFile); // Log the image file before sending

        // Make the API call to upload the image
        // Adjust the URL based on your backend setup
        try {
            const response = await axiosApi.patch('/accounts/api/v1/profile-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Assuming the backend returns some success message or data
            console.log('Image uploaded successfully:', response.data);
            toast.success('Image uploaded successfully!');
            // Redirect to the next page after successful upload
            setTimeout(() => navigate('/StartQuizPage'), 1000);
        } catch (error) {
            console.error('Error uploading image:', error);
            if (error.response && error.response.data) {
                alert(`Error: ${error.response.data.message || 'Failed to upload image. Please try again.'}`);
            } else {
                alert('Failed to upload image. Please try again.');
            }
        }
    };

    const handleContinue = () => {
        uploadImage();
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
                <div className="flex sm:flex-row gap-3 justify-center mb-8">
                    <button
                        onClick={() => fileInputRef.current.click()}
                        className="flex items-center cursor-pointer justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition"
                    >
                        <FaCamera /> From my camera
                    </button>
                    <button
                        onClick={handleFromGallery}
                        className="flex items-center z-10 cursor-pointer justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition"
                    >
                        <FaImage /> From my gallery
                    </button>
                </div>

                {/* Continue Button for Desktop */}
                <div className="hidden md:flex z-10 w-full max-w-xs mb-8">
                    <button
                        onClick={handleContinue}
                        className="w-full flex items-center cursor-pointer justify-between px-5 gap-2 bg-[#0c0c36] text-white py-3 rounded-md text-base hover:bg-[#1c1c4f] transition"
                    >
                        Continue <ChevronRight />
                    </button>
                </div>
            </div>

            {/* Sticky Continue Button for Mobile */}
            <div className="cursor-pointer z-10 fixed bottom-0 left-0 right-0 p-4 bg-white shadow-t md:hidden">
                <button
                    onClick={handleContinue}
                    className="w-full cursor-pointer flex items-center justify-between px-5 gap-2 bg-[#0c0c36] text-white py-3 rounded-md text-base hover:bg-[#1c1c4f] transition"
                >
                    Continue
                    <ChevronRight />
                </button>
            </div>
        </div>
    );
};

export default UploadProfilePage;
