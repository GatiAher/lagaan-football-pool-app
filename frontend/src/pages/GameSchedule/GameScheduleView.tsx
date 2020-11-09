import React from "react";

import Box from "@material-ui/core/Box";

import TeamDisplayWithStatus from "./TeamDisplayWithStatus";

import TeamDisplay from "../../frontend-components/team-display";

import GameByWeek, {
  TeamDisplayWrapperProps,
} from "../../components/game-by-week";

import WeekPicker from "../../components/week-picker";

type GameScheduleViewProps = {
  week: number;
  setWeek: (arg0: number) => void;
};

const GameScheduleView = ({ week, setWeek }: GameScheduleViewProps) => {
  const TeamDisplayWrapper = (props: TeamDisplayWrapperProps) => {
    return (
      <TeamDisplayWithStatus team={props.team} week={week}>
        <TeamDisplay team={props.team} />
      </TeamDisplayWithStatus>
    );
  };

  return (
    <Box>
      <WeekPicker week={week} setWeek={setWeek} />
      <GameByWeek render={TeamDisplayWrapper} week={week} />
    </Box>
  );
};

export default GameScheduleView;
