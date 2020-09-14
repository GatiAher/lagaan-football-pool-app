import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@material-ui/core";
import { SeasonGameListRow } from "./SeasonGameListRow";
import { GameType } from "../../utils/types/game-type";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

interface SeasonGameListProps {
  games: GameType[];
  loading: boolean;
}

export const SeasonGameList = (props: SeasonGameListProps) => {
  const classes = useStyles();
  // Show loading message
  if (props.loading) return <p>Game table is loading...</p>;
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          {props.games.length > 0 ? (
            props.games.map((game: GameType, idx) => (
              <SeasonGameListRow key={game.game_id} game={game} />
            ))
          ) : (
            <TableRow>
              <TableCell style={{ textAlign: "center" }} colSpan={5}>
                There are no games to show.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
