// TextArea.jsx

import React from "react";

const TextArea = ({ value, onChange, placeholder, name }) => {

  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      className="flex text-xs h-50 w-full rounded-md border border-gray-600 border-input bg-background px-3 py-2  outline-none bg-gray-950 text-gray-400"
      rows={2}
    />
  );
};

export default TextArea;
