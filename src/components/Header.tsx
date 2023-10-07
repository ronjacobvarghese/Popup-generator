import { FaRegSave } from "react-icons/fa";
type Props = {
  save: boolean;
  onSave: () => void;
  // onTest: () => void;
};

export default function Header({ save, onSave }: Props) {
  return (
    <header className="bg-gray-950 py-4 px-10 fixed top-0 w-full flex gap-8">
      <h1 className="text-gray-300 text-[1.5rem]">Popup Generator</h1>
      {save && (
        <>
          <button
            className="bg-gray-600/40 text-gray-200 px-4 items-center py-1 flex gap-2 rounded-md"
            onClick={onSave}
          >
            <FaRegSave />
            Save
          </button>
          {/* <button
            className="bg-gray-600/40 text-gray-200 px-4 items-center py-1 flex gap-2 rounded-md"
            onClick={onTest}
          >
            Test Code
          </button> */}
        </>
      )}
    </header>
  );
}
