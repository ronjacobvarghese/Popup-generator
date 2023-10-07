import { PopupContents, PopupFooters, PopupHeaders } from "../../lib/data";
import { FlowData, PopupTypes } from "../../types";

type Props = {
  flowData:FlowData[];
  popupType:PopupTypes | ""
}
export default function PopupContent({flowData, popupType}:Props) {
  let popups = flowData.map((item,index) => {
    
    const header = PopupHeaders(popupType as PopupTypes,item);
        
    let content:string;
    
    if(popupType === "Survey"){
      if(item.contentType === "TextField"){
        content = PopupContents["TextField"]();
      }else if(item.contentType === "Rating"){
        content = PopupContents['Rating']();
      } else{
        content = item.question;
      }
    } else{
      content = item.question
    }

    const contentContainer = `<div class = "popup-content-component">
        ${content}
      </div>`



      let footer:string;
      if(popupType === "Survey"){
      footer = PopupFooters.Survey(index,flowData.length,item.id)
    } else{
      footer = PopupFooters.Default();
    }
      
    return `
    <section key = ${item.id} style = "visibility:${index !== 0 ? "hidden":"visible"}" class = "popup-root-component">
    ${header}
    ${contentContainer}
    ${footer}
    </section>`;

  })


  let root = ``;

  popups.forEach((_item,index) => root+=popups[popups.length-1-index])

    return root;

}





