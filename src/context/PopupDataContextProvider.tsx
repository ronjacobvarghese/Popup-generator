import React, { useState, useEffect, useContext } from "react";
import { ConfigData, FlowData } from "../types";

type Props = {
  children: React.ReactNode;
};

type PopupDataContextType = {
  configData: ConfigData | null;
  setConfigData: React.Dispatch<React.SetStateAction<ConfigData | null>>;
  flowData: FlowData[];
  setFlowData: React.Dispatch<React.SetStateAction<FlowData[]>>;
};

const PopupDataContext = React.createContext<PopupDataContextType | null>(null);

export default function PopupDataContextProvider({ children }: Props) {
  const [configData, setConfigData] = useState<ConfigData | null>(null);
  const [flowData, setFlowData] = useState<FlowData[]>([]);

  return (
    <PopupDataContext.Provider
      value={{
        configData,
        setConfigData,
        flowData,
        setFlowData,
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
