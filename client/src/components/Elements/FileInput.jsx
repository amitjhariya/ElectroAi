import React, { useRef } from "react";
import { FaUpload } from "react-icons/fa";

const FileInput = ({ onFileChange }) => {
  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    onFileChange(selectedFile);
  };

  return (
    <>
      <label className="block text-gray-400 text-sm font-bold mb-2">
        Choose File:
      </label>
      <div
        className="flex h-8 w-full border-gray-400 border rounded-md justify-center items-center cursor-pointer"
        onClick={handleIconClick}
      >
        <FaUpload size={14} className="bg-slate-300" />
      </div>

      <input
        type="file"
        ref={fileInputRef}
        hidden
        onChange={handleFileChange}
        className="border rounded-md p-2 w-full"
      />
    </>
  );
};

export default FileInput;
