import express from "express";

import configRouter from "./configRoutes.js";
import ChatRouter from "./chatRoutes.js";
import DocumentRounter from './documentRoutes.js'

const router = express.Router();

router.get("/healthcheck", (req, res) => {
  res.send({
    message: "success",
  });
});

router.use("/config", configRouter);
router.use("/chat", ChatRouter);
router.use("/docs", DocumentRounter);

export default router;
