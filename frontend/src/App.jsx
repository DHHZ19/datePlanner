import "./App.css";
import data from "./data.json";
import SelectablePreferenceType from "./components/SelectablePreferenceType";

function App() {
  return (
    <div className="flex justify-center flex-col">
      <h1 className="text-center">Date Planner</h1>
      <span className="text-center">Plan better dates ❤️</span>
      <SelectablePreferenceType props={data} />
    </div>
  );
}

export default App;
