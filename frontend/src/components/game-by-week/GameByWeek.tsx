import React, { ReactNode, useEffect, useState } from "react";

import LinearProgress from "@material-ui/core/LinearProgress";

import GameByWeekView from "./GameByWeekView";

import api from "../../api";
import { useCurrentWeek } from "../../contexts/CurrentWeekContext";

import GameType from "../../types/GameType";
import TeamType from "../../types/TeamType";
import { TeamDisplayWrapperProps } from "./TeamDisplayWrapperProps";

export interface WeekDisplayProps {
  week: number;
  hasBye?: boolean;
  render: (props: TeamDisplayWrapperProps) => ReactNode;
}

const GameByWeek = ({ week, hasBye, render }: WeekDisplayProps) => {
  const { currentWeek } = useCurrentWeek();
  const chosenWeek = week ? week : currentWeek;

  const [games, setGames] = useState<GameType[]>([]);
  const [isLoadedGame, setIsLoadedGames] = useState(false);

  const [teamMap, setTeamMap] = useState(new Map<string, TeamType>());
  const [isLoadedTeamMap, setIsLoadedTeamMap] = useState(false);

  // Fetch on initial render
  useEffect(() => {
    setIsLoadedGames(false);
    setIsLoadedTeamMap(false);
    api.game.fetchGamesByWeek(week).then((data) => {
      setGames(data);
      setIsLoadedGames(true);
    });
    api.team.fetchTeamMap().then((data) => {
      setTeamMap(data);
      setIsLoadedTeamMap(true);
    });
  }, [week]);

  if (!isLoadedGame || !isLoadedTeamMap) {
    return <LinearProgress />;
  }

  return (
    <GameByWeekView
      hasBye={hasBye}
      isPickWindowOpenDefault={chosenWeek >= currentWeek}
      week={chosenWeek}
      games={games}
      teamMap={teamMap}
      render={render}
    />
  );
};

export default GameByWeek;
