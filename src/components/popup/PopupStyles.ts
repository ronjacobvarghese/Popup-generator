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
    background-color: rgba(255, 255, 255, 0.05);
    width: 100%;
    height:100%;
  }
  
  .popup-root-component{
    position:relative;
    background-color:white;
    display:flex;
    flex-direction:column;
    min-width:400px;
    min-height:200px;
    width:fit-content;
    max-width:800px;
    height:fit-content;
    border-radius:6px;
  }

  .popup-header-component{
    width:100%;
    padding: 1rem;
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

  .popup-actions-component{
    width:100%;
    padding:0 1rem 1rem 1rem;
    display:flex;
    justify-content:flex-end;
    gap:1rem;
  }


  .popup-actions-component > button{
    all:unset;
    padding:4px 8px;
    border:1px solid #2c9af0;
    color:#2c9af0;
    font-weight:bold; 
    border-radius:4px;
  }
`;
