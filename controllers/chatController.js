import { createContext } from "../utils/vectors.js";
import { loadConfig, model } from "../utils/llm.js";
import searchEngine from "../utils/search.js";

export const chat = async (req, res) => {
  try {
    const { messages, folder, systemPrompt = "", plugins } = req.body; 

    const query =messages[messages.length-1].content
    let searchResult
    if (plugins.internet) {
      searchResult = await searchEngine(query)
    }
    
    let prompt = ''
    const topK = 2;
    for (let i = 0; i < messages.length; i++) {
      if (i > topK * 2) break;

      if (messages[i]["role"] === "user") {
        prompt += `Question: ${messages[i].content} \\n`;
      } else {
        prompt += `Answer: ${messages[i].content} \\n`;
      }
    }
    
    if (folder) {
      const context = await createContext(query, folder, 1);
      prompt = `${systemPrompt}\n Answer the last question using the provided context ${searchResult ? 'and search results from internet':''}. Your answer should be in your own words and be no longer than 50 words
      Context: ${context} \n\n
      ${searchResult ? 'Search Results : ' + JSON.stringify(searchResult) +'\n\n': ''}
       ${prompt} \n\n Answer:n`; 
    } else {
      prompt = `Answer the last question  ${searchResult ? 'using the provided  search results from internet':''}. Your answer should be in your own words and be no longer than 50 words
      ${searchResult ? 'Search Results : ' + JSON.stringify(searchResult) +'\n\n': ''} 
      ${prompt} \n\n Answer:`; 
    }
    
    
    const stream = await model.stream(prompt);
    res.setHeader("Content-Type", "application/octet-stream");
    const reader = stream.getReader();

    const pump = async () => {
      try {
        const { done, value } = await reader.read();

        if (done) {
          res.end();
        } else {
          console.log({ value });
          res.write(value);
          await pump();
        }
      } catch (error) {
        console.log({ error });
        res.status(500).json({ error: error.message });
      }
    };

    await pump();
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: error.message });
  }
};
