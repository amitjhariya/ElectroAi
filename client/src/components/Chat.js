import React, { useEffect, useState } from "react";
const Initialdata = [];

function Chat() {
  const [message, setMessage] = useState("");
  const [config, setConfig] = useState({});
  const [messages, setMessages] = useState(Initialdata);

  const onChangeHandler = (e) => {
    const { value } = e.target;
    setMessage(value);
  };

  const handleMessageToAi = async () => {
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: message,
      },
    ]);

    try {
      let receivedText = "";
      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content: receivedText,
        },
      ]);
      const response = await fetch("http://localhost:5000/api/v1/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const stream = response.body;
      const reader = stream.getReader();
      const textDecoder = new TextDecoder();
      // Function to process each chunk of data
      const processChunk = async ({ done, value }) => {
        if (done) {
          console.log("Stream ended");
        } else {
          const text = textDecoder.decode(value);
          receivedText += text;

          setMessages((prev) => [
            ...prev.slice(0, prev.length - 1),
            {
              ...prev[prev.length - 1],
              content: receivedText,
            },
          ]);

          await reader.read().then(processChunk);
        }
      };

      await reader.read().then(processChunk);

      const responseData = await response.json();
      console.log("Response from API:", responseData);

      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content: responseData.message,
        },
      ]);
    } catch (error) {
      console.error("Error sending message:", error.message);
    }

    setMessage("");
  };

  const loadModel= async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/ai/loadmodel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ model: "" }),
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }
    } catch (error) {
      
    }
  };

  const handleButtonClick = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/selectmodel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ model: "" }),
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }
    const responseData = await response.json();

    setConfig(responseData);
    } catch (error) {
      
    }
    loadModel()
  };



  return (
    <div className="dark grid h-screen grid-cols-[240px_1fr_240px]  bg-gradient-to-r from-purple-100 via-pink-100 to-red-100 dark:from-purple-100 dark:via-pink-100 dark:to-red-100">
      <div className="flex flex-col bg-slate-800">
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-purple-200">Chats</h2>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 text-purple-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            <span className="sr-only">Add new chat</span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="grid gap-2 p-2" />
        </div>
      </div>
      <div className="flex flex-col bg-gray-900">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-gray-200">John Doe</h2>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 text-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <circle cx={12} cy={12} r={1} />
              <circle cx={19} cy={12} r={1} />
              <circle cx={5} cy={12} r={1} />
            </svg>
            <span className="sr-only">Chat options</span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) =>
            message.role === "system" ? (
              <div key={index} className="p-4 rounded-lg bg-gray-600">
                <p className="text-sm text-gray-200">{message.content}</p>
              </div>
            ) : (
              <div key={index} className="p-4 rounded-lg bg-gray-800">
                <p className="text-sm text-gray-200">{message.content}</p>
              </div>
            )
          )}
        </div>
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-2">
            <textarea
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
              placeholder="Type a message..."
              value={message}
              onChange={onChangeHandler}
            />
            <button
              type="button"
              onClick={handleMessageToAi}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 text-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
              <span className="sr-only">Send message</span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-slate-800">
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-red-200">Parameters</h2>
        </div>
        <div className="flex flex-col gap-2 p-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-red-200"
              htmlFor="volume"
            >
              Model : {config?.model ? config.model : "No Model Selected"}
            </label>
          <button
            onClick={handleButtonClick}
            className="bg-zinc-800 p-1.5 px-2 text-xs  text-white"
          >
            Change
          </button>
        </div>
        <div className="flex flex-col gap-2 p-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-red-200"
              htmlFor="volume"
            >
              System prompt
            </label>
            <textarea
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
              placeholder="Type a system prompt..."
              value={config?.systemPrompt ? config.systemPrompt : "You are an AI programming assistant. Follow the user's requirements carefully and to the letter. First, think step-by-step and describe your plan for what to build in pseudocode, written out in great detail. Then, output the code in a single code block. Minimize any other prose."}
              
            />
        </div>
        <div className="flex flex-col gap-2 p-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-red-200"
              htmlFor="volume"
            >
              Temperature
            </label>
            <input
              
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
              placeholder="Type a system prompt..."
              value={config?.temperature ? config.temperature : 7}
              
            />
        </div>
        <div className="flex flex-col gap-2 p-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-red-200"
              htmlFor="volume"
            >
              Context Length
            </label>
            <input
              
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
              placeholder="Type a system prompt..."
              value={config?.contextLenght ? config.contextLenght : 2048}
              
            />
        </div>
      </div>
    </div>
  );
}

export default Chat;
