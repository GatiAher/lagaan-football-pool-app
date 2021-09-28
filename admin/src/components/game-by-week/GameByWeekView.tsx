import React, { ReactNode } from "react";

import List from "@material-ui/core/List";
import Box from "@material-ui/core/Box";

import GameTile from "./GameTile";

import GameType from "../../types/GameType";
import TeamType from "../../types/TeamType";
import { TeamDisplayWrapperProps } from "./TeamDisplayWrapperProps";

import { BYE_WEEK_START, BYE_WEEK_END } from "./bye-week";

export interface WeekDisplayViewProps {
  hasBye?: boolean;
  isPickWindowOpenDefault?: boolean;
  week: number;
  games: GameType[];
  teamMap: Map<string, TeamType>;
  render: (props: TeamDisplayWrapperProps) => ReactNode;
}

const GameByWeekView = ({
  hasBye,
  isPickWindowOpenDefault,
  week,
  games,
  teamMap,
  render,
}: WeekDisplayViewProps) => {
  if (games.length === 0) {
    return <Box pl={3}>No games listed at this time.</Box>;
  }
  return (
    <List>
      {games.map((game, game_idx) => {
        return (
          <GameTile
            game={game}
            game_idx={game_idx}
            key={game.id}
            team1={teamMap.get(game.visTeam)}
            team2={teamMap.get(game.homeTeam)}
            render={render}
          />
        );
      })}
      {hasBye && week <= BYE_WEEK_END && week >= BYE_WEEK_START && (
        <GameTile
          key="bye"
          isPickWindowOpenDefault={isPickWindowOpenDefault}
          team1={teamMap.get("BYE1")}
          team2={teamMap.get("BYE2")}
          render={render}
        />
      )}
      {hasBye && week <= BYE_WEEK_END && week >= BYE_WEEK_START && (
        <GameTile
          key="bye"
          isPickWindowOpenDefault={isPickWindowOpenDefault}
          team1={teamMap.get("BYE3")}
          team2={teamMap.get("BYE4")}
          render={render}
        />
      )}
    </List>
  );
};

export default GameByWeekView;
