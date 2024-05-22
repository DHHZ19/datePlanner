export default function PreferenceType({
  props,
  nextPreferenceType,
  handleShowDetails,
  setShowTest,
}) {
  return (
    <div className="flex basis-4 gap-8 mt-10 w-1/2 justify-center">
      {props.PreferenceType[nextPreferenceType].PreferenceTypes.map(
        (x, idx) => (
          <div
            className={"min-w-fit w-11 rounded-lg bg-slate-900 p-2 shadow-xl"}
            key={idx}
            onClick={() => setShowTest(x.title)}
          >
            <a className="w-full" onClick={handleShowDetails}>
              <span key={idx}>{x.title}</span>
            </a>
          </div>
        )
      )}
    </div>
  );
}
