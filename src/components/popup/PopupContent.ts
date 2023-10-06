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
  
  console.log(flowData);
  let popups = flowData.map((item,index) => {
    let question;
    
    if(popupType === "Survey" && item.contentType!="Text"){
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
        let rating = ``;

        [...Array(10).keys()].forEach((item) => { rating += `<li>
        <button class = "popup-content-rating-button" value = "${item+1}">${item+1}</button>
      </li>`})

        content = `<ul class="popup-content-rating">
          ${rating}
        </ul>`
      } else{
        content = item.question;
      }
    } else{
      content = item.question
    }

    const contentContainer = `<div class = "popup-content-component">
        ${content}
      </div>`

      let buttonContent = "Next";
      let buttonClass = "next"

      if(flowData.length == index+1){
        buttonContent = "Submit";
        buttonClass = "submit";
      }

      let footer;
      if(popupType === "Survey"){
      footer = `<footer style = "justify-content:space-between;"  class = "popup-actions-component">
      <p>${index+1}/${flowData.length} Pages</p>
        <button value = ${item.id} class = "popup-actions-component-${buttonClass}">${buttonContent}</button>
      </footer>`    
    } else{
      footer = `<footer "  class = "popup-actions-component">
      <div>
      <button>Ok</button>
      </div>
    </footer>`   
    }
      
    return `
    <section key = ${item.id} class = "popup-root-component">
    ${header}
    ${contentContainer}
    ${footer}
    </section>`;

  })


  let root = ``;

  popups.forEach((_item,index) => root+=popups[popups.length-1-index])

    return root;

}





