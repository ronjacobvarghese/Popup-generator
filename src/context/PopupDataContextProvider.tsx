import React, { useState, useContext, useEffect } from "react";
import { ConfigData, FlowData, PopupTypes } from "../types";

type Props = {
  children: React.ReactNode;
};

type PopupDataContextType = {
  configData: ConfigData | null;
  setConfigData: React.Dispatch<React.SetStateAction<ConfigData | null>>;
  flowData: FlowData[];
  setFlowData: React.Dispatch<React.SetStateAction<FlowData[]>>;
  popupType: PopupTypes | "";
  setPopupType: React.Dispatch<React.SetStateAction<PopupTypes | "">>;
};

const PopupDataContext = React.createContext<PopupDataContextType | null>(null);

export default function PopupDataContextProvider({ children }: Props) {
  const [popupType, setPopupType] = useState<PopupTypes | "">("");
  const [configData, setConfigData] = useState<ConfigData | null>(null);
  const [flowData, setFlowData] = useState<FlowData[]>([]);

  useEffect(() => {
    if (popupType) {
      setFlowData([]);
    }
  }, [popupType]);

  return (
    <PopupDataContext.Provider
      value={{
        configData,
        setConfigData,
        flowData,
        setFlowData,
        popupType,
        setPopupType,
      }}
    >
      {children}
    </PopupDataContext.Provider>
  );
}

export function usePopupDataContext() {
  const context = useContext(PopupDataContext);

  if (context === null) {
    throw new Error(
      " usePopupDataContext must be used within an PopupContextDataProvider"
    );
  }

  return context;
}
