import { useState } from "react";
import Input from "./ui/Input";
import Select from "./ui/Select";
import { Menu, MenuItem } from "@mui/material";
import { FlowData, PopupContentTypes, PopupTypes } from "../types";
import { AiOutlinePlus } from "react-icons/ai";
import { FaTrashCan } from "react-icons/fa6";

type Props = {
  popupType: PopupTypes | "";
  step: number;
  flowData?: FlowData;
  onSubmit: (item: FlowData) => void;
  onAdd: (item: FlowData) => void;
  onDelete: (step: number) => void;
  setError: React.Dispatch<React.SetStateAction<string>>;
  generate?: boolean;
  disable?: boolean;
};

export default function FlowStep({
  step,
  flowData,
  popupType,
  onSubmit,
  onAdd,
  onDelete,
  generate,
  setError,
  disable,
}: Props) {
  const [id, setId] = useState(flowData?.id ? flowData.id : "");
  // const [load, setLoad] = useState<PopupLoadTypes | "">(
  //   flowData?.loadType ? flowData.loadType : ""
  // );
  const [contentType, setContentType] = useState<PopupContentTypes | "">(
    flowData?.contentType ? flowData.contentType : ""
  );
  const [question, setQuestion] = useState(
    flowData?.question ? flowData.question : ""
  );

  const [optionsAnchor, setOptionsAnchor] = useState<null | HTMLElement>(null);
  const [options, setOptions] = useState<string[]>(
    flowData?.options ? flowData.options : []
  );
  const [option, setOption] = useState<string>("");
  const [addOptionsAnchor, setAddOptionsAnchor] = useState<null | HTMLElement>(
    null
  );

  // const [isRequired, setIsRequired] = useState(true);

  const onSubmitNewStep = (generate: boolean) => {
    if (!popupType) {
      setError("Please enter a valid popup type");
      return;
    }
    if (!id.trim()) {
      setError("Please enter a valid Id");
      return;
    }

    // if (step === 1 && !load) {
    //   setError("Please enter a valid load type");
    //   return;
    // }

    if (popupType === "Survey" && !contentType) {
      setError("Please enter a valid content type");
      return;
    }

    if (!question.trim()) {
      setError("Please enter a valid message");
      return;
    }

    if (
      (contentType === "Options" || contentType === "CheckList") &&
      !options
    ) {
      setError("Please enter valid options");
      return;
    }

    const data = {
      id,
      step,
      // loadType: load ? load : undefined,
      contentType: contentType ? contentType : undefined,
      question,
      // isRequired,
      options,
    };

    if (generate) {
      onSubmit(data);
    } else {
      onAdd(data);
    }
  };

  const onRemoveOptions = (deletedIndex: number) => {
    setOptions((state) =>
      state.filter((_item, index) => index !== deletedIndex)
    );
  };

  const onSubmitOptions = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!option.trim()) {
      return;
    }

    setOptions((state) => [...state, option]);
    setOption("");
    setAddOptionsAnchor(null);
  };

  return (
    <li className="flex justify-between items-center min-w-max mb-6 py-2 ">
      <ul className="flex gap-4 step-details !w-fit">
        <li>
          <h3>{step}.</h3>
        </li>
        <li>
          <p>Id:</p>
          <Input disable={disable} value={id} setValue={setId} />
        </li>
        {/* -------------------Load Type And Content Type------------------*/}
        {/* {id && step === 1 && (
          <li>
            <p>Load Type:</p>
            <Select value={load} setChange={setLoad}>
              <MenuItem value="onPageLoad">On Page Load</MenuItem>
              <MenuItem value="onButtonClick">On Button Click</MenuItem>
            </Select>
          </li>
        )} */}
        {id && popupType === "Survey" && (
          <li>
            <p> Content Type:</p>
            <Select
              disable={disable}
              value={contentType}
              setChange={setContentType}
            >
              <MenuItem value="Text"> Text </MenuItem>
              <MenuItem value="Rating"> Rating </MenuItem>
              <MenuItem value="Options"> Options </MenuItem>
              <MenuItem value="TextField"> Text Field </MenuItem>
              <MenuItem value="CheckList"> Check List </MenuItem>
            </Select>
          </li>
        )}
        {/* -------------------------Options Type---------------------------- */}
        {id && (contentType === "Options" || contentType === "CheckList") && (
          <li className="relative">
            <div className="relative">
              <button
                onClick={(e) => setOptionsAnchor(e.currentTarget)}
                className="py-[8px] text-sm  !min-w-fit !w-fit px-4 bg-gray-400/20 rounded-md"
              >
                View Options
              </button>
              <Menu
                anchorEl={optionsAnchor}
                open={Boolean(optionsAnchor)}
                onClose={() => setOptionsAnchor(null)}
              >
                {options.length === 0 && (
                  <MenuItem sx={{ height: "20px", width: "200px" }}>
                    {" "}
                    No Options{" "}
                  </MenuItem>
                )}
                {options.map((item, index) => (
                  <MenuItem
                    key={index}
                    sx={{
                      height: "30px",
                      display: "flex",
                      alignItems: "center",
                      width: "fit-content",
                      justifyContent: "space-between",
                      minWidth: "200px",
                    }}
                  >
                    {item}
                    <button
                      disabled={disable}
                      onClick={() => onRemoveOptions(index)}
                    >
                      <FaTrashCan />
                    </button>
                  </MenuItem>
                ))}
              </Menu>
            </div>
            <div>
              <button
                disabled={disable}
                onClick={(e) => setAddOptionsAnchor(e.currentTarget)}
                className="bg-gray-400/40 p-1 rounded-full"
              >
                <AiOutlinePlus />
              </button>
              <Menu
                anchorEl={addOptionsAnchor}
                open={Boolean(addOptionsAnchor)}
                onClose={() => setAddOptionsAnchor(null)}
              >
                <MenuItem>
                  <form onSubmit={onSubmitOptions} className="flex gap-4">
                    <Input
                      value={option}
                      isNotCenter
                      length={6}
                      setValue={setOption}
                    />
                    <button className="p-1 font-semibold">
                      <AiOutlinePlus size="1.2rem" />
                    </button>
                  </form>
                </MenuItem>
              </Menu>
            </div>
          </li>
        )}
        {/* ---------------------Question/Message Type-----------------------*/}
        {id && (contentType || popupType !== "Survey") && (
          <li>
            <p>
              {contentType === "Text" || popupType !== "Survey"
                ? "Message:"
                : "Question:"}
            </p>
            <Input
              disable={disable}
              value={question}
              setValue={setQuestion}
              length={48}
              isNotCenter
            />
          </li>
        )}
        {/* {id && contentType && contentType !== "Text" && (
          <li>
            <p>Is Required(*):</p>
            <Switch
              checked={isRequired}
              onChange={(e) => setIsRequired(e.target.checked)}
            />
          </li>
        )} */}
      </ul>

      {/* ------------------------Actions Type-------------------------------*/}
      <div className="flex gap-2 px-4">
        {generate && (
          <button
            className="px-4 py-2 bg-gray-600/60 rounded-md"
            onClick={() => onSubmitNewStep(true)}
          >
            Generate
          </button>
        )}
        {id && popupType === "Survey" && (
          <>
            <button
              onClick={() => onSubmitNewStep(false)}
              className="bg-gray-950 flex items-center gap-2 px-4 py-1 rounded-md shadow-gray-600/20 text-lg shadow-md"
            >
              <AiOutlinePlus /> Add
            </button>
            <button
              onClick={() => onDelete(step)}
              className="bg-gray-950 flex items-center gap-2 p-2 rounded-md shadow-gray-600/20 text-lg shadow-md"
            >
              <FaTrashCan />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
