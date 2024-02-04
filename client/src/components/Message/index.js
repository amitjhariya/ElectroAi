import React from 'react'
import ReactMarkdown from "../Markdown/Markdown.js";
const Messages=({messages}) =>{
  return (
      <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => <div key={index} className={`p-4 rounded-lg ${message.role==='user'?'bg-slate-600':'bg-slate-800'}`}>
                <div className="text-sm text-gray-200">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              </div>
          )}
        </div>
      </>
  )
}

export default Messages