import express from "express";
import cors from "cors";
import { PORT } from "./configs/index.js";
import Router from "./routes/index.js";
import cookieParser from "cookie-parser";
import path from "path";
import fs from "node:fs/promises";
import { connectToDb } from "./utils/db.js";

// Create an Express app
const app = express();

connectToDb();
// Use middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the router
app.use(express.static(path.join(path.resolve(), "client/build")));

app.use("/api/v1", Router);
app.post("/api/v1/config/change_model", async (req, res) => {
  const data = await fs.readFile("config.json", "utf8");

  const config = JSON.parse(data);
  res.send(config);
});



app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is Up and Running at Port: ${PORT}`);
});
