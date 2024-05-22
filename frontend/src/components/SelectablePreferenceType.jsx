import PreferenceType from "./PreferenceType";
import PreferenceTypeTitle from "./PreferenceTypeTitle";

export default function SelectablePreferenceType({ props }) {
  // const [Idx, setIdx] = useState(0);

  return (
    <div>
      <PreferenceTypeTitle props={props} />
      <PreferenceType props={props} />
    </div>
  );
}
