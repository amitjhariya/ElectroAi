import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { MdDelete } from "react-icons/md";
import { BsPencil } from "react-icons/bs";
import useChatService from "../../services/useChatService.js";

const History = ({
  setConversations,
  conversations,
  currentConversationId,
  setCurrentConversationId,
  systemPrompt,
}) => {
  const { loadChat } = useChatService();
  const [editedTitle, setEditedTitle] = useState("New Chat");
  const [isEditing, setIsEditing] = useState(false);
  const handleAddConversation = () => {
    const newConversationId = uuidv4();

    const newConversation = {
      id: newConversationId,
      messages: [],
      title: "",
    };
    setConversations([newConversation, ...conversations]);
    setCurrentConversationId(newConversationId);
  };

  const handleClearConversations = () => {
    const newConversationId = uuidv4();

    const newConversation = {
      id: newConversationId,
      messages: [],
      titile: "",
    };
    setConversations([newConversation]);
    setCurrentConversationId(newConversationId);
  };

  const handleDeleteConversation = (id) => {
    const updatedConversations = conversations.filter(
      (conversation) => conversation.id !== id
    );
    setConversations(updatedConversations);
    if (currentConversationId === id) {
      if (updatedConversations.length > 0) {
        setCurrentConversationId(updatedConversations[0].id);
      } else {
        handleClearConversations();
      }
    }
  };

  const selectConversation = async (id) => {
    if (id === currentConversationId) {
      return;
    }
    const selectedConversation = conversations.find(
      (conversation) => conversation.id === id
    );
    if (selectedConversation) {
      setCurrentConversationId(id);
    }
    await loadChat({
      messages: selectedConversation.messages || [],
      systemPrompt: systemPrompt,
    });
  };

  const handleRenameConversation = (id) => {
    const conversationToUpdate = conversations.find(
      (conversation) => conversation.id === id
    );

    if (conversationToUpdate) {
      conversationToUpdate.title = editedTitle || "New Chat";
      setConversations(conversations.map(conversation =>
        conversation.id === id ? conversationToUpdate : conversation
      ));
    }
    setIsEditing(null);
  };

  return (
    <div className="flex w-1/6 flex-col border-gray-800 border-r shadow-sm backdrop-blur-lg">
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <h2 className="text-lg font-semibold text-gray-200">Chats</h2>
        <button
          onClick={handleAddConversation}
          className=" ml-auto mr-2 text-gray-400 text-sm font-bold py-2 px-4 mt-2 rounded-md hover:from-gray-800 hover:from-to-950 bg-gradient-to-br from-gray-800 to-gray-900 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          <span>Create New chat</span>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="grid gap-2 p-2" />
        {conversations?.map((item) => (
          <div
            key={item.id}
            className={`flex justify-between items-center p-2  text-gray-400 m-1 rounded-md text-sm hover:bg-gray-800 ${
              currentConversationId === item.id ? "bg-gray-800" : "bg-gray-900 "
            }`}
          >
            {isEditing === item.id ? (
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleRenameConversation(item.id);
                  }
                }}
                onBlur={() => handleRenameConversation(item.id)}
                autoFocus
              />
            ) : (
              <span
                onClick={() => selectConversation(item.id)}
                className="w-full cursor-pointer"
              >
                {item.title || "New Chat"}
              </span>
            )}
            <button
              onClick={() => {
                setIsEditing(item.id);
                setEditedTitle(item.title);
              }}
              className="ml-2 w-max  text-gray-400 text-sm font-bold p-2 hover:text-white cursor-pointer "
            >
              <BsPencil size={14} />
              <span className="sr-only">Clear Chat</span>
            </button>
            <button className=" text-gray-400 text-sm font-bold p-1  rounded-full hover:from-gray-800 hover:from-to-950 bg-gradient-to-br from-gray-800 to-gray-900 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-600">
              <MdDelete
                size={16}
                onClick={() => {
                  handleDeleteConversation(item.id);
                }}
                className="hover:text-red-500 "
              />
            </button>
          </div>
        ))}
      </div>
      <div className="flex items-center  border-t border-gray-700 p-2">
        <button
          onClick={handleClearConversations}
          className="ml-2 w-max  text-gray-400 text-sm font-bold p-2 mt-2 rounded-full hover:from-gray-800 hover:from-to-950 bg-gradient-to-br from-gray-800 to-gray-900 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          <MdDelete size={16} />
          <span className="sr-only">Clear Chat</span>
        </button>
        <p className="text-gray-500 text-sm mx-2 mt-2">Clear All Chats</p>
      </div>
    </div>
  );
};

export default History;
