import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [searchResponse, setSearchResponse] = useState('');

  const [data, setData] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch("http://localhost:1235/");
    const json = await response.json();

    setData(json);
  }
  async function handleClick() {
    console.log("button clicke");
    const res = await fetch(`http://localhost:1235/search?name=${query}`);
    const blob = await res.blob();
    const imageUrl = URL.createObjectURL(blob);
    setSearchResponse(imageUrl);
  }
  return (
    <>
      <div></div>
      <h1>Vite + React</h1>
      <div className="card">
        {data ? (
          <ul>
            {data.Results.map((item) => (
              <li key={item.place_id}>{`Name: ${item.name}`}</li>
            ))}
          </ul>
        ) : (
          <div>Loading...</div>
        )}

        <label>
          Search albums:
          <input value={query} onChange={(e) => setQuery(e.target.value)} />
          {query}
        </label>

        <button>
          <a onClick={handleClick}> button</a>
        </button>
        <div>
          <img src={searchResponse}></img>
        </div>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
