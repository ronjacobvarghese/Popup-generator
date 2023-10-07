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
  const content = PopupContent({ flowData, popupType });

  const nextClassName = "popup-actions-component-next";

  liveWindowRef.current?.addEventListener("click", function (event) {
    if ((event.target as HTMLElement).classList.contains(nextClassName)) {
      const mainSection = (event.target as HTMLElement).parentElement
        ?.parentElement as HTMLElement;

      if (mainSection.previousElementSibling) {
        const previousItem = mainSection.previousElementSibling;
        liveWindowRef.current?.insertBefore(mainSection, previousItem);
      }
    }
  });

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
          liveWindowRef.current.innerHTML = content;
          liveWindowRef.current.className =
            "w-full h-full pr-10 pl-5 flex items-center justify-center";
          return;
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
  }, [flowData, configData, content, tabs]);

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
        <Codepen hidden={tabs !== 1} content={content} />
      </div>
    </div>
  );
}
