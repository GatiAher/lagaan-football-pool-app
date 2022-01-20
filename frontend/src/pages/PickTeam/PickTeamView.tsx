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
  selections: (string | number | boolean | undefined)[];
  setSelections: (arg0: (string | number | boolean | undefined)[]) => void;
  submitSelections: (body: object) => void;
  isLoadedUser: boolean;
};

const PickTeamView = ({
  week,
  setWeek,
  userData,
  selections,
  setSelections,
  submitSelections,
  isLoadedUser,
}: PickTeamViewProps) => {
  if (!isLoadedUser || !userData) {
    return <LinearProgress />;
  }

  return (
    <Box>
      <WeekPicker week={week} setWeek={setWeek} />
      {week <= 18 && (
        <PickTeamRegular
          week={week}
          userData={userData}
          selections={selections}
          setSelections={setSelections}
          submitSelections={submitSelections}
        />
      )}
      {week >= 19 && week <= 22 && (
        <PickTeamPostSeason
          week={week}
          selections={selections}
          setSelections={setSelections}
          submitSelections={submitSelections}
        />
      )}
      {week > 22 && <Box>Season is over.</Box>}
    </Box>
  );
};

export default PickTeamView;
