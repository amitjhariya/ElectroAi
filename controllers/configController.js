import { loadConfig, model } from "../utils/llm.js";
import fs from "node:fs/promises";

export const loadModel = async (req, res) => {
  try {
    const config = await loadConfig();
    res.send(config);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: error.message });
  }
};

export const loadConfigs = async (req, res) => {
  try {
    const config = await fs.readFile("config.json", "utf8");
    res.send(config);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: error.message });
  }
};

export const setConfig = async (req, res) => {
  try {
    const data = req.body;
    const config = await fs.readFile("config.json", "utf8");

    const newConfig = { ...JSON.parse(config), ...data };

    const jsonString = JSON.stringify(newConfig, null, 2);
    await fs.writeFile("config.json", jsonString, "utf8");
    await loadConfig();
    res.send({ message: "success", config: newConfig });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: error.message });
  }
};
