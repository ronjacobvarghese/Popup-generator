import { PopupStyles } from "./PopupStyles";
import { ConfigData } from '../../types';

export const PopupScripts = (configData:ConfigData, content:string) => `

let DB_URL; //<- insert DB API here

const head = document.head;

let time = \`${configData.time}\`;
let frequency = \`${configData.frequency}\`;
let timeFormat = \`${configData.timeFormat}\`;
let displayLimit = \` ${configData.displayLimit}\`;

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
style.innerHTML = \`${PopupStyles}\`;

head.appendChild(style);
const body = document.body;
const div = document.createElement("div");
div.innerHTML = \`${content}\`;
div.classList.add("popup-root-backdrop");

setTimeout(() => {
  body.appendChild(div);
}, time);

const nextClassName = "popup-actions-component-next";
const backClassName = "popup-actions-component-back";
const closeClassName = "popup-close-component";
const ratingClassName = "popup-content-rating-button";
const selectedRatingButtonClassName = "popup-content-rating-selected";
const submitClassName = "popup-actions-component-submit";
const formOptionsId = "popup-options-form"
const containsOptionsClassName = "popup-form-options-submit-component"

const data = {};
let answer = [];

function repeatPopup() {
  if (displayLimit < 1) {
    return;
  }
  displayLimit -= 1;
  setTimeout(() => {
    body.appendChild(div);
  }, frequency * 60 * 1000);
}

let previousRatingButton;




div.addEventListener("submit", function (event) {
  event.preventDefault();
    const formData = new FormData(event.target);
    for (const [name,value] of formData){
      answer.push(value);
    }


    const actionButton = event.submitter
  if (actionButton.classList.contains(nextClassName)) {
    const mainSection = event.target.parentElement;
    
    if (mainSection.previousElementSibling) {
      const previousItem = mainSection.previousElementSibling;
      data[actionButton.value] = answer;
      previousItem.style = "visibility:visible;"
      mainSection.style = "visibility:hidden;"
      answer = []
    }
  }

  if (actionButton.classList.contains(backClassName)) {
    const mainSection = event.target.parentElement
    if (mainSection.nextElementSibling) {
      const nextItem = mainSection.nextElementSibling;
      data[actionButton.value] = answer;
      nextItem.style = "visibility:visible;"
      mainSection.style = "visibility:hidden;"
      answer = [];
    }
  }
  if (actionButton.classList.contains(ratingClassName)) {
    answer.push(actionButton.value);
    actionButton.classList.add(selectedRatingButtonClassName);
    if (previousRatingButton) {
      previousRatingButton.classList.remove(
        selectedRatingButtonClassName
      );
    }
    previousRatingButton = actionButton;
  }

  if (actionButton.classList.contains(submitClassName)) {
    data[actionButton.value] = answer;
    answer = []
    if(DB_URL){
    const requestOptions = {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }

    fetch(DB_URL, requestOptions)
    .then(response => {
        if (response.ok) {
            console.log("Data posted successfully!");
        } else {
            console.error("Failed to post data to the database.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });}

    console.log(data);
    body.removeChild(div);
  }

  if (actionButton.classList.contains(closeClassName)) {
    repeatPopup();
    body.removeChild(div);
  }
});
`
