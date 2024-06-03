import { useState } from "react";
import PreferenceType from "./PreferenceType";
import PreferenceTypeTitle from "./PreferenceTypeTitle";
import DeatilsOnPreference from "./DetailsOnPreference";

export default function SelectablePreferenceType({ props }) {
  const [nextPreferenceType, setNextPreferenceType] = useState(0);
  const [showDetails, setShowDeatils] = useState(false);
  const [showTest, setShowtest] = useState(""); // sets the search type i.e like mexican resturant - see comment in prefereceType component

  function handleClick() {
    if (nextPreferenceType + 1 >= props.PreferenceType.length) {
      setNextPreferenceType(0);
    } else {
      setNextPreferenceType(nextPreferenceType + 1);
    }
  }

  function handleShowDetails() {
    console.log("clicked");
    setShowDeatils(true);
  }

  return (
    <div className="bg-cyan-700 p-4 flex items-center flex-col">
      <PreferenceTypeTitle
        nextPreferenceType={nextPreferenceType}
        props={props}
      />
      {showDetails ? (
        <DeatilsOnPreference
          showTest={showTest}
          setShowDeatils={setShowDeatils}
        />
      ) : (
        <PreferenceType
          nextPreferenceType={nextPreferenceType}
          props={props}
          handleShowDetails={handleShowDetails}
          setShowTest={setShowtest}
        />
      )}
      {!showDetails ? (
        <button onClick={handleClick} className="mt-5 hover:cursor-pointer">
          Select Next Preference
        </button>
      ) : (
        <div> </div>
      )}
    </div>
  );
}
