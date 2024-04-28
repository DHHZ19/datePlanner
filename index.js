async function  makeFetch(){
    let response = await fetch("http://localhost:1235/")
    
    const data = await response.json()
    for(const point in data){
        console.log(point)
    }

    console.log(data.Results.map(x => x.name))
    
}


makeFetch()
