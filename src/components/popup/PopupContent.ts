import { PopupContents, svgs } from "../../lib/data";
import { FlowData, PopupTypes } from "../../types";

type Props = {
  flowData:FlowData[];
  popupType:PopupTypes | ""
}
export default function PopupContent({flowData, popupType}:Props) {
  let svg:string;
  if(popupType !== ""){
    svg = svgs[popupType]
  }

  let popups = flowData.map((item) => {
    let question;

    if(popupType === "Survey"){
      question = `${item.question}<p style = "color:red;width:10px;height:10px;">${item.isRequired ? "*":""}</p>`
    } else{
      question = popupType;
    }

    const header 
        =`<div class = "popup-header-component">
            ${svg}
            <h1>${question}</h1>
          </div>`

    let content;

    if(popupType === "Survey"){
      if(item.contentType === "TextField"){
        content = PopupContents["TextField"]
      }else if(item.contentType === "Rating"){
        content = `<ul class = "popup-content-rating">
          ${[...Array(10).keys()].map((item) => `<li>
              <button id = "popup-content-button-${item}">${item}</button>
            </li>`)}
        </ul>`
      }
    } else{
      content = item.question
    }

    const contentContainer = `<div class = "popup-content-component">
        ${content}
      </div>`

      const footer = `<footer class = "popup-actions-component">
      <button style ="background-color:#2c9af0;color:white;"> Next </button>
    </footer>`
    return `
    ${header}
    ${contentContainer}
    ${footer}
    `
  })

  const root = ` <section class = "popup-root-component">
      ${popups[0]}
    </section>`;


    return root;

}





