import { useState } from "react";
import "./App.css";
import Car from "./Car";
import SelectedResults from "./SelectedResults";
import data from "./json.json";
import PreferenceTypeTitle from "./components/PreferenceTypeTitle";

function App() {
  const [query, setQuery] = useState("");
  const [searchResponse, setSearchResponse] = useState(null);
  const [placeIdx, setPlaceIdx] = useState(0);
  const [selectedResults, setSelectedResults] = useState([]);

  async function handleClick() {
    const res = await fetch(`http://localhost:1235/search?restaurant=${query}`);
    const json = await res.json();

    setSearchResponse(json);
  }

  function handleNextClick() {
    if (placeIdx + 1 >= searchResponse.Places.length) {
      setPlaceIdx(0);
    } else {
      setPlaceIdx(placeIdx + 1);
    }
  }

  function handlePrevClick() {
    if (placeIdx <= 0) {
      setPlaceIdx(searchResponse.Places.length - 1);
    } else {
      setPlaceIdx(placeIdx - 1);
    }
  }

  function handleSelectedclick() {
    for (let i = 0; i < selectedResults.length; i++) {
      if (
        Object.values(selectedResults[i]).includes(
          searchResponse.Places[placeIdx].PlaceID
        )
      ) {
        return;
      }
    }

    setSelectedResults([
      ...selectedResults,
      {
        Name: searchResponse.Places[placeIdx].Name,
        Image: searchResponse.Places[placeIdx].Image,
        PlaceID: searchResponse.Places[placeIdx].PlaceID,
      },
    ]);
  }
  return (
    <div className="flex justify-center flex-col">
      <h1 className="text-center">Date Planner</h1>
      <span className="text-center">Plan better dates ❤️</span>
      <div className="sm:grid sm:grid-cols-8 sm:gap-1 mt-10">
        <div className="sm:col-start-3 sm:col-span-4 text-center">
          <label>
            Search Resturants:
            <input
              className="px-2 mx-1"
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
        <SelectedResults selectedResults={selectedResults} />
      </div>
      <PreferenceTypeTitle props={data} />
    </div>
  );
}

export default App;
