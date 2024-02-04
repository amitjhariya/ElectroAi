import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadFiles = () => {
  return (req, res, next) => {
    console.log("uploadFunction");
    const uploadFunction = upload.array("files");
    const folder = req.params.folder || 'default';

    uploadFunction(req, res, async (err) => {
      if (err) {
        console.error("File upload error:", err);
        return res.status(400).json({ success: false, message: "File upload error", error: err });
      }

      const files = req.files;
      if (!files || files.length === 0) {
        console.log("No files uploaded");
        next();
        return;
      }

      try {
        await Promise.all(
          files.map(async (file) => {
            const filename = file.originalname;
            console.log({ filename });
            const localFilePath = path.join("uploads", folder, filename);
            console.log({ localFilePath });

            // Ensure the directory structure exists
            const directoryPath = path.dirname(localFilePath);
            fs.mkdirSync(directoryPath, { recursive: true });

            // Use the file buffer to write the file using fs.writeFileSync
            fs.writeFileSync(localFilePath, file.buffer);
          })
        );
        console.log("Files uploaded successfully");
        next();
      } catch (error) {
        console.error("Error during file upload:", error);
      }
    });
  };
};

export default uploadFiles;
