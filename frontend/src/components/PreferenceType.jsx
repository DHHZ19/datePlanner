export default function PreferenceType({ props, nextPreferenceType }) {
  return (
    <div className="flex basis-4 gap-8 mt-10 w-1/2 justify-center">
      {props.PreferenceType[nextPreferenceType].PreferenceTypes.map(
        (x, idx) => (
          <div
            className={"min-w-fit w-11 rounded-lg bg-blue-400 p-2 shadow-xl"}
            key={idx}
          >
            <span key={idx}>{x.title}</span>
          </div>
        )
      )}
    </div>
  );
}
