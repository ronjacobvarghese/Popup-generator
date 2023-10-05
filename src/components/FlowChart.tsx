import { useState } from "react";
import FlowStep from "./FlowStep";
import { FlowData, PopupTypes } from "../types";
import Select from "./ui/Select";
import { MenuItem } from "@mui/material";
import { usePopupDataContext } from "../context/PopupDataContextProvider";

export default function FlowChart() {
  const { flowData, setFlowData } = usePopupDataContext();
  const [type, setType] = useState<PopupTypes | "">("");
  const [errorMsg, setErrorMsg] = useState("");

  const onAddStep = (flowDataItem: Partial<FlowData>) => {
    console.log(type);
    if (!flowDataItem.id || !flowDataItem.id.trim()) {
      setErrorMsg("Please enter a valid Id");
      return;
    }

    if (flowData.find((item) => item.id === flowDataItem.id)) {
      setErrorMsg("The Id of each step must be unique!!");
      return;
    }

    if (!flowDataItem.loadType || !flowDataItem.loadType.trim()) {
      setErrorMsg("Please enter a valid load type");
      return;
    }

    if (
      type === "Survey" &&
      (!flowDataItem.contentType || !flowDataItem.contentType.trim())
    ) {
      setErrorMsg("Please enter a valid content type");
      return;
    }

    if (!flowDataItem.question || !flowDataItem.question.trim()) {
      setErrorMsg("Please enter a valid message");
      return;
    }

    if (
      flowDataItem.contentType &&
      (flowDataItem.contentType === "Options" ||
        flowDataItem.contentType === "CheckList") &&
      !flowDataItem.options
    ) {
      setErrorMsg("Please enter valid options");
    }

    setFlowData((state) => [...state, flowDataItem as FlowData]);
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
        {flowData.map((item, index) => (
          <FlowStep
            key={item.id}
            step={index + 1}
            popupType={type}
            flowData={item}
            onAdd={onAddStep}
          />
        ))}
        <FlowStep
          key={Math.random()}
          step={flowData.length + 1}
          onAdd={onAddStep}
          popupType={type}
        />
      </ul>
    </section>
  );
}
