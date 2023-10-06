import { useEffect, useRef } from "react";
import PopupContent from "./popup/PopupContent";
import { usePopupDataContext } from "../context/PopupDataContextProvider";
import { PopupStyles } from "./popup/PopupStyles";
import { PopupScripts } from "./popup/Popup";

export default function LiveWindow() {
  const { configData, flowData, popupType } = usePopupDataContext();
  const liveWindowRef = useRef<HTMLElement>(null);
  const styles = PopupStyles;
  const content = PopupContent({ flowData, popupType });
  const scripts = PopupScripts(content);

  const nextClassName = "popup-actions-component-next";
  const ratingClassName = "popup-content-rating-button";

  liveWindowRef.current?.addEventListener("click", function (event) {
    if ((event.target as HTMLElement).classList.contains(nextClassName)) {
      const mainSection = (event.target as HTMLElement).parentElement
        ?.parentElement as HTMLElement;

      if (mainSection.previousElementSibling) {
        const previousItem = mainSection.previousElementSibling;
        liveWindowRef.current?.insertBefore(mainSection, previousItem);
      }
    }
    if ((event.target as HTMLElement).classList.contains(ratingClassName)) {
      console.log((event.target as HTMLButtonElement).value);
    }
  });

  useEffect(() => {
    if (liveWindowRef.current) {
      if (flowData.length !== 0) {
        const head = liveWindowRef.current
          .parentElement as NonNullable<HTMLHeadElement>;

        const script = document.createElement("script");
        script.innerHTML = scripts;
        head.appendChild(script);
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
