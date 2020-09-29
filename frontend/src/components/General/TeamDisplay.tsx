import React from "react";
import withWidth from "@material-ui/core/withWidth";
import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

import TeamLogo from "./TeamLogo";
import { TEAM_ABBR_TO_MEDIUM } from "../../utils/constants/teams";
import { TeamToWinLossMap } from "../../utils/types/TeamType";

interface TeamDisplayProps {
  team: string;
  teamWinLossMap: TeamToWinLossMap;
}

const TeamDisplayWide = (props: TeamDisplayProps) => {
  return (
    <ListItem color="inherit" button={false} style={{ padding: 0 }}>
      <ListItemAvatar>
        <TeamLogo team={props.team} />
      </ListItemAvatar>
      <ListItemText
        primary={TEAM_ABBR_TO_MEDIUM.get(props.team)}
        secondary={
          props.teamWinLossMap[props.team]
            ? `${props.teamWinLossMap[props.team].numOfWin}-${
                props.teamWinLossMap[props.team].numOfLoss
              }`
            : null
        }
      />
    </ListItem>
  );
};

const TeamDisplayTall = (props: TeamDisplayProps) => {
  return (
    <Box display="flex" flexDirection="column">
      <Box m="auto">
        <TeamLogo team={props.team} />
      </Box>
      <Box m="auto">{props.team}</Box>
      {props.teamWinLossMap[props.team] && (
        <Box m="auto">
          <Typography color="inherit">
            {`${props.teamWinLossMap[props.team].numOfWin}-${
              props.teamWinLossMap[props.team].numOfLoss
            }`}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

const TeamDisplay = (props: {
  team: string;
  teamWinLossMap: TeamToWinLossMap;
  width: "xs" | "sm" | "md" | "lg" | "xl";
}) => {
  if (props.width === "xs" || props.width === "sm") {
    return (
      <TeamDisplayTall
        team={props.team}
        teamWinLossMap={props.teamWinLossMap}
      />
    );
  }
  return (
    <TeamDisplayWide team={props.team} teamWinLossMap={props.teamWinLossMap} />
  );
};

export default withWidth()(TeamDisplay);
