import { useState } from "react";
import "./App.css";
import Car from "./Car";

function App() {
  const [query, setQuery] = useState("");
  const [searchResponse, setSearchResponse] = useState(null);
  const [placeIdx, setPlaceIdx] = useState(0);

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
  return (
    <>
      <div></div>
      <h1>Vite + React</h1>
      <div className="card">
        {/* {data ? (
          <ul>
            {data.Results.map((item) => (
              <li key={item.place_id}>{`Name: ${item.name}`}</li>
            ))}
          </ul>
        ) : (
          <div>Loading...</div>
        )} */}

        <label>
          Search Resturants:
          <input value={query} onChange={(e) => setQuery(e.target.value)} />
          <br />
          {query}
        </label>

        <Car
          searchResponse={searchResponse}
          placeIdx={placeIdx}
          handleNextClick={handleNextClick}
          handlePrevClick={handlePrevClick}
        />
        <button>
          <a onClick={handleClick}>Search</a>
        </button>
      </div>
    </>
  );
}

export default App;
