import React from "react";

const Checkbox = ({ label, checked,name, onChange }) => {
  return (
    <div className="flex items-center p-2 cursor-pointer">
      <input
        id={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mr-2"
        name={name}      />
      <label htmlFor={name} className="text-gray-400 text-sm font-bold">{label}</label>
    </div>
  );
};

export default Checkbox;
