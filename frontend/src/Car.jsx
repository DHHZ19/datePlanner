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
          <div className="bg-blue-400" onClick={handleSelectedClick}>
            <h3 key={placeIdx} className="font-semibold text-black">
              {searchResponse.Places[placeIdx].Name}
            </h3>
            <img
              className="p-2"
              src={`data:image/jpg;base64,${searchResponse.Places[placeIdx].Image}`}
            />
          </div>
          <button className="block" onClick={handleNextClick}>
            Next
          </button>
        </>
      ) : (
        <div>no data</div>
      )}
    </div>
  );
}
