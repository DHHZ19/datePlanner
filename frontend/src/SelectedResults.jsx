export default function SelectedResults({ selectedResults }) {
  return (
    <div className="flex flex-col justify-center text-center">
      <h3 className="font-bold font-sans">Selected Resturants: </h3>
      {selectedResults.map((child, idx) => (
        <div key={idx} className="flex items-center flex-col">
          {child.Name}
          <img src={`data:image/jpg;base64,${child.Image}`} alt={child.name} />
        </div>
      ))}
    </div>
  );
}
