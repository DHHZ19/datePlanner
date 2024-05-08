export default function SelectedResults({ selectedResults }) {
  return (
    <div className="flex justify-self-end flex-col">
      <h3 className="font-bold font-sans">Selected Resturants: </h3>
      {selectedResults.map((child, idx) => (
        <div key={idx}>
          {child.Name}
          <img src={`data:image/jpg;base64,${child.Image}`} alt={child.name} />
        </div>
      ))}
    </div>
  );
}
