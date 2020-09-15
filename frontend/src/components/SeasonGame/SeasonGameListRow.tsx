import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, TableCell, TableRow } from "@material-ui/core";
import { GameType } from "../../utils/types/game-type";
import TeamDisplay from "../Display/TeamDisplay";
import DateDisplay from "../Display/DateDisplay";

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

const PointsDisplay = (props: { points: number }) => (
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
  return (
    <TableRow>
      <TableCell>
        <DateDisplay miliseconds={props.game.startTime} />
      </TableCell>
      <TableCell className={visStatusClassName}>
        <TeamDisplay team={props.game.visTeam} />
      </TableCell>
      <TableCell className={visStatusClassName}>
        <PointsDisplay points={props.game.homePts} />
      </TableCell>
      <TableCell>@</TableCell>
      <TableCell className={homeStatusClassName}>
        <PointsDisplay points={props.game.homePts} />
      </TableCell>
      <TableCell className={homeStatusClassName}>
        <TeamDisplay team={props.game.homeTeam} />
      </TableCell>
    </TableRow>
  );
};
