import React from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import withWidth from "@material-ui/core/withWidth";
import CircularProgress from "@material-ui/core/CircularProgress";

import SeasonGameListRow from "./SeasonGameListRow";
import GameType from "../../utils/types/GameType";

const SeasonGameList = ({
  games,
  loading,
  width,
}: {
  games: GameType[];
  loading: boolean;
  width: "xs" | "sm" | "md" | "lg" | "xl";
}) => {
  let gridListCols = width === "xs" ? 1 : 2;
  if (loading) {
    return <CircularProgress />;
  }
  return (
    <GridList cellHeight="auto" cols={gridListCols}>
      {games.map((game: GameType) => (
        <GridListTile key={game.id}>
          <SeasonGameListRow game={game} />
        </GridListTile>
      ))}
    </GridList>
  );
};

export default withWidth()(SeasonGameList);
