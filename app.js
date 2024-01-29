import express from "express";
import cors from "cors";
import { PORT, NODE_ENV } from "./configs/index.js";
import Router from "./routes/index.js";
import cookieParser from "cookie-parser";
import path from "path";
import { createProxyMiddleware } from "http-proxy-middleware";
import fs from 'node:fs/promises'

// Create an Express app
const app = express();


// Use middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the router

app.use("/api/v1", Router);


app.use(
  '/',
  createProxyMiddleware({
    target: 'http://localhost:3000',  // Assuming React development server is running on port 3000
    changeOrigin: true,
  })
);




// app.use(express.static(path.join(__dirname, "client/build")));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/build", "index.html"));
// });

// app.get("/visitors", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/build", "index.html"));
// });


// Start the server

app.use((err, req, res, next) => {
  console.error(err.stack);

  // You can customize the error response based on your requirements
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
});
const expressServer = app.listen(PORT, () => {
  console.log(`Server is Up and Running at Port: ${PORT} in ${NODE_ENV} `);
});



