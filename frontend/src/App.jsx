import { useState } from "react";
import "./App.css";
import Car from "./Car";
import SelectedResults from "./SelectedResults";

function App() {
  const [query, setQuery] = useState("");
  const [searchResponse, setSearchResponse] = useState(null);
  const [placeIdx, setPlaceIdx] = useState(0);
  const [selectedResults, setSelectedResults] = useState([]);

  // const [data, setData] = useState(null);
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // async function fetchData() {
  //   const response = await fetch("http://localhost:1235/");
  //   const json = await response.json();

  //   setData(json);
  // }
  async function handleClick() {
    console.log("button clicke");
    const res = await fetch(`http://localhost:1235/search?name=${query}`);
    const json = await res.json();

    const jsonData = JSON.parse(json);

    setSearchResponse(jsonData);
    console.log(searchResponse);
  }

  function handleNextClick() {
    setPlaceIdx(placeIdx + 1);
  }

  function handlePrevClick() {
    if (placeIdx < 2) {
      setPlaceIdx(0);
    } else {
      setPlaceIdx(placeIdx - 1);
    }
  }

  function handleSelectedclick() {
    setSelectedResults([
      ...selectedResults,
      {
        Name: searchResponse.Places[placeIdx].Name,
        Image: searchResponse.Places[placeIdx].Image,
      },
    ]);
  }
  return (
    <div className="flex justify-center flex-col">
      <h1 className="text-center">Date Planner</h1>
      <span className="text-center">Plan better dates ❤️</span>
      <div className="sm:grid sm:grid-cols-6 sm:gap-1 mt-10">
        <div className="sm:col-start-2 sm:col-span-4 text-center">
          <label>
            Search Resturants:
            <input
              className="px-1 mx-1"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <br />
          </label>
          <Car
            searchResponse={searchResponse}
            placeIdx={placeIdx}
            handleNextClick={handleNextClick}
            handlePrevClick={handlePrevClick}
            handleSelectedClick={handleSelectedclick}
          />
          <button>
            <a onClick={handleClick}>Search</a>
          </button>
        </div>
        <SelectedResults
          className="sm:col-end-8 sm:col-span-2"
          selectedResults={selectedResults}
        />
      </div>
    </div>
  );
}

export default App;
