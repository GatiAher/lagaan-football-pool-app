import React from "react";
import { Box } from "@material-ui/core";
import TeamLogo from "./TeamLogo";

const TeamDisplay = (props: { team: string }) => (
  <Box display="flex" flexDirection="column">
    <Box m="auto">
      <TeamLogo team={props.team} />
    </Box>
    <Box m="auto">{props.team}</Box>
  </Box>
);

export default TeamDisplay;
