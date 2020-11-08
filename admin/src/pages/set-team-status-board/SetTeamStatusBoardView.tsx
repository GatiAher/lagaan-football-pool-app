import React from "react";

import Container from "@material-ui/core/Container";

import TeamDisplayWithDropdownStatus from "./TeamDisplayWithDropdownStatus";

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
    return (
      <TeamDisplayWithDropdownStatus
        game={props.game}
        team={props.team}
        week={week}
        state={props.state}
        setState={props.setState}
        setStateOpp={props.setStateOpp}
      />
    );
  };
  return (
    <Container maxWidth="md">
      <WeekPicker week={week} setWeek={setWeek} />
      <GameByWeek render={TeamDisplayWrapper} week={week} />
    </Container>
  );
};

export default SetTeamStatusBoardView;
