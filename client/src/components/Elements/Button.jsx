import React from "react";

const Button = ({ onClick,  children }) => (
  <button onClick={onClick} className="mx-auto w-max bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-4 mt-2 rounded">
    {children}
  </button>
);

export default Button;
