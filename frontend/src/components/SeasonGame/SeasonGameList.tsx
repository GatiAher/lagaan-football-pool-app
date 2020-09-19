import React from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import withWidth from "@material-ui/core/withWidth";
import { SeasonGameListRow } from "./SeasonGameListRow";
import { GameType } from "../../utils/types/game-type";

interface SeasonGameListProps {
  games: GameType[];
  loading: boolean;
  width: "xs" | "sm" | "md" | "lg" | "xl";
}

function SeasonGameList(props: SeasonGameListProps): JSX.Element {
  let gridListCols = props.width === "xs" ? 1 : 2;
  if (props.loading) return <p>Game table is loading...</p>;
  return (
    <GridList cellHeight="auto" cols={gridListCols}>
      {props.games.map((game: GameType) => (
        <GridListTile key={game.game_id}>
          <SeasonGameListRow game={game} />
        </GridListTile>
      ))}
    </GridList>
  );
}

export default withWidth()(SeasonGameList);
