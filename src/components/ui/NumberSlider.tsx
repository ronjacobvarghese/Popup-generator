import { useState } from "react";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";

type Props = {
  name: string;
};
export default function NumberSlider({ name }: Props) {
  const [input, setInput] = useState(0);

  return (
    <div className="relative !w-fit">
      <input
        name={name}
        value={input}
        onChange={(e) => setInput(parseInt(e.target.value))}
        className=" py-1 bg-gray-600 rounded-sm w-20 text-center"
      />
      <button
        type="button"
        onClick={() => setInput((state) => state - 1)}
        className="absolute top-[9px]  left-0"
      >
        <AiOutlineCaretLeft />
      </button>
      <button
        type="button"
        onClick={() => setInput((state) => state + 1)}
        className="absolute top-[9px] right-0"
      >
        <AiOutlineCaretRight />
      </button>
    </div>
  );
}
