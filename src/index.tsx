import { popupContent } from "./components/popup/PopupContent";
import { PopupStyles } from "./components/popup/PopupStyles";

const head = document.head;
const body = document.querySelector("#live-window") as HTMLDivElement;

const styles = PopupStyles;
const content = popupContent;

const style = document.createElement("style");
style.innerHTML = styles;
head.appendChild(style);

body.innerHTML = content;
