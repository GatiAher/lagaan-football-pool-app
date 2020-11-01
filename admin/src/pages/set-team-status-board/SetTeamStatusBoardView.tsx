import React from "react";

import Container from "@material-ui/core/Container";

import TeamDisplay from "./TeamDisplayWithDropdownStatus";

import GameByWeek, {
  TeamDisplayWrapperProps,
} from "../../components/game-by-week";

import WeekPicker from "../../components/week-picker";

type SetTeamStatusBoardViewProps = {
  week: number;
  setWeek: (arg0: number) => void;
};

const SetTeamStatusBoardView = ({
  week,
  setWeek,
}: SetTeamStatusBoardViewProps) => {
  const TeamDisplayWrapper = (props: TeamDisplayWrapperProps) => {
    return <TeamDisplay team={props.team} week={week} />;
  };
  return (
    <Container maxWidth="md">
      <WeekPicker week={week} setWeek={setWeek} />
      <GameByWeek render={TeamDisplayWrapper} week={week} />
    </Container>
  );
};

export default SetTeamStatusBoardView;
