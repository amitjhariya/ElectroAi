import React from "react";

const Button = ({ onClick, children }) => (
  <button 
    onClick={onClick} 
    className="mx-auto w-max text-gray-400 text-sm font-bold py-2 px-4 mt-2 rounded-md hover:from-gray-800 hover:from-to-900 bg-gradient-to-br from-gray-900 to-gray-950 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-600"
  >
    {children}
  </button>
);

export default Button;
