import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(null)
  useEffect (() => {
  
      async function fetchData() {
        const response = await fetch("http://localhost:1235/");
        const data = await response.json()

        setCount(JSON.stringify(data))
      }

      fetchData() 

  })


  return (
    <>
      <div>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {count.results}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
