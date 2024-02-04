import React, { useState, useEffect } from "react";
import { MODEL_URL } from "./../../constants/routes.js";

function Chat() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        path: "https://huggingface.co/TheBloke/openchat-3.5-0106-GGUF/resolve/main/openchat-3.5-0106.Q4_K_M.gguf?download=true",
      };
      try {
        const response = await fetch(MODEL_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const totalBytes = parseInt(response.headers.get("content-length"), 10);

        const reader = response.body.getReader();
        let receivedBytes = 0;

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          receivedBytes += value.length;
          const currentProgress = (receivedBytes / totalBytes) * 100;
          setProgress(currentProgress);
        }

        console.log("Data successfully fetched");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dark flex h-screen bg-gradient-to-r from-purple-100 via-pink-100 to-red-100 dark:from-purple-100 dark:via-pink-100 dark:to-red-100">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
    </div>
  );
}

export default Chat;
