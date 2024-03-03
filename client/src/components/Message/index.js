import React, { useState } from "react";
import ReactMarkdown from "../Markdown/Markdown.js";
import { MdCopyAll, MdDelete, MdModeEdit } from "react-icons/md";
import { PiCaretUpThin } from "react-icons/pi";

const Messages = ({
  conversations,
  currentConversationIndex,
  setConversations,
  sendMessage,
  setMessage,
}) => {
  const messages = conversations[currentConversationIndex].messages;
  const [editableMessageIndex, setEditableMessageIndex] = useState(null);
  const [editedMessage, setEditedMessage] = useState("");

  const handleEdit = (index, content) => {
    setEditableMessageIndex(index);
    setEditedMessage(content);
  };

  const handleSaveEdit = async (event) => {
    event.stopPropagation();
    const currentMessages = conversations[
      currentConversationIndex
    ].messages.slice(0, editableMessageIndex);

    const newMessages = [
      ...currentMessages,
      { role: "user", content: editedMessage },
    ];

    setConversations((prevConversations) => {
      const updatedConversations = [...prevConversations];
      updatedConversations[currentConversationIndex].messages = newMessages;
      return updatedConversations;
    });

    setEditedMessage("");
    setEditableMessageIndex(null);
    sendMessage(null, true);
  };
  const handleCancelEdit = async () => {
    setEditedMessage("");
    setEditableMessageIndex(null);
  };
  const handleSave = async () => {
    const updatedConversations = [...conversations];
    updatedConversations[currentConversationIndex].messages[
      editableMessageIndex
    ].content = editedMessage;
    setConversations(updatedConversations);
    setEditableMessageIndex(null);
    setEditedMessage("");
  };

  const handleDeleteMessage = async (index) => {
    const updatedConversations = [...conversations];
    const messages = updatedConversations[currentConversationIndex].messages;
    messages.splice(index, 1);
    updatedConversations[currentConversationIndex].messages = messages;
    setConversations(updatedConversations);
  };

  const handleCopy = async (content) => {
    try {
      await navigator.clipboard.writeText(content);
      console.log("success");
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const prompt = [
    "Create a content calendar for a TikTok account on reviewing real estate listings.",
    "Certainly! Here are some mocktail name suggestions featuring Coke and pomegranate syrup:",
    "Write a short email to my professor requesting a deadline extension for my project. I don't really have a good excuse, and I'm fine owning up to that – so please keep it real!",
    `Come up with 5 sophisticated names for my coffee shop that becomes a bar at night – like "The Page Turner". Include a short sentence explaining what it means!`,
  ];

  return (
    <>
      <div className="w-full flex-1  overflow-y-auto p-6 space-y-4">
        {messages.map((message, index) => (
          <div className="flex flex-col justify-start w-full">
            <div
              key={index}
              className={`p-4  w-full ${
                message.role === "user" ? "bg-slate-950 " : "bg-gray-950"
              }`}
            >
              {editableMessageIndex === index ? (
                <textarea
                  className="text-gray-300 w-full rounded-md border border-gray-800 bg-background p-5 text-sm bg-gray-950 min-h-min max-h-[50vh] outline-none"
                  value={editedMessage}
                  onChange={(e) => setEditedMessage(e.target.value)}
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = `${Math.min(
                      e.target.scrollHeight,
                      200
                    )}px`;
                  }}
                  style={{ resize: "none" }}
                  onKeyDown={(e) => {
                    if (e.shiftKey && e.key === "Enter") {
                      e.preventDefault();
                      const start = e.target.selectionStart;
                      const end = e.target.selectionEnd;
                      e.target.value =
                        e.target.value.substring(0, start) +
                        "\n" +
                        e.target.value.substring(end);
                      e.target.selectionStart = e.target.selectionEnd =
                        start + 1;
                    }
                  }}
                />
              ) : (
                <div className="text-sm text-gray-200">
                  {message.role === "user" ? (
                    <>
                      {message.content.split("\n").map((line, lineIndex) => (
                        <React.Fragment key={lineIndex}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </>
                  ) : (
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  )}
                </div>
              )}
              {editableMessageIndex === index && (
                <div className="flex mt-2 justify-end">
                  <button
                    className="mx-2 text-gray-400 text-xs font-bold py-1 px-2 mt-2 rounded-md hover:from-gray-800 hover:from-to-950 bg-gradient-to-br from-gray-800 to-gray-900 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                    onClick={
                      message.role === "user" ? handleSaveEdit : handleSave
                    }
                  >
                    {message.role === "user" ? "Submit" : "Save"}
                  </button>
                  <button
                    className="mx-2 text-gray-400 text-xs font-bold py-1 px-2 mt-2 rounded-md hover:from-gray-800 hover:from-to-950 bg-gradient-to-br from-gray-800 to-gray-900 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
            <div
              className={`p-4  flex justify-end gap-2 `}
            >
              <div className="flex flex-row gap-2 justify-center items-center ">
                <MdModeEdit
                  size={18}
                  className="text-gray-500  hover:text-black h-6 w-6 rounded-full p-1 bg-gradient-to-br from-gray-800 to-gray-900  hover:bg-white cursor-pointer"
                  onClick={() => handleEdit(index, message.content)}
                />

                <MdCopyAll
                  size={18}
                  className="text-gray-500 hover:text-black h-6 w-6 rounded-full p-1 bg-gradient-to-br from-gray-800 to-gray-900  hover:bg-white cursor-pointer"
                  onClick={() => handleCopy(message.content)}
                />
                <MdDelete
                  className="text-gray-500 hover:text-black h-6 w-6 rounded-full p-1 bg-gradient-to-br from-gray-800 to-gray-900  hover:bg-white cursor-pointer"
                  onClick={() => handleDeleteMessage(index)}
                />
              </div>
            </div>
          </div>
        ))}
        {!messages.length && (
          <div className="w-full h-full flex flex-col justify-end items-center">
            <img
              src="favicon.png"
              alt="Electro-ai"
              className="filter grayscale ml-5 mb-10 opacity-50 w-32 "
            ></img>
            <div className="h-1/3">
              <h2 className=" text-white ">How can I help you today?</h2>
            </div>
            <div className="w-2/3  grid gap-6 grid-cols-2 ">
              {prompt.map((prompt, index) => (
                <div
                  key={index}
                  className=" cursor-pointer rounded-lg border border-dashed border-gray-700 bg-gray-900 text-gray-400 text-card-foreground shadow-sm"
                  data-v0-t="card"
                  onClick={() => {
                    setMessage((prev) => {
                      sendMessage();
                      return prompt;
                    });
                  }}
                >
                  <div className="p-4 text-xs flex  justify-around items-center">
                    {prompt.slice(0, 80)}{" "}
                    <PiCaretUpThin size={22} className="rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Messages;
