export default function SelectedResults({ selectedResults }) {
  return (
    <div className="flex flex-col justify-center text-center px-2">
      <h3 className="font-bold font-sans text-2xl">Selected Resturants: </h3>
      {selectedResults.map((child, idx) => (
        <div key={idx} className="flex items-center flex-col">
          <span className="font-bold text-2xl">{child.Name}</span>
          <img src={`data:image/jpg;base64,${child.Image}`} alt={child.name} />
        </div>
      ))}
    </div>
  );
}
