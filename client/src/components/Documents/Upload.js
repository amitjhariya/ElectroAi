import React, { useState } from "react";
import useDocsService from "../../services/useDocsService.js";
import toast from 'react-hot-toast';
import Button from "../Elements/Button.jsx";
import TextInput from "../Elements/TextInput.jsx";
import FileInput from "../Elements/FileInput.jsx";
const Upload = ({refetch}) => {
  const [file, setFile] = useState([]);
  const [folderPath, setFolderPath] = useState("");
  const { uploadDocuments } = useDocsService();

  const handleFileChange = (file) => {
    setFile(file);
  };

  const handleFolderPathChange = (e) => {
    const folder= e.target.value.toLowerCase()
    setFolderPath(folder);
  };

  const handleUpload = async () => {
    if (!file) {
      toast("Please choose at least one file to upload.")
      console.error("Please choose at least one file to upload.");
      return;
    }

    if (folderPath.trim() === "") {
      toast("Please enter a folder name.")
      console.error("Please enter a folder name.");
      return;
    }

    const formData = new FormData();

    formData.append("files", file);

    try {
      const data = await uploadDocuments(folderPath,formData);
      console.log({ data });
      if (data.message === "success") {
        toast('Document Uploaded')
        setFile([]);
        setFolderPath("");
        refetch()
      }
    } catch (error) {
      toast('Error uploading documents')
      console.error("Error uploading documents:", error);
    }
  };

 

  return (
    <div className="w-full flex  items-center gap-4 mx-auto mt-10 p-6 ">
      <div className="mb-4">
      <FileInput onFileChange={handleFileChange} />
      </div>

      <div className="mb-4">
        <label className="block text-gray-400 text-sm font-bold mb-2">
          File:{folderPath}/{file.name}
        </label>
        
        <TextInput
          type="text"
          name="folder"
          value={folderPath}
          placeholder="type folder path"
          onChange={handleFolderPathChange}/>
      </div>
      <div className="">
      <Button onClick={handleUpload} >Upload</Button>
      </div>
    </div>
  );
};

export default Upload;
