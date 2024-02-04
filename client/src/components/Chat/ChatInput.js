import React from 'react'

function ChatBox({handleOnChange,sendMessage,message}) {
  return (
    <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-2">
            <textarea
              className="flex text-white w-full rounded-md border border-gray-500 bg-background px-3 py-2 text-sm bg-slate-900 overflow-hidden"
              placeholder="Type a message..."
              value={message}
              name="message"
              onChange={handleOnChange}
            />
            <button
              type="button"
              onClick={sendMessage}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium  border hover:bg-slate-800 h-10 w-10 text-gray-200"
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
                className="h-4 w-4 hover:scale-125"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
              <span className="sr-only">Send message</span>
            </button>
          </div>
        </div>
  )
}

export default ChatBox