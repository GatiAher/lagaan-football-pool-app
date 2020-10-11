import React from "react";

import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Box from "@material-ui/core/Box";

import TeamLogo from "./TeamLogo";
import TeamType from "../../utils/types/TeamType";

export default ({
  team,
  width,
  showCounts = true,
  border = 1,
}: {
  team: TeamType | undefined;
  width: "xs" | "sm" | "md" | "lg" | "xl";
  showCounts?: boolean;
  border?: number;
}) => {
  let name = undefined;
  let primaryText = "";
  let secondaryText = "";
  if (team != undefined) {
    // set team
    name = team.id;
    // set primaryText
    if (width === "xs") {
      primaryText = team.id;
    } else if (width === "sm") {
      primaryText = `${team.id} ${team.mascotName}`;
    } else {
      primaryText = team.fullName;
    }
    // set secondaryText
    if (showCounts && name != "BYE1" && name != "BYE2") {
      secondaryText = `${team.numOfWin}-${team.numOfLoss}-${team.numOfTie}`;
    }
  }
  return (
    <Box
      border={border}
      p={1}
      m={1}
      width="100%"
      display="flex"
      flexDirection="row"
    >
      <ListItemAvatar>
        <TeamLogo team={name} />
      </ListItemAvatar>
      <ListItemText primary={primaryText} secondary={secondaryText} />
    </Box>
  );
};
