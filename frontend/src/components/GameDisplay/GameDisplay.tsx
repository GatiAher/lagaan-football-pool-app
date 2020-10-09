import React, { useEffect, useState } from "react";
import withWidth from "@material-ui/core/withWidth";

import LinearProgress from "@material-ui/core/LinearProgress";

import Box from "@material-ui/core/Box";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

import getCurrentWeek from "../../utils/getCurrentWeek";
import WeekPicker from "../General/WeekPicker";

import fetchGames from "../../utils/api-handlers/fetchGames";
import GameType from "../../utils/types/GameType";

import fetchTeamMap from "../../utils/api-handlers/fetchTeamMap";
import TeamType from "../../utils/types/TeamType";

import TeamDisplay from "../General/TeamDisplay";
import DateTag from "../General/DateTag";
import dateParser from "../../utils/dateParser";

const SeasonGame = (props: { width: "xs" | "sm" | "md" | "lg" | "xl" }) => {
  const [week, setWeek] = useState(getCurrentWeek());

  const [games, setGames] = useState<GameType[]>([]);
  const [isLoadedGame, setIsLoadedGames] = useState(false);

  const [teamMap, setTeamMap] = useState(new Map<string, TeamType>());
  const [isLoadedTeamMap, setIsLoadedTeamMap] = useState(false);

  const width = props.width;

  // Fetch on initial render
  useEffect(() => {
    fetchGames(week, (data) => {
      setGames(data);
      setIsLoadedGames(true);
    });
    fetchTeamMap((data) => {
      setTeamMap(data);
      setIsLoadedTeamMap(true);
    });
  }, [week]);

  return (
    <Box>
      <WeekPicker week={week} setWeek={setWeek} />
      <div>
        {isLoadedGame && isLoadedTeamMap ? (
          <GridList cellHeight={"auto"} cols={1}>
            {games.map((game) => {
              const { dateString, isOver } = dateParser(game.startTime);
              const statusString = isOver ? "CLOSED" : "OPEN";
              return (
                <GridListTile key={game.id}>
                  <DateTag
                    firstString={dateString}
                    secondString={statusString}
                  />
                  <Box display="flex" flexDirection="row">
                    <TeamDisplay
                      width={width}
                      team={teamMap.get(game.homeTeam)}
                    />
                    <TeamDisplay
                      width={width}
                      team={teamMap.get(game.visTeam)}
                    />
                  </Box>
                </GridListTile>
              );
            })}
          </GridList>
        ) : (
          <LinearProgress />
        )}
      </div>
    </Box>
  );
};

export default withWidth()(SeasonGame);
