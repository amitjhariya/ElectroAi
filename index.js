import express from "express";
import cors from "cors";
import { PORT, NODE_ENV,options } from "./configs/index.js";
import Router from "./routes/index.js";
import cookieParser from "cookie-parser";
import path from "path";
import { createProxyMiddleware } from "http-proxy-middleware";
import { app as electronApp, BrowserWindow ,dialog} from "electron";
import fs from 'node:fs/promises'
// Create an Express app
const app = express();
let mainWindow;



// Use middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the router





// app.use(express.static(path.join(__dirname, "client/build")));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/build", "index.html"));
// });

// app.get("/visitors", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/build", "index.html"));
// });

  // app.use(
  //   '/',
  //   createProxyMiddleware({
  //     target: 'http://localhost:3000',  // Assuming React development server is running on port 3000
  //     changeOrigin: true,
  //   })
  // );

app.use("/api/v1", Router);
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

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1903,
    height: 911,
    webPreferences: {
      nodeIntegration: false,
    }
  });

  mainWindow.loadURL("http://localhost:3000");

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}



 app.post("/api/v1/selectmodel", async (req, res)=>{
  let SelectedFile = await dialog.showOpenDialog(mainWindow, options);
  const data = await fs.readFile('config.json', 'utf8');

  const config=JSON.parse(data)
  config.model= SelectedFile.filePaths[0]

  const jsonString = JSON.stringify(config, null, 2);
  await fs.writeFile('config.json', jsonString, 'utf8');
  res.send(config)  
 });


 
electronApp.on("ready", createWindow);

electronApp.on("window-all-closed", () => {
  electronApp.quit();
});

electronApp.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

electronApp.on('before-quit', () => {
  expressServer.close();
});


