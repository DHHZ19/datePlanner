import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState(null)
  useEffect (() => {  
      fetchData() 
  },[])

  async function fetchData() {
    const response = await fetch("http://localhost:1235/");
    const json = await response.json()

    setData(json)
  }



  return (
    <>
      <div>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
      {data ? (
        // Render the fetched data
        <ul>
          {data.Results.map(item => (
            <li key={item.place_id}>{`Name: ${item.name}`}</li>
          ))}
        </ul>
      ) : (
        // Render a loading state
        <div>Loading...</div>
      )}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
