import { useEffect, useRef } from "react";
import PopupContent from "./popup/PopupContent";
import { usePopupDataContext } from "../context/PopupDataContextProvider";
import { PopupStyles } from "./popup/PopupStyles";

export default function LiveWindow() {
  const { configData, flowData, popupType } = usePopupDataContext();
  const liveWindowRef = useRef<HTMLElement>(null);
  const styles = PopupStyles;

  const content = PopupContent({ flowData, popupType });

  useEffect(() => {
    if (liveWindowRef.current) {
      if (flowData.length !== 0) {
        const head = liveWindowRef.current
          .parentElement as NonNullable<HTMLHeadElement>;

        const style = document.createElement("style");
        style.innerHTML = styles;
        head.appendChild(style);
        liveWindowRef.current.innerHTML = content;
        liveWindowRef.current.className =
          "w-full pr-10 pl-5 py-10 flex items-center justify-center";
      } else {
        liveWindowRef.current.innerHTML = `<h1>
        Please Add Flow Step To Show Popup
      </h1>`;
        liveWindowRef.current.className =
          " text-xl font-semibold text-gray-400/60 w-full pr-10 pl-5 py-10 flex items-center justify-center";
      }
    }
  }, [flowData, content]);

  return <section ref={liveWindowRef}></section>;
}
