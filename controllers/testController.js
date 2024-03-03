import { ollama } from "../utils/ollama.js";

export const test = async (req, res) => {
  const input ="write an esay on wonder of science"
  const stream = await ollama.stream(input);

  const chunks = [];

    for await (const chunk of stream) {
      console.log(chunk)
    res.write(chunk);
    chunks.push(chunk);
  }

  console.log(chunks.join(""));
  res.end();
};
