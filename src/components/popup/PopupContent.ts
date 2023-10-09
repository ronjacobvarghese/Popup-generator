import { PopupContents, PopupFooters, PopupHeaders } from "../../lib/data";
import { FlowData, PopupTypes } from "../../types";

type Props = {
  flowData:FlowData[];
  popupType:PopupTypes | ""
  visibleIndex?:number
}
export default function PopupContent({flowData, popupType,visibleIndex}:Props) {
  let popups = flowData.map((item,index) => {
    
    const header = PopupHeaders(popupType as PopupTypes,item);
        
    let content:string;
    
    if(popupType === "Survey"){
      if(item.contentType === "TextField"){
        content = PopupContents["TextField"]();
      }else if(item.contentType === "Rating"){
        content = PopupContents['Rating']();
      }else if(item.contentType === "CheckList"){
        content = PopupContents['CheckList'](item.id, item.options);
      }else if(item.contentType === 'Options'){
        content = PopupContents['Options'](item.id, item.options);
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

    let popup;

    if(visibleIndex !== undefined){
      popup =  `
      <section key = ${item.id} style = "visibility:${index !== visibleIndex ? "hidden":"visible"}" class = "popup-root-component">
      ${header}
      ${contentContainer}
      ${footer}
      </section>`;
    } else {
      popup =  `
      <section key = ${item.id} style = "visibility:${index !== 0 ? "hidden":"visible"}" class = "popup-root-component">
      
      ${header}
      <form id = "popup-options-form-${item.id}">      
      ${contentContainer}
      ${footer}
      </form>
      </section>`;  
    }
      
    return popup
  })


  let root = ``;

  popups.forEach((_item,index) => root+=popups[popups.length-1-index])

    return root;

}





