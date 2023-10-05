import { useState } from "react";
import FlowStep from "./FlowStep";
import { ConfigItem, PopupTypes } from "../types";
import Select from "./ui/Select";
import { MenuItem } from "@mui/material";

export default function FlowChart() {
  const [config, setConfig] = useState<ConfigItem[]>([]);
  const [type, setType] = useState<PopupTypes | "">("");
  const [errorMsg, setErrorMsg] = useState("");

  const onAddStep = (configItem: Partial<ConfigItem>) => {
    console.log(type);
    if (!configItem.id || !configItem.id.trim()) {
      setErrorMsg("Please enter a valid Id");
      return;
    }

    if (config.find((item) => item.id === configItem.id)) {
      setErrorMsg("The Id of each step must be unique!!");
      return;
    }

    if (!configItem.loadType || !configItem.loadType.trim()) {
      setErrorMsg("Please enter a valid load type");
      return;
    }

    if (
      type === "Survey" &&
      (!configItem.contentType || !configItem.contentType.trim())
    ) {
      setErrorMsg("Please enter a valid content type");
      return;
    }

    if (!configItem.question || !configItem.question.trim()) {
      setErrorMsg("Please enter a valid message");
      return;
    }

    if (
      configItem.contentType &&
      (configItem.contentType === "Options" ||
        configItem.contentType === "CheckList") &&
      !configItem.options
    ) {
      setErrorMsg("Please enter valid options");
    }

    setConfig((state) => [...state, configItem as ConfigItem]);
  };

  return (
    <section className="text-white/70 p-5 w-full max-h-[90%] h-[90%] flex flex-col rounded-lg  border border-white/40 bg-gray-600/20 relative min-w-max my-5">
      <h3 className="text-xl p-2 pb-6 font-semibold border-b border-gray-600/30 mb-6">
        Flow Steps:
      </h3>
      <div className="absolute top-6 left-40 flex gap-2 items-center ">
        <label>Popup type:</label>
        <Select<PopupTypes | ""> value={type} setChange={setType}>
          <MenuItem value="Warning"> Warning</MenuItem>
          <MenuItem value="Error"> Error</MenuItem>
          <MenuItem value="Survey"> Survey</MenuItem>
        </Select>
        {errorMsg && <p className="text-xl text-red-600 pl-10">{errorMsg}</p>}
      </div>
      <ul className="overflow-auto flex-1">
        {config.map((item, index) => (
          <FlowStep
            key={item.id}
            step={index + 1}
            popupType={type}
            configItem={item}
            onAdd={onAddStep}
          />
        ))}
        <FlowStep
          key={Math.random()}
          step={config.length + 1}
          onAdd={onAddStep}
          popupType={type}
        />
      </ul>
    </section>
  );
}
