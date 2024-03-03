import express from "express";

import configRouter from "./configRoutes.js";
import ChatRouter from "./chatRoutes.js";
import DocumentRounter from './documentRoutes.js'
import TestRounter from './testRoutes.js'

const router = express.Router();

router.get("/healthcheck", (req, res) => {
  res.send({
    message: "success",
  });
});

router.use("/config", configRouter);
router.use("/chat", ChatRouter);
router.use("/docs", DocumentRounter);
router.use("/test", TestRounter);

export default router;
