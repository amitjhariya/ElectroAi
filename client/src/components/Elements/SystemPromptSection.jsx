// SystemPromptSection.jsx

import React from "react";
import TextArea from "./TextArea";

const SystemPromptSection = ({ handleConfigChange, config })=>{
  
    return (
      <div className="flex flex-col gap-2 p-2">
        <label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
          htmlFor="volume"
        >
          System prompt
        </label>
        <TextArea
          value={config?.systemPrompt ? config?.systemPrompt : ""}
          onChange={handleConfigChange}
          placeholder="Type a system prompt..."
          name="systemPrompt"
          
        />
      </div>
    );
  }

export default SystemPromptSection;
