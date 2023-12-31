import axios from "axios";
import FlowChart from "./components/FlowChart";
import Form from "./components/Form";
import Header from "./components/Header";
import LiveWindow from "./components/LiveWindow";
import { usePopupDataContext } from "./context/PopupDataContextProvider";

function App() {
  const { configData, flowData } = usePopupDataContext();

  // const handleTest = () => {
  //   const content = PopupContent({ flowData, popupType });
  //   const scripts = PopupScripts(
  //     {
  //       time: 0,
  //       timeFormat: "seconds",
  //       displayLimit: 0,
  //       frequency: 0,
  //     },
  //     content
  //   );

  //   if (appRef.current) {
  //     const head = appRef.current.parentElement as NonNullable<HTMLHeadElement>;
  //     const script = document.createElement("script");
  //     script.innerHTML = scripts;
  //     head.appendChild(script);
  //   }
  // };

  const onSave = () => {
    const API_POST = async () => {
      try {
        await axios.post(
          import.meta.env.VITE_FIREBASE_URL + "config.json",
          JSON.stringify({
            configData,
            flowData,
          }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      } catch (err) {
        console.log(err);
      }
    };
    if (configData && flowData.length !== 0) {
      API_POST();
      console.log("saved");
    }
  };
  return (
    <>
      <Header
        save={(configData && flowData.length !== 0) || false}
        onSave={onSave}
        // onTest={handleTest}
      />
      <main className="overflow-x-auto overflow-y-clip h-full max-h-[100vh] pt-[4rem] flex flex-col">
        <div className="flex gap-10 w-full">
          <Form />
          <LiveWindow />
        </div>
        <div className="!px-10 py-10 flex-1 max-h-[50%]">
          <FlowChart />
        </div>
      </main>
    </>
  );
}

export default App;
