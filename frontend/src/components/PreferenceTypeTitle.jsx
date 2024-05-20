export default function PreferenceTypeTitle({ props }) {
  return (
    <div className="flex basis-4 gap-8 mt-10">
      {props.map((x, idx) => (
        <div
          className={"min-w-fit w-11 rounded-lg bg-blue-400 p-2 shadow-lg"}
          key={idx}
        >
          <span key={idx}>{x.title}</span>
        </div>
      ))}
    </div>
  );
}
