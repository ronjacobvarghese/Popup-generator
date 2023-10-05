import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import PopupDataContextProvider from "./context/PopupDataContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <PopupDataContextProvider>
    <App />
  </PopupDataContextProvider>
);
