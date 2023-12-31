import { FlowData, PopupContentTypes, PopupTypes } from '../types';

type PopupOptions = {
  [index:string]:(...args:any) => string;
}


export const svgs = {
  "Close":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>`,
  "Error": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>`,
  "Survey":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>`,
  "Warning":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>`
}



export const PopupContents: PopupOptions = {

  "TextField":() => `<textarea name = "text-area-component" "class = "popup-content-textarea-component" style="border:1px solid #dddddd; border-radius:4px;width:100%; padding:1rem; height:100px;"></textarea>`,

  "Rating": () => {
    let rating = ``;
      [...Array(10).keys()].forEach((item) => { rating += `<li>
        <button  name ="${item+1}" class = "popup-content-rating-button" value = "${item+1}">${item+1}</button>
      </li>`})
        return `<ul class="popup-content-rating">
          ${rating}
        </ul>`
  },

  "CheckList": (id:string, options:string[]) => {
    let checkList = ``;
    options.forEach((option,index) => {
      checkList += `  <div>
      <input type="checkbox" name="checkbox-${id}" value=${option} id="q${index+1}-${id}-option${index+1}">
      <label for="q${index+1}-option${index+1}">${option}</label>
  </div>`
    })

    return checkList
  },

  "Options": (id:string, options:string[]) => {
    let selectOptions = ``;
    options.forEach((option,index) => {
      selectOptions += `  <div>
      <input type="radio" name="options-${id}" value=${option} id="q${index+1}-${id}-option${index+1}">
      <label for="q${index+1}-option${index+1}">${option}</label>
  </div>`
    })

    return selectOptions
  }
}


export const PopupHeaders = (popupType:PopupTypes,item:FlowData) => {
  let question;
    
  if(popupType === "Survey" && item.contentType!="Text"){
    question = item.question
  } else{
    question = popupType;
  }
  
  return (
    `<div class = "popup-header-component">
          ${svgs[popupType]}
          <h2>${question}</h2>
          <button class = "popup-close-component">${svgs['Close']}</button>
      </div>`)
  
}

export const PopupFooters: PopupOptions= {
  "Survey" : (index:number,totalLength:number,id:string,contentType: PopupContentTypes) =>{

    let isForm = "";
    let buttonContent = "Next";
    let buttonClass = "next"

    if(totalLength == index+1){
      buttonContent = "Submit";
      buttonClass = "submit";
    }

    if(contentType === "CheckList" ||  contentType=== "Options"){
      isForm = "popup-form-options-submit-component"
    }



    return (
`<footer style = "justify-content:space-between;" class="popup-actions-component">
${index!==0 ?
  `<button class = "popup-actions-component-back">Back</button>`:""}
  <p>${index+1}/${totalLength} Pages</p>
    <button value = ${id} class = "popup-actions-component-${buttonClass}  ${isForm}">${buttonContent}</button>
  </footer>`  )  },

  "Default": () => `<footer "  class = "popup-actions-component">
  <button class = "popup-close-component">Ok</button>
</footer>`   
}