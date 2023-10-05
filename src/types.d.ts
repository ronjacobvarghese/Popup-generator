
export type PopupTypes = "Warning" | "Error" | "Survey";
export type PopupContentTypes = "Options" | "Text" | "Rating" | "TextField" |"CheckList";
export type PopupActionType = "Submit" | "Continue";
export type PopupLoadTypes = "onPageLoad" | "onButtonClick";

export type ConfigItem = {
  id: string;
  loadType: PopupLoadTypes;
  question: string;
  contentType?: PopupContentTypes;
  options?: string[]
  isRequired?:boolean
};
