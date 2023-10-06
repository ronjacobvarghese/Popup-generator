import { PopupStyles } from "./PopupStyles";
import { ConfigData } from "../../types";

export const PopupScripts = (configData, content) => {
  const head = document.head;

  let time = `${configData.time}`;
  let frequency = `${configData.frequency}`;
  let timeFormat = `${configData.timeFormat}`;
  let displayLimit = ` ${configData.displayLimit}`;

  if (timeFormat === "seconds") {
    time = time * 1000;
  }
  if (timeFormat === "minutes") {
    time = time * 60 * 1000;
  }
  if (timeFormat === "hours") {
    time = time * 60 * 60 * 1000;
  }

  const style = document.createElement("style");
  style.innerHTML = `${PopupStyles}`;

  head.appendChild(style);
  const body = document.body;
  const div = document.createElement("div");
  div.innerHTML = `${content}`;
  div.classList.add("popup-root-backdrop");

  setTimeout(() => {
    body.appendChild(div);
  }, time);

  const nextClassName = "popup-actions-component-next";
  const closeClassName = "popup-close-component";
  const ratingClassName = "popup-content-rating-button";
  const selectedRatingButtonClassName = "popup-content-rating-selected";
  const submitClassName = "popup-actions-component-submit";
  const textareaId = "#popup-content-textarea-component";

  const data = {};
  let answer = "";

  function repeatPopup() {
    if (displayLimit === 0) {
      return;
    }
    displayLimit -= 1;
    setTimeout(() => {
      body.appendChild(div);
    }, frequency * 60 * 1000);
  }

  let previousRatingButton;

  div.addEventListener("click", function (event) {
    if (event.target.classList.contains(nextClassName)) {
      const mainSection = event.target.parentElement?.parentElement;

      if (mainSection.previousElementSibling) {
        const previousItem = mainSection.previousElementSibling;
        data[event.target.value] = answer;
        answer = "";
        div.insertBefore(mainSection, previousItem);
      }
    }
    if (event.target.classList.contains(ratingClassName)) {
      answer = event.target.value;
      event.target.parentElement.classList.add(selectedRatingButtonClassName);
      if (previousRatingButton) {
        previousRatingButton.parentElement.classList.remove(
          selectedRatingButtonClassName
        );
      }
      previousRatingButton = event.target;
    }

    if (event.target.classList.contains(submitClassName)) {
      data[event.target.value] = answer;
      console.log(data);
      body.removeChild(div);
    }

    if (event.target.classList.contains(closeClassName)) {
      repeatPopup();
      body.removeChild(div);
    }
  });

  const textarea = document.querySelector(textareaId);
  if (textarea) {
    textarea.addEventListener("input", function () {
      answer = textarea.value;
    });
  }
};
