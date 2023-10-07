import { FormControl, Select } from "@mui/material";

type Props<T> = {
  value: T;
  setChange: React.Dispatch<React.SetStateAction<T>>;
  children: JSX.Element | JSX.Element[];
  disable?: boolean;
};

export default function CustomSelect<T>({
  value,
  setChange,
  children,
  disable,
}: Props<T>) {
  return (
    <FormControl disabled={disable}>
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
    </FormControl>
  );
}
