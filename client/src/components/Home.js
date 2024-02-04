import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "react-query";

import useDocsService from "../services/useDocsService.js";
import useAiService from "../services/useAiService.js";
import useChatService from "../services/useChatService.js";


import Messages from "./Message";
import ConfigBar from "./Sidebar/ConfigBar.js";
import History from "./Sidebar/History.js";
import ChatInput from "./Chat/ChatInput.js";
import Upload from "./Documents/Upload.js";
import DocsLoader from "./Documents/DocsLoader.js";
import Plugins from "./Plugins/Internet.jsx";



function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [config, setConfigData] = useState({
    systemPrompt: "",
    modelPath: "",
  });

  const [plugins, setPlugins] = useState({
    internet: false,
  });



  const [context, setContext] = useState("");
  const [uploadVisible, setUploadVisible] = useState(false);

  const { selectModel, loadModel, loadConfigs } = useAiService();
  const { getDocuments } = useDocsService();
  const { chat } = useChatService();
  const { setConfig } = useAiService();

  const handleMessage = (e) => {
    const { value } = e.target;
    setMessage(value);
  };

  const handleConfigChange = (e) => {
    let { name, value } = e.target;
    console.log({ name, value });

    if (!["systemPrompt", "modelPath", "useMlock"].includes(name)) {
      value = Number(value);
    }

    setConfigData({ ...config, [name]: value });
  };

  const sendMessage = async () => {
    if (!message) return;
    const newMessages = [...messages, { role: "user", content: message }];
    setMessages(newMessages);
    setMessage("");
    let receivedText = "";
    try {
      const response = await chat({
        messages: newMessages,
        systemPrompt: config.systemPrompt,
        folder: context,
        plugins,
      });
      if (!response.ok) {
        console.log("something went wrong");
        return;
      }
      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content: receivedText,
        },
      ]);

      const stream = response.body;
      const reader = stream.getReader();
      const textDecoder = new TextDecoder();
      const processChunk = async ({ done, value }) => {
        if (done) {
          console.log("Stream ended");
          return;
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
    } catch (error) {}
  };

  const handleSelectModel = async () => {
    const data = await selectModel();
    setConfigData(data);
    await loadModel();
  };
  const toggleUpload = () => {
    setUploadVisible(!uploadVisible);
  };
  const { data: documents, refetch } = useQuery("documents", getDocuments);

  const handleContext = (value) => {
    if (value === context) {
      setContext("");
    } else {
      setContext(value);
    }
  };
  const handleSaveConfigs = async () => {
    try {
      const res = await setConfig(config);
      if (res.status === 200) {
        toast(res.message);
        await loadModel();
      }
    } catch (error) {
      toast("something went wrong");
    }
  };

  const loadData = async () => {
    try {
      const res = await loadConfigs();
      if (res.status === 200) {
        const data = await res.json();
        setConfigData(data);
      }
    } catch (error) {}
  };
  console.log(config);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlugins = (data) => {
    setPlugins(data);
  };

  return (
    <div className="dark flex h-screen  bg-gradient-to-r from-purple-100 via-pink-100 to-red-100 dark:from-purple-100 dark:via-pink-100 dark:to-red-100">
      <History />
      <div className="w-2/3 flex flex-col bg-gray-900">
        <div className="flex items-center justify-end p-4 ">
          <div
            className={`w-full h-screen ${
              uploadVisible ? "slide-in " : "hidden"
            }`}
          >
            <Upload refetch={refetch} />
            <DocsLoader
              documents={documents}
              refetch={refetch}
              handleContext={handleContext}
              context={context}
            />
          </div>
          <button
            onClick={toggleUpload}
            className="inline-flex absolute top-5 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 text-gray-200"
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
              <circle cx={12} cy={12} r={1} />
              <circle cx={19} cy={12} r={1} />
              <circle cx={5} cy={12} r={1} />
            </svg>
            <span className="sr-only">Documents</span>
          </button>
        </div>
        <Messages messages={messages} />
        <ChatInput
          message={message}
          handleOnChange={handleMessage}
          sendMessage={sendMessage}
        />
      </div>
      <ConfigBar
        config={config}
        handleSelectModel={handleSelectModel}
        handleConfigChange={handleConfigChange}
        handleSaveConfigs={handleSaveConfigs}
      >
        <Plugins handlePlugins={handlePlugins} plugins={plugins} />

        <div className="mr-auto mb-4 text-gray-300  font-semibold p-2 rounded-lg">
          Context :<span className="text-gray-300">{context}</span>
        </div>
      </ConfigBar>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default Chat;
