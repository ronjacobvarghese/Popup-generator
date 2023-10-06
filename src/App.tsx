import FlowChart from "./components/FlowChart";
import Form from "./components/Form";
import Header from "./components/Header";
import LiveWindow from "./components/LiveWindow";

function App() {
  return (
    <>
      <Header />
      <main className="overflow-x-auto overflow-y-clip h-full max-h-[100vh] pt-[4rem] flex flex-col">
        <div className="flex gap-10 w-full">
          <Form />
          <LiveWindow />
        </div>
        <div className="!px-10 flex-1">
          <FlowChart />
        </div>
      </main>
    </>
  );
}

export default App;
