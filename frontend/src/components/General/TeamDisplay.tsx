import React from "react";

import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Box from "@material-ui/core/Box";

import TeamLogo from "./TeamLogo";
import TeamType from "../../utils/types/TeamType";

export default (props: {
  team: TeamType | undefined;
  width: "xs" | "sm" | "md" | "lg" | "xl";
}) => {
  let team = undefined;
  let primaryText = "";
  let secondaryText = "";
  if (props.team != undefined) {
    // set team
    team = props.team.id;
    // set primaryText
    if (props.width === "xs") {
      primaryText = props.team.id;
    } else if (props.width === "sm" || props.width === "md") {
      primaryText = `${props.team.id} ${props.team.mascotName}`;
    } else {
      primaryText = props.team.fullName;
    }
    // set secondaryText
    if (props.team.id !== "BYE1" && props.team.id !== "BYE2") {
      secondaryText = `${props.team.numOfWin}-${props.team.numOfLoss}-${props.team.numOfTie}`;
    }
  }
  return (
    <Box border={1} p={1} m={1} width="100%" display="flex" flexDirection="row">
      <ListItemAvatar>
        <TeamLogo team={team} />
      </ListItemAvatar>
      <ListItemText primary={primaryText} secondary={secondaryText} />
    </Box>
  );
};
