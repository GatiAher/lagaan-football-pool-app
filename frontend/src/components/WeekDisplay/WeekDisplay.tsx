import React, { ReactNode, useEffect, useState } from "react";

import LinearProgress from "@material-ui/core/LinearProgress";

import Box from "@material-ui/core/Box";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

import getCurrentWeek from "../../utils/getCurrentWeek";
import WeekPicker from "./WeekPicker";

import TileTag from "./TileTag";
import processGameStartTime from "./processGameStartTime";

import fetchGames from "../../utils/api-handlers/fetchGames";
import GameType from "../../utils/types/GameType";

import fetchTeamMap from "../../utils/api-handlers/fetchTeamMap";
import TeamType from "../../utils/types/TeamType";

import { BYE_WEEK_START, BYE_WEEK_END } from "../../utils/constants/bye-week";

type IsFunction<T> = T extends (...args: any[]) => any ? T : never;

const isFunction = <T extends {}>(value: T): value is IsFunction<T> =>
  typeof value === "function";

export interface TeamDisplayWrapperProps {
  team: TeamType;
  isPickWindowOpen: boolean;
}

export interface WeekDisplayProps {
  render: (props: TeamDisplayWrapperProps) => ReactNode;
  week?: number;
  setWeek?: (arg0: number) => void;
  hasBye?: boolean;
}

const WeekDisplay = (props: WeekDisplayProps) => {
  const week = props.week ? props.week : getCurrentWeek();

  const { render } = props;
  if (!isFunction(render)) {
    throw new Error("render prop is mandatory and needs to be a function!");
  }

  const [games, setGames] = useState<GameType[]>([]);
  const [isLoadedGame, setIsLoadedGames] = useState(false);

  const [teamMap, setTeamMap] = useState(new Map<string, TeamType>());
  const [isLoadedTeamMap, setIsLoadedTeamMap] = useState(false);
  const [teamBye1, setTeamBye1] = useState<TeamType | null>(null);
  const [teamBye2, setTeamBye2] = useState<TeamType | null>(null);

  // Fetch on initial render
  useEffect(() => {
    setIsLoadedGames(false);
    setIsLoadedTeamMap(false);
    fetchGames(week, (data) => {
      setGames(data);
      setIsLoadedGames(true);
    });
    fetchTeamMap((data) => {
      setTeamMap(data);
      setIsLoadedTeamMap(true);
      if (props.hasBye && data.get("BYE1") !== undefined) {
        setTeamBye1(data.get("BYE1"));
      }
      if (props.hasBye && data.get("BYE2") !== undefined) {
        setTeamBye2(data.get("BYE2"));
      }
    });
  }, [week]);

  if (!isLoadedGame || !isLoadedTeamMap) {
    return (
      <Box>
        {props.setWeek !== undefined && (
          <WeekPicker week={week} setWeek={props.setWeek} />
        )}
        <LinearProgress />;
      </Box>
    );
  }

  const isByePickWindowOpen = week >= getCurrentWeek();
  const byePickWindowString = isByePickWindowOpen
    ? "open until Tue morning"
    : `CLOSED`;

  return (
    <Box>
      {props.setWeek !== undefined && (
        <WeekPicker week={week} setWeek={props.setWeek} />
      )}
      <GridList cellHeight={"auto"} cols={1}>
        {games.map((game) => {
          const {
            gameStartTimeString,
            gamePickWindowString,
            gameIsPickWindowOpen,
          } = processGameStartTime(game.startTime);
          const visTeam = teamMap.get(game.visTeam);
          const homeTeam = teamMap.get(game.homeTeam);
          // Handle no teams error
          if (visTeam === undefined || homeTeam === undefined) {
            return (
              <GridListTile key={game.id}>
                <TileTag
                  firstString={`Team ${game.visTeam} or ${game.homeTeam} is undefined`}
                  secondString=""
                />
              </GridListTile>
            );
          }
          // Actual game display
          return (
            <GridListTile key={game.id}>
              <TileTag
                firstString={gameStartTimeString}
                secondString={gamePickWindowString}
              />
              <Box display="flex" flexDirection="row">
                <Box my={1} width="100%">
                  {render({
                    team: visTeam,
                    isPickWindowOpen: gameIsPickWindowOpen,
                  })}
                </Box>
                <Box m="auto" p={1}>
                  {"@"}
                </Box>
                <Box my={1} width="100%">
                  {render({
                    team: homeTeam,
                    isPickWindowOpen: gameIsPickWindowOpen,
                  })}
                </Box>
              </Box>
            </GridListTile>
          );
        })}
        {props.hasBye &&
          teamBye1 &&
          teamBye2 &&
          week < BYE_WEEK_END &&
          week > BYE_WEEK_START && (
            <GridListTile key="BYE">
              <TileTag
                firstString="Bye Choice"
                secondString={byePickWindowString}
              />
              <Box display="flex" flexDirection="row">
                <Box my={1} width="100%">
                  {render({
                    team: teamBye1,
                    isPickWindowOpen: isByePickWindowOpen,
                  })}
                </Box>
                <Box m="auto" p={1}></Box>
                <Box my={1} width="100%">
                  {render({
                    team: teamBye2,
                    isPickWindowOpen: isByePickWindowOpen,
                  })}
                </Box>
              </Box>
            </GridListTile>
          )}
      </GridList>
    </Box>
  );
};

export default WeekDisplay;
