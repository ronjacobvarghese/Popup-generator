export const PopupStyles = `
  .popup-root-backdrop *{
    margin:0px;
    padding:0px;
  }
  .popup-root-backdrop{
    display:grid;
    place-items:center;
    margin:0;
    top:0;
    left:0;
    z-index : 1000;
    position:absolute;
    background-color: rgba(0,0, 0, 0.50);
    width: 100%;
    height:100%;
  }
  
  .popup-root-component{
    position:absolute;
    background-color:white;
    display:flex;
    flex-direction:column;
    justify-content:space-evenly;
    min-width:400px;
    min-height:200px;
    width:fit-content;
    max-width:800px;
    height:fit-content;
    border-radius:6px;
  }

  .popup-header-component{
    width:100%;
    padding: 0.5rem 1rem;
    border-bottom:1px solid lightgrey;
    box-sizing:border-box;
    display:flex;
    align-items:center;
    gap:1rem;
  }

  .popup-header-component h1{
    margin:0;
    width:100%;
    display:flex;
  }

  .popup-header-component h1 p{
    color:red;
    font-size:1rem;
  }
  
  .popup-header-component svg{
    width:2rem;
    height:2rem;
    fill :#2c9af0;
  }
  
  .popup-content-component{
    width:100%;
    padding:1rem;
  }
  
  .popup-content-rating{
    width:100%;
    display:flex;
    justify-content:space-evenly;
    gap:5px;
  }

  .popup-content-rating li{
    background-color:  #d1d5db ;
    padding:2px 6px;
    border:2px solid #9ca3af;
    border-radius:4px;
  }

  .popup-content-rating-selected{
    background-color:#2c9af0 !important;
    color:white;
    border:2px solid #2c9af0 !important;
  }
  
  .popup-actions-component{
    width:100%;
    padding:0 1rem;
    display:flex;
    justify-content:flex-end;
    align-items:center;
    gap:1rem;
    color:grey;
  }


  .popup-actions-component >  button{
    all:unset;
    padding:4px 8px;
    border:1px solid #2c9af0;
    color:#2c9af0;
    font-weight:bold; 
    border-radius:4px;
  }
  `;
  
