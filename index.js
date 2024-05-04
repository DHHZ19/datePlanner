async function  makeFetch(){
    let response = await fetch("http://localhost:1235/search?name=mexican")
    
    const data = await response.json()

    const jsonData = JSON.parse(data)

  jsonData.Places.forEach(x =>  console.log(x.Name))


}


makeFetch()