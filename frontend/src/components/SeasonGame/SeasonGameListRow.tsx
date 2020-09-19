import React from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import { GameType } from "../../utils/types/game-type";
import DateDisplay from "../Display/DateDisplay";
import TeamLogo from "../Display/TeamLogo";
import Typography from "@material-ui/core/Typography";

const TeamListStatusIndicatorIcon = (props: { status: number }) => {
  const theme = useTheme();
  const colorArrow =
    props.status !== 2
      ? theme.palette.background.default
      : theme.palette.common.black;
  return <ArrowLeftIcon style={{ color: colorArrow }} />;
};

const TeamListItem = (props: {
  team: string;
  points: number;
  status: number;
}) => {
  const colorText =
    props.status === 2 || props.status === -1 ? "textPrimary" : "textSecondary";
  return (
    <ListItem color={colorText} button={false} style={{ padding: 0 }}>
      <ListItemAvatar>
        <TeamLogo team={props.team} />
      </ListItemAvatar>
      <ListItemText>
        <Typography color={colorText}>{props.team}</Typography>
      </ListItemText>
      {props.status !== -1 && (
        <ListItemSecondaryAction
          style={{
            right: 0,
            display: "flex",
            flexDirection: "row",
            margin: 0,
            padding: 0,
          }}
        >
          <Typography color={colorText}>{props.points}</Typography>
          <TeamListStatusIndicatorIcon status={props.status} />
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

export const SeasonGameListRow = (props: { game: GameType }) => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      bgcolor={theme.palette.background.default}
      py={4}
      pl={3}
    >
      <Box borderRight={1} color={theme.palette.grey.A200} width="60%" p={0}>
        <List dense={true} style={{ padding: 0, margin: 0 }}>
          <TeamListItem
            team={props.game.visTeam}
            points={props.game.visPts}
            status={props.game.visStatus}
          />
          <TeamListItem
            team={props.game.homeTeam}
            points={props.game.homePts}
            status={props.game.homeStatus}
          />
        </List>
      </Box>
      <Box m="auto">
        <DateDisplay miliseconds={props.game.startTime} />
      </Box>
    </Box>
  );
};
