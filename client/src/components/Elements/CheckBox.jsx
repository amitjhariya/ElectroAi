import React from "react";

const Checkbox = ({ label, checked,name, onChange }) => {
  return (
    <div className="flex items-center p-2 ">
      <input
        id={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mr-2 cursor-pointer"
        name={name}     />
      <label htmlFor={name} className="text-gray-600 text-sm font-bold hover:text-gray-400 cursor-pointer">{label}</label>
    </div>
  );
};

export default Checkbox;
