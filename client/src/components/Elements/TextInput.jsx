import React from "react";

const TextInput = ({ value, onChange, placeholder, name }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    name={name}
    className="flex text-xs w-full rounded-md border border-input border-gray-700 bg-background px-3 py-2  bg-gray-950 text-gray-300 outline-none"
  />
);

export default TextInput;
