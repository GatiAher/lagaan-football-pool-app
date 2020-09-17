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

const useStyles = makeStyles({
  neutral: {},
  tie: {
    color: "#a3a5a8",
  },
  win: {
    color: "black",
  },
  lose: {
    color: "#a3a5a8",
  },
});

const getTableItemClassName = (classes: any, status: number): string => {
  if (status === 1) {
    return classes.tie;
  } else if (status === 2) {
    return classes.win;
  } else if (status === 0) {
    return classes.lose;
  } else {
    return classes.neutral;
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
          style={{ right: 0, display: "flex", flexDirection: "row" }}
        >
          <Box m="auto">{props.points}</Box>
          <ArrowLeftIcon />
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
