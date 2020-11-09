import React from "react";
import Box from "@material-ui/core/Box";

import TeamType from "../../types/TeamType";

import { Typography, useTheme } from "@material-ui/core";

type StatusDisplayProps = {
  team: TeamType;
  week: number;
};

const StatusDisplay = ({ team, week }: StatusDisplayProps) => {
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
    <Box width="40px" color={textColor} bgcolor={bgcolor}>
      <Box mt="25%">
        <Typography align="center" variant="h6">
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

const TeamDisplayWithStatus: React.FC<StatusDisplayProps> = ({
  children,
  team,
  week,
}) => {
  return (
    <Box
      m={1}
      pl={1}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      border={1}
      borderRadius={4}
    >
      {children}
      <StatusDisplay team={team} week={week} />
    </Box>
  );
};

export default TeamDisplayWithStatus;
