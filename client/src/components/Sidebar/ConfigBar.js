import React, { useState } from "react";
import ModelSection from "../Elements/ModelSelect";
import SystemPromptSection from "../Elements/SystemPromptSection";
import Button from "../Elements/Button";
import Checkbox from "../Elements/CheckBox";
import InputSection from "../Elements/InputSection";

const ConfigBar = ({
  config,
  handleConfigChange,
  handleSelectModel,
  handleSaveConfigs,
  children
}) => {
  const url = new URL("file://" + config?.modelPath);
  const filename = url.pathname.split("/").pop();

  const [isChecked, setChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    const event = {
      target: {
        value: e.target.checked,
        name:e.target.name
    }}
    setChecked(e.target.checked)
    handleConfigChange(event)
  };

  
  return (
    <div className="flex w-1/6  flex-col bg-slate-800">
      <div className="flex items-center justify-between p-4 mb-2 border-b border-slate-700">
        <h2 className="text-lg font-semibold text-red-200">Parameters</h2>
      </div>
      <ModelSection
        filename={filename}
        handleSelectModel={handleSelectModel}
        config={config}
      />
      <SystemPromptSection
        handleConfigChange={handleConfigChange}
        config={config}
      />

      <InputSection
        label="Context Length"
        name="contextSize"
        handleConfigChange={handleConfigChange}
        config={config}
      />

      <InputSection
        label="GPU Acceleration"
        name="gpuLayers"
        handleConfigChange={handleConfigChange}
        config={config}
      />
      <InputSection
        label="Temperature"
        name="temperature"
        handleConfigChange={handleConfigChange}
        config={config}
      />
      <InputSection
        label="CPU threads"
        name="threads"
        handleConfigChange={handleConfigChange}
        config={config}
      />

      <Checkbox
        label="Use Memory Lock"
        name={"useMlock"}
        checked={config?.useMlock?config?.useMlock: isChecked}
        onChange={handleCheckboxChange}
      />
      
      {children}

      <Button onClick={handleSaveConfigs}>Load Configurations</Button>
    </div>
  );
};

export default ConfigBar;
