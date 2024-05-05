export default function Car({
  searchResponse,
  placeIdx,
  handleNextClick,
  handlePrevClick,
}) {
  return (
    <div>
      {searchResponse ? (
        <>
          <h3 key={placeIdx}>{searchResponse.Places[placeIdx].Name}</h3>
          <img
            src={`data:image/jpg;base64,${searchResponse.Places[placeIdx].Image}`}
          />
          <button onClick={handlePrevClick}>Prev</button>
          <button onClick={handleNextClick}>Next</button>
        </>
      ) : (
        <div> no data</div>
      )}
    </div>
  );
}
