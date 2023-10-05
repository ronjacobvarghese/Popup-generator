import { MenuItem } from "@mui/material";
import Select from "./ui/Select";
import NumberSlider from "./ui/NumberSlider";
import { useState } from "react";

type TimeFormat = "seconds" | "minutes" | "hours";
export default function Form() {
  const [timeFormat, setTimeFormat] = useState<TimeFormat>("seconds");
  const [frequency, setFrequency] = useState(1);

  return (
    <section className="px-10 py-6 w-full">
      <form className="text-white/70 bg-gray-600/20 border border-white/40 rounded-lg  p-4 form-details">
        <h1 className="text-lg p-2 font-semibold border-b border-gray-600/30 mb-6">
          Customize Your Popup:
        </h1>
        <div>
          <p>Time to wait before showing the survey:</p>
          <div>
            <NumberSlider />
            <Select<TimeFormat> value={timeFormat} setChange={setTimeFormat}>
              <MenuItem value={"seconds"}>seconds</MenuItem>
              <MenuItem value={"minutes"}>minutes</MenuItem>
              <MenuItem value={"hours"}>hours</MenuItem>
            </Select>
          </div>
        </div>
        <div>
          <p> Time to wait before showing the survey:</p>
          <div>
            <NumberSlider />
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
      </form>
    </section>
  );
}
