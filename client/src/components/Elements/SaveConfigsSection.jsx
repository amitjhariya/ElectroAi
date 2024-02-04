import React from "react";
import SaveButton from "./SaveButton";

const SaveConfigsSection = ({ handleSaveConfigs }) => (
  <div className="flex flex-col gap-2 p-2">
    {/* Additional labels or input fields can be added here */}
    <SaveButton
      onClick={handleSaveConfigs}
      className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-4 mt-2 rounded"
    >
      Save
    </SaveButton>
  </div>
);

export default SaveConfigsSection;
