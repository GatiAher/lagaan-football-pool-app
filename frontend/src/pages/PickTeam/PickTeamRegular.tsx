import { pickBy, omit, startsWith } from "lodash";

import React, { useEffect, useState, useCallback } from "react";

import SubmissionButton from "./SubmissionButton";

import PickTeamRegularView from "./PickTeamRegularView";

import UserType from "../../types/UserType";

type PickTeamRegularProps = {
  week: number;
  userData: UserType;
  selections: (string | number | undefined)[];
  handleSelection: (team: string) => void;
  submitSelections: (body: object) => void;
};

const PickTeamRegular = ({
  week,
  userData,
  selections,
  handleSelection,
  submitSelections,
}: PickTeamRegularProps) => {
  const submissionCallback = useCallback(() => {
    const body = {
      [`wk${week}A`]: selections[0] || "",
      [`wk${week}B`]: selections[1] || "",
    };
    submitSelections(body);
  }, [selections]);

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
  }, [userData]);

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
