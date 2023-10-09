import { useEffect, useState } from "react";
import FlowStep from "./FlowStep";
import { FlowData, PopupTypes } from "../types";
import Select from "./ui/Select";
import { MenuItem } from "@mui/material";
import { usePopupDataContext } from "../context/PopupDataContextProvider";

export default function FlowChart() {
  const {
    flowData,
    setFlowData,
    popupType: type,
    setPopupType,
  } = usePopupDataContext();
  const [errorMsg, setErrorMsg] = useState("");
  const [initFlowStep, setInitFlowStep] = useState(true);
  const [data, setData] = useState(flowData);

  useEffect(() => {
    // when you change the popup type the flow data resets hence inorder to add data again.
    if (flowData.length === 0) {
      setInitFlowStep(true);
    }
    setData(flowData);
  }, [flowData]);

  const onSubmitStep = (flowDataItem: FlowData) => {
    if (data.find((item) => item.id === flowDataItem.id)) {
      setErrorMsg("Id of flow step must be unique");
      return;
    }
    setFlowData([...data, flowDataItem]);
    setInitFlowStep(false);
  };

  const onAddStep = (flowDataItem: FlowData) => {
    // if you click the generate button once you don't need to add it again.
    if (!data.find((item) => item.id === flowDataItem.id)) {
      setData((state) => [...state, flowDataItem]);
    }
    setInitFlowStep(true);
    return;
  };

  const deleteFlowStep = (step: number) => {
    // here three scenarios can happen
    // you delete the only step you have;
    // you delete the step in between steps;
    // you delete the final step;
    setFlowData((state) => state.filter((_item, index) => index !== step - 1));
    if (step !== 1 && step === data.length + 1) {
      setInitFlowStep(false);
    } else {
      setInitFlowStep(true);
    }
  };

  return (
    <section className="!m-0 text-white/70 p-5 w-full flex-1 max-h-full flex flex-col rounded-lg  border border-white/40 bg-gray-600/20 relative min-w-max my-5">
      <h3 className="text-xl p-2 pb-6 font-semibold border-b border-gray-600/30 mb-6">
        Flow Steps:
      </h3>
      <div className="absolute top-6 left-40 flex gap-2 items-center ">
        <label>Popup type:</label>
        <Select<PopupTypes | ""> value={type} setChange={setPopupType}>
          <MenuItem value="Warning"> Warning</MenuItem>
          <MenuItem value="Error"> Error</MenuItem>
          <MenuItem value="Survey"> Survey</MenuItem>
        </Select>
        {errorMsg && <p className="text-xl text-red-600 pl-10">{errorMsg}</p>}
      </div>
      <ul className="overflow-auto  max-h-[90%]">
        {data.map((item, index) => (
          <FlowStep
            key={item.id}
            step={index + 1}
            popupType={type}
            flowData={item}
            onSubmit={onSubmitStep}
            onAdd={onAddStep}
            onDelete={deleteFlowStep}
            setError={setErrorMsg}
            generate={!initFlowStep && flowData.length - 1 === index}
            disable
          />
        ))}
        {initFlowStep && (
          <FlowStep
            key={Math.random()}
            step={data.length + 1}
            onSubmit={onSubmitStep}
            onAdd={onAddStep}
            popupType={type}
            setError={setErrorMsg}
            onDelete={deleteFlowStep}
            generate
          />
        )}
      </ul>
    </section>
  );
}
