export default function Car({
  searchResponse,
  placeIdx,
  handleNextClick,
  handlePrevClick,
  handleSelectedClick,
}) {
  return (
    <div className="flex justify-center mt-2">
      {searchResponse ? (
        <>
          <button className="block" onClick={handlePrevClick}>
            Prev
          </button>
          <div
            className="bg-blue-400 flex items-center flex-col"
            onClick={handleSelectedClick}
          >
            <h3
              key={searchResponse.Places[placeIdx]}
              className="font-semibold text-black"
            >
              {searchResponse.Places[placeIdx].Name}
            </h3>
            Rating: {searchResponse.Places[placeIdx].Rating}
            <br />
            Price Level:
            {console.log(searchResponse.Places[placeIdx].PriceLevel)}
            {searchResponse.Places[placeIdx].PriceLevel === 1
              ? "$"
              : searchResponse.Places[placeIdx].PriceLevel === 2
              ? "$$"
              : searchResponse.Places[placeIdx].PriceLevel === 3
              ? "$$$"
              : searchResponse.Places[placeIdx].PriceLevel === 4
              ? "$$$$"
              : "no price range"}
            <img
              className="p-2"
              alt={searchResponse.Places[placeIdx].Name}
              src={`data:image/jpg;base64,${searchResponse.Places[placeIdx].Image}`}
            />
          </div>
          <button className="block" onClick={handleNextClick}>
            Next
          </button>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
}
