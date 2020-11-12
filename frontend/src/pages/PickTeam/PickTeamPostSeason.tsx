import React, { useEffect, useState, useCallback } from "react";

import SubmissionButton from "./SubmissionButton";

import PickTeamPostSeasonView from "./PickTeamPostSeasonView";

type PickTeamPostSeasonProps = {
  week: number;
  selections: (string | number | undefined)[];
  handleSelection: (team: string) => void;
  submitSelections: (body: object) => void;
};

const PickTeamPostSeason = ({
  week,
  selections,
  handleSelection,
  submitSelections,
}: PickTeamPostSeasonProps) => {
  const [letters, setLetters] = useState<string[]>([]);

  useEffect(() => {
    let lettersList: string[] = [];
    if (week === 18) {
      lettersList = ["A", "B", "C", "D", "E", "F"];
    } else if (week === 19) {
      lettersList = ["A", "B", "C", "D"];
    } else if (week === 20) {
      lettersList = ["A", "B"];
    } else if (week === 21) {
      lettersList = ["A"];
    }
    setLetters(lettersList);
  }, [week]);

  const submissionCallback = useCallback(() => {
    const body = {};
    letters.forEach((l, i) => {
      // @ts-ignore
      body[`wk${week}${l}`] = selections[i] || "";
    });
    submitSelections(body);
  }, [selections, week, submitSelections, letters]);

  return (
    <div>
      <PickTeamPostSeasonView
        week={week}
        selections={selections}
        handleSelection={handleSelection}
      />
      <SubmissionButton selections={selections} onClick={submissionCallback} />
    </div>
  );
};

export default PickTeamPostSeason;
