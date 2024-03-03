import fs from "node:fs/promises";

import {
  LlamaModel,
  LlamaContext,
  LlamaChatSession,
  LlamaGrammar,
  LlamaJsonSchemaGrammar,
} from "node-llama-cpp";

export const DB_GRAMMER = new LlamaJsonSchemaGrammar({
  type: "object",
  properties: {
    responseMessage: {
      type: "string",
    },
    requestPositivityScoreFromOneToTen: {
      type: "number",
    },
  },
});

export const JSON_GRAMMER = await LlamaGrammar.getFor("json");

export let model;
export let context;
let llm;
export const loadConfig = async () => {
  const data = await fs.readFile("config.json", "utf8");
  const configs = JSON.parse(data);
  const {
    gpuLayers,
    temperature,
    threads,
    useMlock,
    batchSize,
    maxTokens,
    modelPath,
  } = configs;

  llm = new LlamaModel({
    modelPath,
    gpuLayers,
    temperature,
    useMlock,
  });

  context = new LlamaContext({
    model: llm,
    contextSize: maxTokens,
    batchSize,
    threads,
  });

  model = new LlamaChatSession({
    context,
    printLLamaSystemInfo: false,
  });

  return configs;
};

export const loadSession = async (coversationHistory = [], systemPrompt) => {
  const data = await fs.readFile("config.json", "utf8");
  const configs = JSON.parse(data);
  const {
    gpuLayers,
    temperature,
    threads,
    useMlock,
    batchSize,
    maxTokens,
    modelPath,
  } = configs;

  llm = new LlamaModel({
    modelPath,
    gpuLayers,
    temperature,
    useMlock,
  });

  context = new LlamaContext({
    model: llm,
    contextSize: maxTokens,
    batchSize,
    threads,
  });

  model = new LlamaChatSession({
    context,
    printLLamaSystemInfo: false,
    systemPrompt,
    coversationHistory,
  });
};
