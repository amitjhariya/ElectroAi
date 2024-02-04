import React, { useState } from "react";
import CheckBox from "../Elements/CheckBox";

const Internet = ({handlePlugins, plugins}) => {
  const [isChecked, setChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    const value = e.target.checked;
    setChecked(value);
    handlePlugins({ ...plugins, internet: value });
  };

  return (
    <CheckBox
          label="Use Internet"
          name={"internet"}
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
  );
};

export default Internet;
