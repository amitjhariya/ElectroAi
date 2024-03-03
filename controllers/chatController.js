import { createContext } from "../utils/vectors.js";
import {
  loadSession,
  model,
  context,
  DB_GRAMMER,
} from "../utils/llm.js";

import searchEngine from "../utils/search.js";
import User, { userSchemaJson } from "./../models/Users.js";
import { AbortController } from "abort-controller";

let controller = new AbortController();




export const chat = async (req, res) => {
  const { signal } = controller;
  try {
    if (!model) return res.status(400).json({ error: "Model not loaded" });
    const { messages, folder, plugins } = req.body;

    let searchResult, localData;

    let query = messages[messages.length - 1].content;

    if (plugins.internet) {
      searchResult = await searchEngine(query);
      console.log({ searchResult });
      query = query + `\n\n Internet Search Results : ${searchResult}`;
    }
    let DB_results;

    if (plugins.db) {
      const prompt = ` ${JSON.stringify(
        userSchemaJson
      )}  \n use this json Schema of a Model to Create a JSON  to  query for  \n ${query}`;
      console.log({ prompt });
      const dbQuery = await model.prompt(prompt, { grammer: DB_GRAMMER });
      console.log({ dbQuery });
      try {
        DB_results = await User.find({});
      } catch (error) {
        console.error("Error:", error);
      }
    }

    if (folder) {
      localData = await createContext(query, folder, 1);
      query = query + `\n\n Context : ${localData}`;
    }

    res.setHeader("Content-Type", "application/octet-stream");
    await model.prompt(query, {
      onToken(chunk) {
        res.write(context.decode(chunk));
      },
      signal: signal,
    });

    if (DB_results) {
      res.write(JSON.stringify({ results: DB_results }));
    }
  } catch (error) {
    if (error.message.match(/AbortError/)) {
      console.log("Fetch operation aborted:", error.message);
    } else {
      res.status(500).json({ error: error.message });
    } 
  }
};

export const loadChat = async (req, res) => {
  const { messages, systemPrompt } = req.body;
  try {
    const coversationHistory = [];
    let currentPrompt = "";
    messages.forEach((entry) => {
      if (entry.role === "user") {
        currentPrompt = entry.content;
      } else if (entry.role === "system") {
        coversationHistory.push({
          prompt: currentPrompt,
          response: entry.content,
        });
      }
    });
    await loadSession(coversationHistory, systemPrompt);
    return res.status(200).json({ message: "chat loaded" });
  } catch (error) {
    console.log({ error });
  }
};


export const abortChat = async (req, res) => {
  controller.abort()
  controller = new AbortController();
  res.send({ message: "Abort requested" });
};