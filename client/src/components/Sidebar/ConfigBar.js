import React, { useState } from "react";
import ModelSection from "../Elements/ModelSelect";
import SystemPromptSection from "../Elements/SystemPromptSection";
import Button from "../Elements/Button";
import Checkbox from "../Elements/CheckBox";
import InputSection from "../Elements/InputSection";
import Plugins from "../Plugins/Internet.jsx";

const ConfigBar = ({
  config,
  model,
  handleConfigChange,
  handleSelectModel,
  handleSaveConfigs,
  handlePlugins,
  plugins,
  context,
}) => {
  const url = new URL("file://" + config?.modelPath);
  const filename = url.pathname.split("/").pop();

  const [isChecked, setChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    const event = {
      target: {
        value: e.target.checked,
        name: e.target.name,
      },
    };
    setChecked(e.target.checked);
    handleConfigChange(event);
  };

  return (
    <div className="flex w-1/6  flex-col border-l border-gray-800 justify-start h-screen">
      <div className="flex items-center justify-between p-4 mb-2 border-b border-slate-700">
        <h2 className="text-lg font-semibold text-gray-600">Settings</h2>
      </div>
      <ModelSection
        filename={filename}
        model={model}
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
        checked={config?.useMlock ? config?.useMlock : isChecked}
        onChange={handleCheckboxChange}
      />

      <div className="w-full text-center p-4 ">
        <Button onClick={handleSaveConfigs}>Load Configurations</Button>
      </div>
      <div className="border-t w-full border-gray-700  text-center mt-auto mb-2">
        <p className="text-xs text-gray-500 p-2"> For RAG Upload Documents </p>
        <Plugins handlePlugins={handlePlugins} plugins={plugins} />

        <div className="text-left mb-4 text-gray-600  font-semibold p-2 rounded-lg">
          Context :<span className="text-gray-300">{context}</span>
        </div>
      </div>
    </div>
  );
};

export default ConfigBar;
