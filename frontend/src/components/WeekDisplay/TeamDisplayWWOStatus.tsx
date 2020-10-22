import React from "react";

import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Box from "@material-ui/core/Box";

import TeamLogo from "./TeamLogo";
import TeamType from "../../utils/types/TeamType";
import { Typography, useTheme } from "@material-ui/core";

const StatusDisplay = ({ team, week }: { team: TeamType; week: number }) => {
  const theme = useTheme();
  // @ts-ignore
  const status = team[`wk${week}`];
  let text = "";
  let textColor = "";
  let bgcolor = "";
  if (status === "win") {
    text = "W";
    textColor = theme.palette.grey[100];
    bgcolor = theme.palette.success.dark;
  } else if (status === "loss") {
    text = "L";
    textColor = theme.palette.error.dark;
    bgcolor = theme.palette.error.light;
  } else if (status === "tie") {
    text = "T";
    textColor = theme.palette.grey.A700;
    bgcolor = theme.palette.divider;
  }
  return (
    <Box width="40px" height="100%" color={textColor} bgcolor={bgcolor}>
      <Box my="50%">
        <Typography align="center" variant="h6">
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

export interface TeamDisplayProps {
  team: TeamType | undefined;
  width: "xs" | "sm" | "md" | "lg" | "xl";
  showCounts?: boolean;
  week?: number;
  border?: number;
}

export default ({
  team,
  width,
  showCounts = true,
  week = 0,
  border = 1,
}: TeamDisplayProps) => {
  let name = undefined;
  let primaryText = "";
  let secondaryText = "";
  if (team === undefined) {
    return <Box> </Box>;
  }

  // set padding
  let xpadding = 2;

  // set team
  name = team.id;
  // set primaryText
  if (width === "xs") {
    primaryText = team.id;
    xpadding = 1;
  } else if (width === "sm" && name !== "BYE1" && name !== "BYE2") {
    primaryText = `${team.id} ${team.mascotName}`;
  } else {
    primaryText = team.fullName;
  }
  // set secondaryText
  if (showCounts && name !== "BYE1" && name !== "BYE2") {
    secondaryText = `${team.numOfWin}-${team.numOfLoss}-${team.numOfTie}`;
  }

  return (
    <Box border={border} m={1} width="100%" display="flex" flexDirection="row">
      <Box
        p={1}
        px={xpadding}
        display="flex"
        flexDirection="row"
        alignItems="center"
        flexGrow={1}
      >
        <ListItemAvatar>
          <TeamLogo team={name} />
        </ListItemAvatar>
        <ListItemText primary={primaryText} secondary={secondaryText} />
      </Box>
      {week !== 0 && <StatusDisplay team={team} week={week} />}
    </Box>
  );
};
