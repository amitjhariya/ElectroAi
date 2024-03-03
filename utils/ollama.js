import { Ollama } from "@langchain/community/llms/ollama";

console.log("Ollama Started")
export const ollama = new Ollama({
  baseUrl: "http://localhost:11434",
  model: "qwen:7b",
});
