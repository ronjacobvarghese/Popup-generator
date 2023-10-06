
export type PopupTypes = "Warning" | "Error" | "Survey";
export type PopupContentTypes = "Options" | "Text" | "Rating" | "TextField" |"CheckList";
export type PopupActionType = "Submit" | "Continue";
export type PopupLoadTypes = "onPageLoad" | "onButtonClick";

export type FlowData = {
  id: string;
  step:number;
  loadType?: PopupLoadTypes;
  question: string;
  contentType?: PopupContentTypes;
  options?: string[]
  isRequired?:boolean
};

export type ConfigData = {
  time:number;
  timeFormat: "seconds"|"minutes"|"hours";
  displayLimit:number;
  frequency:number;
}
