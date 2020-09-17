import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles({
  neutral: {},
  lose: {
    color: "#a3a5a8",
  },
});

const getTableItemClassName = (classes: any, status: number): string => {
  if (status === 2 || status === -1) {
    return classes.neutral;
  } else {
    return classes.lose;
  }
};

const TeamListItem = (props: {
  team: string;
  points: number;
  status: number;
  startTime: number;
  classes: any;
}) => {
  const classStatusName = getTableItemClassName(props.classes, props.status);
  return (
    <ListItem className={classStatusName} button={false} style={{ padding: 0 }}>
      <ListItemAvatar>
        <TeamLogo team={props.team} />
      </ListItemAvatar>
      <ListItemText primary={props.team} />
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
          <Typography className={classStatusName}>{props.points}</Typography>
          <ArrowLeftIcon className={classStatusName} />
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

export const SeasonGameListRow = (props: { game: GameType }) => {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      bgcolor="white"
      py={4}
      pl={3}
    >
      <Box borderRight={1} width="60%" p={0}>
        <List dense={true} style={{ padding: 0, margin: 0 }}>
          <TeamListItem
            team={props.game.visTeam}
            points={props.game.visPts}
            status={props.game.visStatus}
            startTime={props.game.startTime}
            classes={classes}
          />
          <TeamListItem
            team={props.game.homeTeam}
            points={props.game.homePts}
            status={props.game.homeStatus}
            startTime={props.game.startTime}
            classes={classes}
          />
        </List>
      </Box>
      <Box m="auto">
        <DateDisplay miliseconds={props.game.startTime} />
      </Box>
    </Box>
  );
};
