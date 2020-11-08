import React, { ReactNode } from "react";

import List from "@material-ui/core/List";

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
  return (
    <List>
      {games.map((game) => {
        return (
          <GameTile
            game={game}
            team1={teamMap.get(game.visTeam)}
            team2={teamMap.get(game.homeTeam)}
            render={render}
          />
        );
      })}
      {hasBye && week < BYE_WEEK_END && week > BYE_WEEK_START && (
        <GameTile
          isPickWindowOpenDefault={isPickWindowOpenDefault}
          team1={teamMap.get("BYE1")}
          team2={teamMap.get("BYE2")}
          render={render}
        />
      )}
    </List>
  );
};

export default GameByWeekView;
