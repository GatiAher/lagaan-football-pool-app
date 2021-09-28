import React from "react";
import withWidth from "@material-ui/core/withWidth";

import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Box from "@material-ui/core/Box";

import TeamLogo from "./TeamLogo";
import TeamType from "../../types/TeamType";

export type TeamDisplayProps = {
  width: "xs" | "sm" | "md" | "lg" | "xl";
  team: TeamType;
};

const TeamDisplay = ({ team, width }: TeamDisplayProps) => {
  let isBye = team.id === "BYE1" || team.id === "BYE2" || team.id === "BYE3" || team.id === "BYE4";
  let name = team.id;
  let secondaryText = isBye
    ? ""
    : `${team.numOfWin}-${team.numOfLoss}-${team.numOfTie}`;

  // set defaults
  let primaryText = "";

  // set based on with
  if (width === "xs") {
    primaryText = team.id;
  } else if (width === "sm" && !isBye) {
    primaryText = `${team.id} ${team.mascotName}`;
  } else {
    primaryText = team.fullName;
  }

  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <ListItemAvatar>
        <TeamLogo team={name} />
      </ListItemAvatar>
      <ListItemText primary={primaryText} secondary={secondaryText} />
    </Box>
  );
};

export default withWidth()(TeamDisplay);
