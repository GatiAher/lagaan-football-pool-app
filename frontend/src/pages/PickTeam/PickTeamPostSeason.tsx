import React, { useEffect, useState, useCallback } from "react";

import SubmissionButton from "./SubmissionButton";

import PickTeamPostSeasonView from "./PickTeamPostSeasonView";

type PickTeamPostSeasonProps = {
  week: number;
  selections: (string | number | undefined)[];
  setSelections: (arg0: (string | number | undefined)[]) => void;
  submitSelections: (body: object) => void;
};

const PickTeamPostSeason = ({
  week,
  selections,
  setSelections,
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
    if (selections.length === 0) {
      setSelections(Array(lettersList.length).fill(""));
    }
  }, [week, setSelections, selections]);

  const submissionCallback = useCallback(() => {
    const body = {};
    letters.forEach((l, i) => {
      // @ts-ignore
      body[`wk${week}${l}`] = selections[i] || "";
    });
    submitSelections(body);
  }, [selections, week, submitSelections, letters]);

  const handleSelection = (team: string, game_idx?: number): void => {
    let newSelections = selections.map((item, idx) => {
      if (idx === game_idx) {
        if (team === item) {
          // remove from array
          return "";
        } else {
          // add to array
          return team;
        }
      }
      return item;
    });
    setSelections(newSelections);
  };

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
