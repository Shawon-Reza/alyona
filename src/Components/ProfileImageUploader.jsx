"use client";

import { useRef, useState } from "react";
import { CircleUserRoundIcon, XIcon } from "lucide-react";
import axiosApi from "@/api/axiosApi"; // Assuming axiosApi is configured for your API
import { toast } from 'react-toastify';
import { data, useNavigate } from "react-router-dom";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function ProfileImageUploader() {
    const [imagePreview, setImagePreview] = useState(null); // Preview image before upload
    const [imageFile, setImageFile] = useState(null); // Store the image file
    const [isUploading, setIsUploading] = useState(false); // Track uploading state
    const [error, setError] = useState(null); // Track error messages
    const { user, loading } = useCurrentUser();
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    console.log(user)
    if (loading) {
        return <div>Loading...</div>; // Show loading state while fetching user data
    }
    // Handle the image file change (when a file is selected from file input)
    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0]; // Get the selected file
        if (selectedFile) {
            // Basic validation for file type and size
            if (!selectedFile.type.startsWith('image/')) {
                alert('Please upload a valid image.');
                return;
            }
            if (selectedFile.size > 15 * 1024 * 1024) { // 15MB limit
                alert('File size should not exceed 15MB.');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(selectedFile);
            setImageFile(selectedFile); // Store the file in the state

            // Automatically call the upload function
            uploadImage(selectedFile); // Trigger the upload immediately after the file is selected
        }
    };

    // Function to send the image to the backend
    const uploadImage = async (file) => {
        if (!file) {
            alert('Please upload your picture');
            return;
        }

        const formData = new FormData();
        formData.append('image', file); // Append the image file to FormData

        console.log('Final Image Data:', file); // Log the image file before sending

        setIsUploading(true); // Start uploading

        try {
            const response = await axiosApi.patch('/accounts/api/v1/profile-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Image uploaded successfully:', response.data);
            toast.success('Image uploaded successfully!');

        } catch (error) {
            console.error('Error uploading image:', error);
            if (error.response && error.response.data) {
                toast.error(`Error: ${error.response.data.message || 'Failed to upload image. Please try again.'}`);
            } else {
                toast.error('Failed to upload image. Please try again.');
            }
        } finally {
            setIsUploading(false); // Stop uploading once done
        }
    };

    // Trigger file input when image icon is clicked
    const handleIconClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Opens the file dialog
        }
    };


    return (
        <div className="flex flex-col items-center gap-2">
            <div className="relative inline-flex">
                {/* Custom Tailwind button */}
                <button
                    className="relative rounded-full overflow-hidden shadow-md"
                    onClick={handleIconClick} // Trigger file input dialog when the image icon is clicked
                    aria-label={imageFile ? "Change image" : "Upload image"}
                >
                    {imageFile ? (
                        <img
                            className="w-18 h-18 object-cover rounded-full cursor-pointer"
                            src={imagePreview}
                            alt="Preview of uploaded image"
                        />
                    ) : (
                        <img
                            className="w-18 h-18 object-cover rounded-full"
                            src={`http://10.10.13.59:8005${user?.image}`}

                            alt="Preview of uploaded image"
                        />
                    )}
                </button>
              
                {/* Hidden File Input */}
                <input
                    type="file"
                    accept="image/*"
                    capture="camera"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleImageChange} // Trigger file change and upload
                />
            </div>

            {isUploading && <div className="text-xs text-blue-500">Uploading...</div>} {/* Uploading feedback */}
            {error && <div className="text-xs text-red-500">{error}</div>} {/* Error message */}

            
        </div>
    );
}
