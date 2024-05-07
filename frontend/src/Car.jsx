export default function Car({
  searchResponse,
  placeIdx,
  handleNextClick,
  handlePrevClick,
}) {
  return (
    <div className="">
      {searchResponse ? (
        <>
          <h3 key={placeIdx}>{searchResponse.Places[placeIdx].Name}</h3>
          <button className="" onClick={handlePrevClick}>
            Prev
          </button>
          <img
            className="p-2"
            src={`data:image/jpg;base64,${searchResponse.Places[placeIdx].Image}`}
          />
          <button onClick={handleNextClick}>Next</button>
        </>
      ) : (
        <div> no data</div>
      )}
    </div>
  );
}
