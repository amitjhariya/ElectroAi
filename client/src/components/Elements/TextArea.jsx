// TextArea.jsx

import React from "react";

const TextArea = ({ value, onChange, placeholder, name }) => {

  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      className="flex text-xs h-50 w-full rounded-md border border-input bg-background px-3 py-2  bg-slate-800 text-gray-300"
      rows={6}
    />
  );
};

export default TextArea;
