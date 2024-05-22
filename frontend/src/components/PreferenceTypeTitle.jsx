export default function PreferenceTypeTitle({ props, nextPreferenceType }) {
  return (
    <div className="flex basis-4 gap-8 mt-10">
      <span>
        {props.PreferenceType[nextPreferenceType].PreferenceTypeTitle}
      </span>
    </div>
  );
}
