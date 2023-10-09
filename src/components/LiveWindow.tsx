import { useEffect, useRef, useState } from "react";
import PopupContent from "./popup/PopupContent";
import { usePopupDataContext } from "../context/PopupDataContextProvider";
import { PopupStyles } from "./popup/PopupStyles";
import { Tab, Tabs } from "@mui/material";
import Codepen from "./ui/Codepen";

export default function LiveWindow() {
  const { configData, flowData, popupType } = usePopupDataContext();
  const [tabs, setTabs] = useState(0);
  const liveWindowRef = useRef<HTMLElement>(null);
  const styles = PopupStyles;
  const [visibleIndex, setVisibleIndex] = useState(0);
  const { length: flowDataLength } = flowData;

  const nextClassName = "popup-actions-component-next";
  const backClassName = "popup-actions-component-back";

  useEffect(() => {
    if (flowData) {
      setVisibleIndex((state) => (state >= flowData.length ? 0 : state));
    }
  }, [flowData]);

  useEffect(() => {
    if (liveWindowRef.current) {
      if (tabs === 1) {
        liveWindowRef.current.innerHTML = "";
      } else {
        if (flowData.length !== 0 && configData) {
          const head = liveWindowRef.current
            .parentElement as NonNullable<HTMLHeadElement>;
          const style = document.createElement("style");
          style.innerHTML = styles;
          head.appendChild(style);
          liveWindowRef.current.innerHTML = PopupContent({
            flowData,
            popupType,
            visibleIndex,
          });

          const handleClick = (event: MouseEvent) => {
            if (
              (event.target as HTMLElement).classList.contains(nextClassName)
            ) {
              setVisibleIndex((state) => state + 1);
            }
            if (
              (event.target as HTMLElement).classList.contains(backClassName)
            ) {
              setVisibleIndex((state) => state - 1);
            }
            event.stopPropagation();
          };

          liveWindowRef.current?.addEventListener("click", handleClick, false);

          liveWindowRef.current.className =
            "w-full h-full pr-10 pl-5 flex items-center justify-center";
          return () => {
            liveWindowRef.current?.removeEventListener(
              "click",
              handleClick,
              false
            );
          };
        }

        if (!configData) {
          liveWindowRef.current.innerHTML = `<h1>
            Please Setup Configuration Data To Show Popup
          </h1>`;
        } else {
          liveWindowRef.current.innerHTML = `<h1>
            Please Add Flow Steps To Show Popup
          </h1>`;
        }
        liveWindowRef.current.className =
          " text-xl font-semibold text-gray-400/60 !w-full h-full pr-10 pl-5 flex items-center justify-center";
      }
    }
  }, [flowData, configData, popupType, visibleIndex, tabs, flowDataLength]);

  return (
    <div className="w-full h-full">
      <Tabs
        sx={{ zIndex: "10", position: "absolute", top: "1rem", right: "0" }}
        value={tabs}
        onChange={(_e, newValue) => setTabs(newValue)}
      >
        <Tab sx={{ color: "rgb(156 163 175)" }} label="Overview" />
        <Tab sx={{ color: "rgb(156 163 175)" }} label="Code" />
      </Tabs>
      <div className="h-full w-full relative">
        <section hidden={tabs !== 0} ref={liveWindowRef}></section>
        <Codepen hidden={tabs !== 1} />
      </div>
    </div>
  );
}
