import React, { useState } from "react";
const Initialdata = [
  {
    role: "system",
    content: "Hello, how can I assist you today?",
  },
  {
    role: "user",
    content: "I need help with my account",
  },
];

const Home = () => {
  const [message, setMessage] = useState("");
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
            ...prev.slice(0, prev.length-1),
            {
              ...prev[prev.length -1],
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
  const [file, setFile] = useState(null);

  const handleButtonClick = async () => {
    fetch('http://localhost:5000/model');
  };
  const loadConfigs= async () => {
    fetch('http://localhost:5000/configs');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) =>
          message.role === "system" ? (
            <div className="flex items-end space-x-2" key={index}>
              <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                  U
                </span>
              </span>
              <div className="flex flex-col space-y-1 text-sm">
                <div className="px-4 py-2 rounded-tl-lg rounded-tr-lg rounded-br-lg bg-gray-200 dark:bg-gray-800">
                  {message.content}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  10:15 AM
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-end justify-end space-x-2" key={index}>
              <div className="flex flex-col space-y-1 text-sm">
                <div className="px-4 py-2 rounded-tl-lg rounded-tr-lg rounded-bl-lg bg-blue-500 text-white">
                  {message.content}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
                  10:16 AM
                </div>
              </div>
              <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                  AI
                </span>
              </span>
            </div>
          )
        )}
      </div>
      <div className="border-t p-4">
        <div className="flex space-x-2">
          <textarea
            className="flex min-h-[80px] w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1 rounded-md"
            placeholder="Type your message here..."
            value={message}
            onChange={onChangeHandler}
          />
          <button
            onClick={handleMessageToAi}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Send
          </button>
        </div>
      </div>
      <div>
      <button onClick={handleButtonClick} ></button>
      {file && <p>Selected File: {file.name}</p>}
    </div>
    </div>
  );
};

export default Home;
