import React from "react";

import Box from "@material-ui/core/Box";

import LinearProgress from "@material-ui/core/LinearProgress";

import WeekPicker from "../../components/week-picker";
import UserType from "../../types/UserType";

import PickTeamRegular from "./PickTeamRegular";
import PickTeamPostSeason from "./PickTeamPostSeason";

type PickTeamViewProps = {
  week: number;
  setWeek: (arg0: number) => void;
  userData: UserType | null;
  selections: (string | number | undefined)[];
  handleSelection: (team: string) => void;
  submitSelections: (body: object) => void;
  isLoadedUser: boolean;
};

const PickTeamView = ({
  week,
  setWeek,
  userData,
  selections,
  handleSelection,
  submitSelections,
  isLoadedUser,
}: PickTeamViewProps) => {
  if (!isLoadedUser || !userData) {
    return <LinearProgress />;
  }

  return (
    <Box>
      <WeekPicker week={week} setWeek={setWeek} />
      {week <= 17 ? (
        <PickTeamRegular
          week={week}
          userData={userData}
          selections={selections}
          handleSelection={handleSelection}
          submitSelections={submitSelections}
        />
      ) : (
        <PickTeamPostSeason
          week={week}
          selections={selections}
          handleSelection={handleSelection}
          submitSelections={submitSelections}
        />
      )}
    </Box>
  );
};

export default PickTeamView;
