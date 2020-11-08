import React, { useState } from "react";

import Box from "@material-ui/core/Box";

import TeamDisplayWithStatus from "./TeamDisplayWithStatus";

import TeamDisplay from "../../components/WeekDisplay/TeamDisplay";
import WeekDisplay, {
  TeamDisplayWrapperProps,
} from "../../components/WeekDisplay/WeekDisplay";

import getCurrentWeek from "../../utils/getCurrentWeek";

const SeasonGame = () => {
  const [week, setWeek] = useState(getCurrentWeek());

  const TeamDisplayWrapper = (props: TeamDisplayWrapperProps) => {
    return (
      <TeamDisplayWithStatus team={props.team} week={week}>
        <TeamDisplay team={props.team} />
      </TeamDisplayWithStatus>
    );
  };

  return (
    <Box>
      <WeekDisplay render={TeamDisplayWrapper} week={week} setWeek={setWeek} />
    </Box>
  );
};

export default SeasonGame;
