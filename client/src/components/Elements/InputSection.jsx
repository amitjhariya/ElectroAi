import React from "react";
import TextInput from "./TextInput";

const InputSection = ({ label, name, handleConfigChange, config }) => (
  <div className="flex flex-col gap-2 p-2">
    <label
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
      htmlFor={name}
    >
      {label}
    </label>
    <TextInput
      value={config?.[name] ||""}
      onChange={handleConfigChange}
      placeholder={`${label.toLowerCase()}...`}
      name={name}
    />
  </div>
);

export default InputSection;
