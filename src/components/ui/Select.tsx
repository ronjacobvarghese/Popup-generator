import { Select } from "@mui/material";
import { AiOutlineCaretDown } from "react-icons/ai";

type Props<T> = {
  value: T;
  setChange: React.Dispatch<React.SetStateAction<T>>;
  children: JSX.Element | JSX.Element[];
};

export default function CustomSelect<T>({
  value,
  setChange,
  children,
}: Props<T>) {
  return (
    <Select
      sx={{
        padding: "0",
        height: "2.2rem",
        paddingBottom: "1rem",
        background: "rgb(75 85 99 / 0.5)",
        color: "rgba(255,255,255,0.7)",
        minWidth: "100px",
      }}
      variant="filled"
      size="small"
      value={value}
      onChange={(e) => setChange(e.target.value as T)}
    >
      {children}
    </Select>
  );
}
