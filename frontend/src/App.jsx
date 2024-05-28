import "./App.css";
import data from "./data.json";
import SelectablePreferenceType from "./components/SelectablePreferenceType";

function App() {
  return (
    <div className="flex justify-center flex-col">
      <h1 className="text-center">Outing Planner</h1>
      <span className="text-center animate-fade-in text-xl">
        Plan better outings ❤️
      </span>
      <SelectablePreferenceType props={data} />
    </div>
  );
}

export default App;
