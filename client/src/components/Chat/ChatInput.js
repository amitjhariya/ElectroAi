import React from "react";
import useChatService from "../../services/useChatService";

function ChatBox({ handleOnChange, sendMessage, message,isStreamimg ,setIsStreaming}) {
  const { abortChat } = useChatService();
  return (
    <div className="p-4 ">
      <form className="flex flex-col items-center gap-2" onSubmit={sendMessage}>
        <textarea
          className="text-gray-300 w-full rounded-md border border-gray-500 bg-background p-5 text-sm bg-gray-950 min-h-min max-h-[50vh] outline-none"
          placeholder="Type a message..."
          value={message || ""}
          name="message"
          style={{ resize: "none" }}
          onChange={handleOnChange}
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
          }}
          onKeyDown={(e) => {
            if (e.shiftKey && e.key === "Enter") {
              e.preventDefault();
              const start = e.target.selectionStart;
              const end = e.target.selectionEnd;
              e.target.value =
                e.target.value.substring(0, start) +
                "\n" +
                e.target.value.substring(end);
              e.target.selectionStart = e.target.selectionEnd = start + 1;
            }

            if (!e.shiftKey && e.key === "Enter") {
              e.preventDefault();
              sendMessage();
            }
          }}
        ></textarea>
        {isStreamimg ? (
          <button
            type="button"
            onClick={() => { setIsStreaming(false); abortChat() }}
            className="mx-auto w-max text-gray-400 text-sm font-bold py-2 px-4 mt-2 rounded-md hover:from-gray-800 hover:from-to-950 bg-gradient-to-br from-gray-800 to-gray-900 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            Stop
          </button>
        ) : (
          <button
            type="submit"
            className="mx-auto w-max text-gray-400 text-sm font-bold py-2 px-4 mt-2 rounded-md hover:from-gray-800 hover:from-to-950 bg-gradient-to-br from-gray-800 to-gray-900 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
}

export default ChatBox;
