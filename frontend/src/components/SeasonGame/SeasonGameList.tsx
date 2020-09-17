import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import withWidth from "@material-ui/core/withWidth";
import Box from "@material-ui/core/Box";
import { SeasonGameListRow } from "./SeasonGameListRow";
import { GameType } from "../../utils/types/game-type";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    overflow: "hidden",
  },
});

interface SeasonGameListProps {
  games: GameType[];
  loading: boolean;
  width: "xs" | "sm" | "md" | "lg" | "xl";
}

function SeasonGameList(props: SeasonGameListProps): JSX.Element {
  const classes = useStyles();
  let gridListCols = props.width === "xs" ? 1 : 2;
  if (props.loading) return <p>Game table is loading...</p>;
  return (
    <Box className={classes.root}>
      <GridList
        cellHeight="auto"
        cols={gridListCols}
        style={{ overflow: "hidden" }}
      >
        <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
          <ListSubheader component="div">WEEK</ListSubheader>
        </GridListTile>
        {props.games.map((game: GameType) => (
          <GridListTile key={game.game_id}>
            <SeasonGameListRow game={game} />
          </GridListTile>
        ))}
      </GridList>
    </Box>
  );
}

export default withWidth()(SeasonGameList);
