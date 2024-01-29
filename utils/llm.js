import { LlamaCpp } from "@langchain/community/llms/llama_cpp";
import fs from "node:fs/promises";


export let model

export const loadConfig = async () => {
  const data = await fs.readFile("config.json", "utf8");
  const { model:modelPath, gpuLayers } = JSON.parse(data);
  model = new LlamaCpp({ modelPath: modelPath, gpuLayers });
  return { model:modelPath, gpuLayers };
};
