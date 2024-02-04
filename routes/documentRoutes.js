import express from "express";
import { loadDocuments, uploadDocuments,listDocuments,deleteDocuments } from "../controllers/vectorController.js";
import uploadFiles from "../middlewares/upload.js";


const router = express.Router();

router.post("/:folder",uploadFiles(), uploadDocuments);
router.post("/", loadDocuments);
router.get("/", listDocuments);
router.delete("/:folder", deleteDocuments);

export default router;
