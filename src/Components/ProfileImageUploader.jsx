"use client";

import { useState } from "react";
import { CircleUserRoundIcon, XIcon } from "lucide-react";
import { useFileUpload } from "../hooks/useFileUpload"; // Custom hook
import axios from "axios"; // Axios for making HTTP requests
import img from '../assets/annaImg.png'; // Default image if not uploaded

export default function ProfileImageUploader() {
    // Use the custom hook for file upload functionality
    const [{ files }, { removeFile, openFileDialog }] = useFileUpload({
        accept: "image/*",  // Accept image files only
    });

    const previewUrl = files[0]?.preview || img; // Default image if no preview URL
    const fileName = files[0]?.file.name || null;

    // Function to handle image upload to the backend
    const handleUpload = async (file) => {
        if (!file) return; // If no file is selected

        const formData = new FormData();
        formData.append("file", file); // Attach the file to the FormData object

        console.log('Uploading image:', file); // Log the original image before upload

        try {
            const response = await axios.post("/upload-endpoint", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Image uploaded successfully:", response.data);
            // You can handle the response data, such as saving the image URL in your state or DB
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    // Trigger upload as soon as a file is selected
    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Get the first file selected
        openFileDialog(e.target.files);  // Open file dialog
        if (file) {
            handleUpload(file);  // Automatically upload the selected file
        }
    };

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="relative inline-flex">
                {/* Custom Tailwind button */}
                <button
                    className="relative rounded-full overflow-hidden shadow-md"
                    onClick={openFileDialog}
                    aria-label={previewUrl ? "Change image" : "Upload image"}
                >
                    {previewUrl ? (
                        <img
                            className="w-18 h-18 object-cover rounded-full"
                            src={previewUrl}
                            alt="Preview of uploaded image"
                        />
                    ) : (
                        <CircleUserRoundIcon className="w-8 h-8 opacity-60" />
                    )}
                </button>
                {previewUrl && (
                    <button
                        onClick={() => removeFile(files[0]?.id)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        aria-label="Remove image"
                    >
                        <XIcon className="w-4 h-4" />
                    </button>
                )}
                <input
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleFileChange}  // Trigger file change and upload
                />
            </div>

            {/* {fileName && <p className="text-muted-foreground text-xs">{fileName}</p>} */}
            <p
                aria-live="polite"
                role="region"
                className="text-muted-foreground mt-2 text-xs"
            >
                Avatar upload button
            </p>
        </div>
    );
}
