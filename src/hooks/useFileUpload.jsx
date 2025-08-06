// src/hooks/useFileUpload.js
import { useState } from "react";

export function useFileUpload({ accept }) {
  const [files, setFiles] = useState([]);

  // Open the file input dialog and select a file
  const openFileDialog = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;
    input.onchange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        setFiles([{ file: selectedFile, preview: URL.createObjectURL(selectedFile) }]);
      }
    };
    input.click();
  };

  // Remove the selected file
  const removeFile = (fileId) => {
    setFiles(files.filter((file) => file.id !== fileId));
  };

  // Return file information and utility methods
  return [{ files }, { removeFile, openFileDialog }];
}
