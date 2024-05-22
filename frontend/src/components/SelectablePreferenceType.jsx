import { useState } from "react";
import PreferenceType from "./PreferenceType";
import PreferenceTypeTitle from "./PreferenceTypeTitle";

export default function SelectablePreferenceType({ props }) {
  const [nextPreferenceType, setNextPreferenceType] = useState(0);
  function handleClick() {
    setNextPreferenceType(nextPreferenceType + 1);
  }

  return (
    <div>
      <PreferenceTypeTitle
        nextPreferenceType={nextPreferenceType}
        props={props}
      />
      <PreferenceType nextPreferenceType={nextPreferenceType} props={props} />
      <button onClick={handleClick}>dfadlfkjasdlkfj</button>
    </div>
  );
}
