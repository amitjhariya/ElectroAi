// ModelSection.jsx

import React from "react";
import Button from "./Button";

const ModelSection = ({ filename, handleSelectModel, config }) => (
  <div className="flex flex-col gap-2 p-2">
    <label
      className="text-sm font-medium w-auto whitespace-pre-wrap leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-red-200"
      htmlFor="volume"
    >
      Model
    </label>
    <div className="border bg-blue-900 text-teal-50 text-xs p-2 rounded">
    {config?.modelPath ? filename : "No Model Selected"}
    </div>
    <Button
      onClick={handleSelectModel}      
    >
      Change
    </Button>
  </div>
);

export default ModelSection;
