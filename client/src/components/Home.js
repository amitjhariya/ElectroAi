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
import { v4 as uuidv4 } from "uuid";
import { FiSettings } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

import { MdDocumentScanner } from "react-icons/md";


function Chat() {
  const newConversationId = uuidv4();

  const newConversation = {
    id: newConversationId,
    messages: [],
    titile: "",
  };
  const [conversations, setConversations] = useState([newConversation]);
  const [isShowSettings, setIsShowSettings] = useState(true);
  const [currentConversationId, setCurrentConversationId] =
    useState(newConversationId);
  const [model, setModel] = useState(false);
  const [isStreamimg, setIsStreaming] = useState(false);
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
  const { chat, loadChat } = useChatService();
  const { setConfig } = useAiService();

  const handleMessage = (e) => {
    const { value } = e.target;
    setMessage(value);
  };

  const handleConfigChange = (e) => {
    let { name, value } = e.target;

    if (!["systemPrompt", "modelPath", "useMlock"].includes(name)) {
      value = Number(value);
    }

    setConfigData({ ...config, [name]: value });
  };

  const currentConversationIndex = conversations.findIndex(
    (conv) => conv.id === currentConversationId
  );

  const sendMessage = async (e, isEdit = false) => {
    e?.preventDefault();
    if (!message && !isEdit) return;
    if (!model) {
      toast("model not loaded");
      return;
    }
    if (!isEdit) {
    }
    const currentMessages = conversations[currentConversationIndex].messages;
    let newMessages;
    if (!isEdit) {
      newMessages = [...currentMessages, { role: "user", content: message }];

      setConversations((prevConversations) => {
        const updatedConversations = [...prevConversations];
        updatedConversations[currentConversationIndex].messages = newMessages;
        return updatedConversations;
      });

      setMessage("");
    }

    try {
      const response = await chat({
        messages: isEdit ? currentMessages : newMessages,
        folder: context,
        plugins,
      });
      if (!response.ok) {
        toast("something went wrong");
        console.log("something went wrong");
        return;
      }

      setConversations((prevConversations) => {
        const updatedConversations = [...prevConversations];
        updatedConversations[currentConversationIndex].messages = [
          ...updatedConversations[currentConversationIndex].messages,
          { role: "system", content: "" },
        ];
        return updatedConversations;
      });

      const stream = response.body;
      const reader = stream.getReader();
      const textDecoder = new TextDecoder();
      setIsStreaming(true);
      const processChunk = async ({ done, value }) => {
        if (done) {
          console.log("Stream ended");
          return;
        } else {
          const text = textDecoder.decode(value);

          setConversations((prevConversations) => {
            const updatedConversations = [...prevConversations];
            const lastMessageIndex =
              updatedConversations[currentConversationIndex].messages.length -
              1;
            updatedConversations[currentConversationIndex].messages[
              lastMessageIndex
            ].content += text;
            return updatedConversations;
          });

          await reader.read().then(processChunk);
        }
      };

      await reader.read().then(processChunk);
      setIsStreaming(false);
    } catch (error) {
      setIsStreaming(false);
      toast("something went wrong");
    }
  };

  const handleSelectModel = async () => {
    const data = await selectModel();
    setConfigData(data);
    await loadModel();
    toast.success("Model Loaded");
    setModel(true);
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
        await loadModel();
        await loadChat({
          messages: conversations[currentConversationIndex].messages,
          systemPrompt: config.systemPrompt,
        });
        setModel(true);
      }
    } catch (error) {
      toast("something went wrong");
    } finally {
      toast("Model Loaded");
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

  useEffect(() => {
    loadData();
    if (!model) {
      loadModel();
      setModel(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlugins = (data) => {
    setPlugins(data);
  };

  return (
    <div className="flex h-screen bg-black bg-gradient-to-br from-gray-900 to-gray-950">
      <History
        setConversations={setConversations}
        conversations={conversations}
        currentConversationId={currentConversationId}
        setCurrentConversationId={setCurrentConversationId}
        systemPrompt={config.systemPrompt}
      />
      
      <div className={` ${isShowSettings ? "w-2/3" : "w-5/6"} flex flex-col`}>        
        <div className="flex items-center justify-end p-4 relative">
        {!uploadVisible && <MdDocumentScanner className="absolute  top-5 z-0 left-4  text-gray-600 cursor-pointer" size={32} onClick={toggleUpload}/>} 
          <div
            className={`w-full h-screen relative ${
              uploadVisible ? "slide-in " : "hidden"
            }`}
          ><IoMdClose className="absolute z-0  left-0 text-gray-600 cursor-pointer" size={32} onClick={toggleUpload}/>
            <Upload refetch={refetch} />
            <DocsLoader
              documents={documents}
              refetch={refetch}
              handleContext={handleContext}
              context={context}
            />
          </div>
        </div>
        <Messages
          setMessage={setMessage}
          sendMessage={sendMessage}
          conversations={conversations}
          currentConversationIndex={currentConversationIndex}
          setConversations={setConversations}
        />
        <ChatInput
          message={message}
          handleOnChange={handleMessage}
          sendMessage={sendMessage}
          isStreamimg={isStreamimg}
          setIsStreaming={setIsStreaming}
        />
      </div>
      {isShowSettings && (
        <ConfigBar
          config={config}
          model={model}
          handleSelectModel={handleSelectModel}
          handleConfigChange={handleConfigChange}
          handleSaveConfigs={handleSaveConfigs}
          context={context}
          handlePlugins={handlePlugins}
          plugins={plugins}
        />
      )}
      <FiSettings
        size={20}
        className="right-5 top-5 absolute text-gray-500 cursor-pointer"
        onClick={() => setIsShowSettings(!isShowSettings)}
      />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default Chat;
