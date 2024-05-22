import { useState } from "react";
import PreferenceType from "./PreferenceType";
import PreferenceTypeTitle from "./PreferenceTypeTitle";

export default function SelectablePreferenceType({ props }) {
  const [nextPreferenceType, setNextPreferenceType] = useState(0);
  function handleClick() {
    if (nextPreferenceType + 1 >= props.PreferenceType.length) {
      setNextPreferenceType(0);
    } else {
      setNextPreferenceType(nextPreferenceType + 1);
    }
  }

  return (
    <div className="bg-cyan-700 p-4 flex items-center flex-col">
      <PreferenceTypeTitle
        nextPreferenceType={nextPreferenceType}
        props={props}
      />
      <PreferenceType nextPreferenceType={nextPreferenceType} props={props} />
      <button onClick={handleClick} className="mt-5">
        Select Next Preference
      </button>
    </div>
  );
}
