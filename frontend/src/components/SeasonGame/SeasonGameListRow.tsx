import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, TableCell, TableRow } from "@material-ui/core";
import { dateParser } from "../../utils/date-parser";
import { GameType } from "../../utils/types/game-type";
import TeamLogo from "../TeamLogo/TeamLogo";

const useStyles = makeStyles({
  neutral: {},
  tie: {
    color: "#686868",
  },
  win: {
    color: "#05c947",
  },
  lose: {
    color: "#d31212",
  },
});

const getTableItemClassName = (styles: any, status: number): string => {
  if (status === 1) {
    return styles.tie;
  } else if (status === 2) {
    return styles.win;
  } else if (status === 0) {
    return styles.lose;
  } else {
    return styles.neutral;
  }
};

const TeamBadge = (props: { team: string }) => (
  <Box display="flex" flexDirection="column">
    <Box m="auto">
      <TeamLogo team={props.team} />
    </Box>
    <Box m="auto">{props.team}</Box>
  </Box>
);

const DateBadge = (props: { day?: string; date?: string; time?: string }) => (
  <Box display="flex" flexDirection="column">
    <Box m="auto">{`${props.day} ${props.date}`}</Box>
    <Box m="auto">{props.time}</Box>
  </Box>
);

const PointsBadge = (props: { points: number }) => (
  <Box m="auto">
    <h3>{props.points}</h3>
  </Box>
);

export const SeasonGameListRow = (props: { game: GameType }) => {
  const classes = useStyles();
  const visStatusClassName = getTableItemClassName(
    classes,
    props.game.visStatus
  );
  const homeStatusClassName = getTableItemClassName(
    classes,
    props.game.homeStatus
  );

  const dateObj = dateParser(props.game.startTime);
  const dateDisplay = `${dateObj.day} ${dateObj.date} ${dateObj.time}`;

  return (
    <TableRow>
      <TableCell>
        <DateBadge day={dateObj.day} date={dateObj.date} time={dateObj.time} />
      </TableCell>
      <TableCell className={visStatusClassName}>
        <TeamBadge team={props.game.visTeam} />
      </TableCell>
      <TableCell className={visStatusClassName}>
        <PointsBadge points={props.game.homePts} />
      </TableCell>
      <TableCell>@</TableCell>
      <TableCell className={homeStatusClassName}>
        <PointsBadge points={props.game.homePts} />
      </TableCell>
      <TableCell className={homeStatusClassName}>
        <TeamBadge team={props.game.homeTeam} />
      </TableCell>
    </TableRow>
  );
};
