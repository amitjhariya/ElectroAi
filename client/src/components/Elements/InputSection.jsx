import React from "react";
import TextInput from "./TextInput";

const GenericInputSection = ({ label, name, handleConfigChange, config }) => (
  <div className="flex flex-col gap-2 p-2">
    <label
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-red-200"
      htmlFor={name}
    >
      {label}
    </label>
    <TextInput
      value={config?.[name]}
      onChange={handleConfigChange}
      placeholder={`${label.toLowerCase()}...`}
      name={name}
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm bg-slate-800 text-gray-300"
    />
  </div>
);

export default GenericInputSection;
