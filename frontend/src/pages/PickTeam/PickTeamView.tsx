import React, { ReactNode } from "react";

import Box from "@material-ui/core/Box";

import GameByWeek, {
  TeamDisplayWrapperProps,
} from "../../components/game-by-week";

import WeekPicker from "../../components/week-picker";

type PickTeamViewProps = {
  week: number;
  setWeek: (arg0: number) => void;
  render: (arg0: TeamDisplayWrapperProps) => ReactNode;
};

const PickTeamView = ({ week, setWeek, render }: PickTeamViewProps) => {
  return (
    <Box>
      <WeekPicker week={week} setWeek={setWeek} />
      <GameByWeek render={render} week={week} hasBye />
    </Box>
  );
};

export default PickTeamView;
