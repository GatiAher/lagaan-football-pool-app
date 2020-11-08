import React from "react";

import Box from "@material-ui/core/Box";

import LinearProgress from "@material-ui/core/LinearProgress";

import UserNotRegistered from "../../frontend-components/UserNotRegistered";

import SelectionButton from "./SelectionButton";

import GameByWeek, {
  TeamDisplayWrapperProps,
} from "../../components/game-by-week";

import WeekPicker from "../../components/week-picker";

type PickTeamViewProps = {
  week: number;
  setWeek: (arg0: number) => void;
  savedSelections: (string | number | undefined)[];
  handleTeamSelect: (team: string) => void;
  isTeamSelected: (team: string) => boolean;
  areTwoTeamsSelected: () => boolean;
  isRegisteredUser: boolean;
  isLoadedUser: boolean;
};

const PickTeamView = ({
  week,
  setWeek,
  savedSelections,
  handleTeamSelect,
  isTeamSelected,
  areTwoTeamsSelected,
  isRegisteredUser,
  isLoadedUser,
}: PickTeamViewProps) => {
  if (!isRegisteredUser) {
    return <UserNotRegistered />;
  }

  if (!isLoadedUser) {
    return <LinearProgress />;
  }
  const TeamDisplayWrapper = (props: TeamDisplayWrapperProps) => {
    return (
      <SelectionButton
        team={props.team}
        disabled={!props.isPickWindowOpen}
        savedSelections={savedSelections}
        handleTeamSelect={handleTeamSelect}
        isTeamSelected={isTeamSelected}
        areTwoTeamsSelected={areTwoTeamsSelected}
      />
    );
  };

  return (
    <Box>
      <WeekPicker week={week} setWeek={setWeek} />
      <GameByWeek render={TeamDisplayWrapper} week={week} hasBye />
    </Box>
  );
};

export default PickTeamView;
