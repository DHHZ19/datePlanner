export default function PreferenceTypeTitle({ props }) {
  return (
    <div className="flex basis-4 gap-8 mt-10">
      <span>{props.PreferenceType[0].PreferenceTypeTitle}</span>
    </div>
  );
}
