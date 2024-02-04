import express from "express";
import { promises as fsPromises } from "fs";
import path from "path";
import { createEmbeddings } from "../utils/vectors.js";

const router = express.Router();

export const uploadDocuments = async (req, res) => {
  res.send({ message: "success" });
};

export const listDocuments = async (req, res) => {
  try {
    const uploadFolders = await fsPromises.readdir("uploads");
    const embeddingsFolders = await fsPromises.readdir("embeddings");

    const uploads = await Promise.all(
      uploadFolders.map(async (item) => {
        const fullPath = path.join("uploads", item);
        const stat = await fsPromises.stat(fullPath);
        return stat.isDirectory() ? item : null;
      })
    );

    const embeddings = await Promise.all(
      embeddingsFolders.map(async (item) => {
        const fullPath = path.join("embeddings", item);
        const stat = await fsPromises.stat(fullPath);
        return stat.isDirectory() ? item : null;
      })
    );

    res.send({
      folders: uploads.filter(Boolean),
      embeddings: embeddings.filter(Boolean),
    });
  } catch (error) {
    console.error("Error listing folders:", error);
    throw error;
  }
};

export const loadDocuments = async ({ body: { context } }, res) => {
  try {
    const data = await createEmbeddings(context);
    
    if (data) {
      res.send({ message: "success" });
    } else {
      res.status(400).send({ message: "Bad Request" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const deleteDocuments = async (req, res) => {
  try {
    const { folder } = req.params;
    const folderPath = path.join('uploads', folder);
    const embeddingsPath = path.join('embeddings', folder);
    await fsPromises.rmdir(folderPath, { recursive: true });
    try {
      await fsPromises.rmdir(embeddingsPath, { recursive: true });
    } catch (error) {
      
    }

    res.send({ message: "success" });
  } catch (error) {
    console.error("Error deleting subfolder:", error);
    res.status(500).send({ message: "Internal server error." });
  }
};



export default router;
