export default function PreferenceTypeTitle({ props, nextPreferenceType }) {
  return (
    <div className="flex basis-4 gap-8 mt-10">
      <h1>{props.PreferenceType[nextPreferenceType].PreferenceTypeTitle}</h1>
    </div>
  );
}
