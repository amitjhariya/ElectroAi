import React, { useRef } from "react";
import { BsUpload } from "react-icons/bs";

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
        className="flex h-20 w-96 border-gray-700 border border-dashed rounded-md justify-center items-center cursor-pointer"
        onClick={handleIconClick}
      >
        <BsUpload size={36}  className="text-gray-600" />
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
