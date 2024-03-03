import React from "react";
import CheckBox from "../Elements/CheckBox";

const Internet = ({handlePlugins, plugins}) => {

  const handleCheckboxChange = (e) => {
    const value = e.target.checked;
    handlePlugins({ ...plugins, [e.target.name]: value });
  };

  return (
    <>
    <CheckBox
          label="Use Internet"
          name={"internet"}
          onChange={handleCheckboxChange}
      />
      <CheckBox
          label="Use Db"
          name={"db"}
          onChange={handleCheckboxChange}
        />
    </>
    
  );
};

export default Internet;
