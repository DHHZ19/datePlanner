export default function SelectedResults({ selectedResults }) {
  return (
    <div className="flex flex-col text-center px-2">
      <h3 className="font-bold font-sans text-xl">Selected Resturants: </h3>
      {selectedResults.map((child) => (
        <div key={child.PlaceID} className="flex items-center flex-col">
          <span className="font-bold text-xl">{child.Name}</span>
          <img src={`data:image/jpg;base64,${child.Image}`} alt={child.name} />
        </div>
      ))}
    </div>
  );
}
