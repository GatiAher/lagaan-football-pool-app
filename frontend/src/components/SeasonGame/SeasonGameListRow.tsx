import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TableCell, TableRow } from "@material-ui/core";

import { GameType } from "../../utils/types/game-type";

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

interface SeasonGameListRowProps {
  game: GameType;
}

export const SeasonGameListRow = (props: SeasonGameListRowProps) => {
  const classes = useStyles();
  const visStatusClassName = getTableItemClassName(
    classes,
    props.game.visStatus
  );
  const homeStatusClassName = getTableItemClassName(
    classes,
    props.game.homeStatus
  );

  let visTeamBadge = props.game.visTeam;
  if (props.game.visPts !== -1) visTeamBadge += ` ${props.game.visPts}`;

  let homeTeamBadge = props.game.homeTeam;
  if (props.game.homePts !== -1) homeTeamBadge += ` ${props.game.homePts}`;

  return (
    <TableRow>
      <TableCell>{props.game.week}</TableCell>
      <TableCell>{props.game.startTime}</TableCell>
      <TableCell className={visStatusClassName}>{props.game.visTeam}</TableCell>
      <TableCell className={visStatusClassName}>{props.game.visPts}</TableCell>
      <TableCell>@</TableCell>
      <TableCell className={homeStatusClassName}>
        {props.game.homePts}
      </TableCell>
      <TableCell className={homeStatusClassName}>
        {props.game.homeTeam}
      </TableCell>
    </TableRow>
  );
};
