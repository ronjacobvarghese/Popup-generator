import { PopupStyles } from "./PopupStyles";

export const PopupScripts = (content:string) => `
  const head = document.head

  const style = document.createElement("style");
  style.innerHTML = \`${PopupStyles}\`
  head.appendChild(style);
  const body = document.body;

  const div = document.createElement("div");
  div.innerHTML =\`${content}\`
  div.classList.add("popup-root-backdrop")
  body.appendChild(div);

  const nextClassName = "popup-actions-component-next";
  const ratingClassName = "popup-content-rating-button";
  const selectedRatingButtonClassName = "popup-content-rating-selected"
  const submitClassName = "popup-actions-component-submit";
  const textareaId= "#popup-content-textarea-component";

  const data = {};
  let answer = "";

  let previousRatingButton;

  div.addEventListener("click", function(event){
    if (event.target.classList.contains(nextClassName)) {
      const mainSection = (event.target).parentElement
        ?.parentElement;

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
      if(previousRatingButton){
        previousRatingButton.parentElement.classList.remove(selectedRatingButtonClassName)
      }
      previousRatingButton = event.target;
    }

    if (event.target.classList.contains(submitClassName)) {
      data[event.target.value] = answer;
    console.log(data);
    body.removeChild(div);
    }
  })

  const textarea = document.querySelector(textareaId)
  if(textarea){
    textarea.addEventListener('input', function(){
    answer = textarea.value;
  })}
`
