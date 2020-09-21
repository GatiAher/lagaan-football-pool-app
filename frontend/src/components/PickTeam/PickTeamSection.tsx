import React from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

import PickTeamSectionRow from "./PickTeamSectionRow";
import GameType from "../../utils/types/GameType";
import { TeamToWinLossMap } from "../../utils/types/TeamType";

const PickTeamSection = ({
  games,
  teamWinLossMap,
  loading,
  savedSelections,
  handleTeamSelect,
  isTeamSelected,
  isTwoTeamSelected,
}: {
  games: GameType[];
  teamWinLossMap: TeamToWinLossMap;
  loading: boolean;
  savedSelections: any;
  handleTeamSelect: (team: string) => void;
  isTeamSelected: (team: string) => boolean;
  isTwoTeamSelected: () => boolean;
}) => {
  // Show loading message
  if (loading) return <p>Game table is loading...</p>;
  return (
    <GridList cellHeight="auto" cols={1}>
      {games.map((game: GameType) => (
        <GridListTile key={game.game_id}>
          <PickTeamSectionRow
            key={game.game_id}
            game={game}
            savedSelections={savedSelections}
            teamWinLossMap={teamWinLossMap}
            handleTeamSelect={handleTeamSelect}
            isTeamSelected={isTeamSelected}
            isTwoTeamSelected={isTwoTeamSelected}
          />
        </GridListTile>
      ))}
    </GridList>
  );
};

export default PickTeamSection;
