"use client";

import { CircleUserRoundIcon, XIcon } from "lucide-react";
import { useFileUpload } from "../hooks/useFileUpload"; // Custom hook
import img from '../assets/annaImg.png';

export default function ProfileImageUploader() {
  // Use the custom hook for file upload functionality
  const [{ files }, { removeFile, openFileDialog }] = useFileUpload({
    accept: "image/*",  // Accept image files only
  });

  // Get the preview URL and the file name
  const previewUrl = files[0]?.preview || img;
  const fileName = files[0]?.file.name || null;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative inline-flex">
        {/* Custom Tailwind button */}
        <button
          className="relative  rounded-full overflow-hidden shadow-md"
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
          onChange={(e) => openFileDialog(e.target.files)}
        />
      </div>
      {fileName && <p className="text-muted-foreground text-xs">{fileName}</p>}
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
