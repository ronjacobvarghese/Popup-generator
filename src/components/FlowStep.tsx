import { useState } from "react";
import Input from "./ui/Input";
import Select from "./ui/Select";
import { MenuItem, Switch, Menu, MenuList } from "@mui/material";
import {
  ConfigItem,
  PopupContentTypes,
  PopupLoadTypes,
  PopupTypes,
} from "../types";
import { AiOutlinePlus } from "react-icons/ai";
import { FaTrashCan } from "react-icons/fa6";

type Props = {
  popupType: PopupTypes | "";
  step: number;
  configItem?: ConfigItem;
  onAdd: (item: Partial<ConfigItem>) => void;
};

export default function FlowStep({
  step,
  configItem,
  popupType,
  onAdd,
}: Props) {
  const [id, setId] = useState(configItem?.id ? configItem.id : "");
  const [load, setLoad] = useState<PopupLoadTypes | "">(
    configItem?.loadType ? configItem.loadType : ""
  );
  const [contentType, setContentType] = useState<PopupContentTypes | "">(
    configItem?.contentType ? configItem.contentType : ""
  );
  const [question, setQuestion] = useState(
    configItem?.question ? configItem.question : ""
  );

  const [optionsAnchor, setOptionsAnchor] = useState<null | HTMLElement>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [option, setOption] = useState<string>("");
  const [addOptionsAnchor, setAddOptionsAnchor] = useState<null | HTMLElement>(
    null
  );

  const [isRequired, setIsRequired] = useState(true);

  const onAddNewStep = () => {
    const data = {
      id,
      loadType: load ? load : undefined,
      contentType: contentType ? contentType : undefined,
      question,
    };

    onAdd(data);
  };

  const onRemoveOptions = (deletedIndex: number) => {
    setOptions((state) =>
      state.filter((_item, index) => index !== deletedIndex)
    );
  };

  const onAddOptions = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!option.trim()) {
      return;
    }

    setOptions((state) => [...state, option]);
    setOption("");
    setAddOptionsAnchor(null);
  };

  return (
    <li className="flex justify-between items-center min-w-max mb-6 py-2 relative">
      <ul className="flex gap-4 step-details !w-fit">
        <li>
          <h3>{step}.</h3>
        </li>
        <li>
          <p>Id:</p>
          <Input value={id} setValue={setId} />
        </li>

        {/* -------------------Load Type And Content Type------------------*/}

        {id && step === 1 && (
          <li>
            <p>Load Type:</p>
            <Select value={load} setChange={setLoad}>
              <MenuItem value="onPageLoad">On Page Load</MenuItem>
              <MenuItem value="onButtonClick">On Button Click</MenuItem>
            </Select>
          </li>
        )}
        {id && popupType === "Survey" && (
          <li>
            <p> Content Type:</p>
            <Select value={contentType} setChange={setContentType}>
              <MenuItem value="Options"> Options </MenuItem>
              <MenuItem value="Text"> Text </MenuItem>
              <MenuItem value="Rating"> Rating </MenuItem>
              <MenuItem value="TextField"> Text Field </MenuItem>
              <MenuItem value="CheckList"> Check List </MenuItem>
            </Select>
          </li>
        )}
        {/* -------------------------Options Type----------------------------*/}

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
                    <button onClick={() => onRemoveOptions(index)}>
                      <FaTrashCan />
                    </button>
                  </MenuItem>
                ))}
              </Menu>
            </div>
            <div>
              <button
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
                  <form onSubmit={onAddOptions} className="flex gap-4">
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
              value={question}
              setValue={setQuestion}
              length={48}
              isNotCenter
            />
          </li>
        )}
        {id && contentType && contentType !== "Text" && (
          <li>
            <p>Is Required(*):</p>
            <Switch
              checked={isRequired}
              onChange={(e) => setIsRequired(e.target.checked)}
            />
          </li>
        )}
      </ul>

      {/* ------------------------Actions Type-------------------------------*/}

      {id && popupType === "Survey" && (
        <div className="flex gap-2 px-4">
          <button
            onClick={onAddNewStep}
            className="bg-gray-950 flex items-center gap-2 px-4 py-1 rounded-md shadow-gray-600/20 text-lg shadow-md"
          >
            <AiOutlinePlus /> Add
          </button>
          <button className="bg-gray-950 flex items-center gap-2 p-2 rounded-md shadow-gray-600/20 text-lg shadow-md">
            <FaTrashCan />
          </button>
        </div>
      )}
    </li>
  );
}
