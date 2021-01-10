import { pickBy, omit, startsWith } from "lodash";

import React, { useEffect, useState, useCallback } from "react";

import SubmissionButton from "./SubmissionButton";

import PickTeamRegularView from "./PickTeamRegularView";

import UserType from "../../types/UserType";

type PickTeamRegularProps = {
  week: number;
  userData: UserType;
  selections: (string | number | undefined)[];
  setSelections: (arg0: (string | number | undefined)[]) => void;
  submitSelections: (body: object) => void;
};

const PickTeamRegular = ({
  week,
  userData,
  selections,
  setSelections,
  submitSelections,
}: PickTeamRegularProps) => {
  const submissionCallback = useCallback(() => {
    const body = {
      [`wk${week}A`]: selections[0] || "",
      [`wk${week}B`]: selections[1] || "",
    };
    submitSelections(body);
  }, [selections, week, submitSelections]);

  const [pastSelections, setPastSelections] = useState<
    (string | number | undefined)[]
  >([]);

  useEffect(() => {
    let allPicks = pickBy(
      userData,
      (value, key) => startsWith(key, `wk`) && typeof value === "string"
    );
    let filteredPicks = omit(allPicks, [`wk${week}A`, `wk${week}B`]);
    const teamSelectionsList = Object.values(filteredPicks);
    setPastSelections(teamSelectionsList);
  }, [userData, week]);

  const handleSelection = (team: string): void => {
    let newSelections;
    if (selections.includes(team)) {
      // remove from array
      newSelections = selections.filter((item) => item !== team);
    } else {
      // add to array
      newSelections = selections.concat(team);
    }
    setSelections(newSelections);
  };

  return (
    <div>
      <PickTeamRegularView
        week={week}
        selections={selections}
        pastSelections={pastSelections}
        handleSelection={handleSelection}
      />
      <SubmissionButton selections={selections} onClick={submissionCallback} />
    </div>
  );
};

export default PickTeamRegular;
