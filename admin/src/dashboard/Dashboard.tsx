import React, { useState } from "react";

import Box from "@material-ui/core/Box";

import TeamDisplayWithStatus from "./WeekDisplay/TeamDisplayWithStatus";

import WeekDisplay, {
  TeamDisplayWrapperProps,
} from "./WeekDisplay/WeekDisplay";

import getCurrentWeek from "./WeekDisplay/utils-front/getCurrentWeek";

const SeasonGame = () => {
  const [week, setWeek] = useState(getCurrentWeek());

  const TeamDisplayWrapper = (props: TeamDisplayWrapperProps) => {
    return <TeamDisplayWithStatus team={props.team} week={week} />;
  };

  return (
    <Box>
      <WeekDisplay render={TeamDisplayWrapper} week={week} setWeek={setWeek} />
    </Box>
  );
};

export default SeasonGame;
