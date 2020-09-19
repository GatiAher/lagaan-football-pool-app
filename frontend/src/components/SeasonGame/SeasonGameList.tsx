import React from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import withWidth from "@material-ui/core/withWidth";
import SeasonGameListRow from "./SeasonGameListRow";
import { GameType } from "../../utils/types/game-type";

function SeasonGameList({
  games,
  loading,
  width,
}: {
  games: GameType[];
  loading: boolean;
  width: "xs" | "sm" | "md" | "lg" | "xl";
}): JSX.Element {
  let gridListCols = width === "xs" ? 1 : 2;
  if (loading) return <p>Game table is loading...</p>;
  return (
    <GridList cellHeight="auto" cols={gridListCols}>
      {games.map((game: GameType) => (
        <GridListTile key={game.game_id}>
          <SeasonGameListRow game={game} />
        </GridListTile>
      ))}
    </GridList>
  );
}

export default withWidth()(SeasonGameList);
