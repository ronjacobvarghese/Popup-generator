import React from "react";

type InputGenericTypes = string | number | readonly string[] | undefined;

type Props<T> = {
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  length?: number;
  isNotCenter?: boolean;
};
export default function Input<T>({
  value,
  setValue,
  length,
  isNotCenter,
}: Props<T>) {
  return (
    <input
      value={value as InputGenericTypes}
      onChange={(e) => setValue(e.target.value as T)}
      className={`py-1 bg-gray-600/50 rounded-sm px-2 w-${
        length ? length : 20
      } ${isNotCenter ? "" : "text-center"}`}
    />
  );
}
