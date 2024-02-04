import express from "express";
import cors from "cors";
import { PORT } from "./configs/index.js";
import { Options } from "./constants/index.js";
import Router from "./routes/index.js";
import cookieParser from "cookie-parser";
import path from "path";
import { app as electronApp, BrowserWindow, dialog, Menu,screen  } from "electron";
import fs from "node:fs/promises";

const app = express();
let mainWindow;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(path.resolve(), "client/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(path.resolve(), "client/build", "index.html"));
});

app.use("/api/v1", Router);

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
});
const expressServer = app.listen(PORT, () => {
  console.log(`Server is Up and Running at Port: ${PORT}  `);
});

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    width,
    height,
    webPreferences: {
      nodeIntegration: false,
    },
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#2f3241",
      symbolColor: "#74b1be",
    },
  });

  mainWindow.loadURL("http://localhost:8989");

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}
Menu.setApplicationMenu(new Menu());


app.post("/api/v1/config/change_model", async (req, res) => {
  let SelectedFile = await dialog.showOpenDialog(mainWindow, Options);
  const data = await fs.readFile("config.json", "utf8");

  const config = JSON.parse(data);
  config.modelPath = SelectedFile.filePaths[0];

  const jsonString = JSON.stringify(config, null, 2);
  await fs.writeFile("config.json", jsonString, "utf8");
  res.send(config);
});

electronApp.on("ready", () => {
  
  createWindow()
} );

electronApp.on("window-all-closed", () => {
  electronApp.quit();
});

electronApp.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

electronApp.on("before-quit", () => {
  expressServer.close();
});
