// ModelSection.jsx

import React from "react";
import Button from "./Button";

const ModelSection = ({ model, filename, handleSelectModel, config }) => (
  <div className="flex flex-col gap-2 p-2">
    <label
      className="text-sm font-medium w-auto whitespace-pre-wrap leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-600"
      htmlFor="volume"
    >
      Model
    </label>
    <div className="border bg-black text-gray-300 text-xs p-2 rounded border-gray-800">
      {model && config?.modelPath && filename ? (
        <span>{config.modelPath}</span>
      ) : (
        <span>No Model Selected</span>
      )}
    </div>
    <Button onClick={handleSelectModel}>Change</Button>
  </div>
);

export default ModelSection;
