import { useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa6";
import { usePopupDataContext } from "../../context/PopupDataContextProvider";
import { PopupScripts } from "../popup/Popup";
import PopupContent from "../popup/PopupContent";

type Props = {
  hidden: boolean;
};
function Codepen({ hidden }: Props) {
  const { flowData, configData, popupType } = usePopupDataContext();
  const [code, setCode] = useState<string>("");

  useEffect(() => {
    if (flowData.length !== 0 && configData) {
      setCode(PopupScripts(configData, PopupContent({ flowData, popupType })));
    }
  }, [flowData, configData, popupType]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).catch((err) => {
      console.error("Unable to copy to clipboard: ", err);
    });
  };

  return (
    <section hidden={hidden} className="absolute top-0 p-6 w-full h-full">
      <div className="w-full h-full">
        <textarea
          disabled
          className="w-full h-full max-h-full overflow-auto bg-gray-950/60 border-2 p-2 rounded-lg text-gray-500 border-gray-950"
          rows={10}
          value={code}
          onChange={(event) => setCode(event.target.value)}
        ></textarea>
        <button
          className="absolute top-10 right-10 text-gray-200 p-2 text-xl rounded-md bg-gray-400/20"
          onClick={handleCopy}
        >
          <FaRegCopy />
        </button>
      </div>
    </section>
  );
}

export default Codepen;
