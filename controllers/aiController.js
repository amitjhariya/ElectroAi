import {loadConfig,model} from './../utils/llm.js' 

export const createAi = async (req, res) => {
  try {
    const { message } = req.body;
    // const response = await model.invoke(message);
    const stream = await model.stream(message);
    res.setHeader("Content-Type", "application/octet-stream");
    const reader = stream.getReader();

    const pump = async () => {
      try {
        const { done, value } = await reader.read();

        if (done) {
          res.end();
        } else {
          console.log({value})
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

export const loadModel = async (req, res) => {
  try {    
    const config =await loadConfig()
    res.send(config)
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: error.message });
  }
};
