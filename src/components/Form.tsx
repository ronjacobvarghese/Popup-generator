import { MenuItem } from "@mui/material";
import Select from "./ui/Select";
import NumberSlider from "./ui/NumberSlider";
import { useState } from "react";
import { usePopupDataContext } from "../context/PopupDataContextProvider";

type TimeFormat = "seconds" | "minutes" | "hours";

export default function Form() {
  const { setConfigData } = usePopupDataContext();
  const [timeFormat, setTimeFormat] = useState<TimeFormat>("seconds");
  const [frequency, setFrequency] = useState(1);

  const customizePopup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    let time = parseInt(formData.get("time") as string);
    let displayLimit = parseInt(formData.get("limit") as string);

    setConfigData({
      time,
      timeFormat,
      displayLimit,
      frequency,
    });
  };

  return (
    <section className="pl-10 pr-5 py-6 w-full">
      <form
        onSubmit={(e) => customizePopup(e)}
        className="text-white/70 bg-gray-600/20 border relative border-white/40 rounded-lg  p-4 form-details"
      >
        <h1 className="text-lg px-2 py-4 font-semibold border-b border-gray-600/30 mb-6">
          Customize Your Popup:
        </h1>
        <div>
          <p>Time to wait before showing the survey:</p>
          <div>
            <NumberSlider name="time" />
            <Select<TimeFormat> value={timeFormat} setChange={setTimeFormat}>
              <MenuItem value={"seconds"}>seconds</MenuItem>
              <MenuItem value={"minutes"}>minutes</MenuItem>
              <MenuItem value={"hours"}>hours</MenuItem>
            </Select>
          </div>
        </div>
        <div>
          <p> No of time the popup should be displayed:</p>
          <div>
            <NumberSlider name="limit" />
            <label className="text-lg">times</label>
          </div>
        </div>{" "}
        <div>
          <p> Display Frequency:</p>
          <div className="relative">
            <label>Every</label>
            <Select<typeof frequency>
              value={frequency}
              setChange={setFrequency}
            >
              <MenuItem value={1}>1 min</MenuItem>
              <MenuItem value={5}>5 min</MenuItem>
              <MenuItem value={30}>30 mins</MenuItem>
            </Select>
          </div>
        </div>
        <button className="bg-gray-400/40 px-4 py-2 rounded-md text-white absolute top-6 right-6">
          Submit
        </button>
      </form>
    </section>
  );
}
