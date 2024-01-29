import express from "express";
import AiRouter from "./AiRoutes.js";

const router = express.Router();

router.get("/healthcheck", (req, res) => {
  res.send({
    message: "success",
  });
});

router.use("/ai", AiRouter);

export default router;
