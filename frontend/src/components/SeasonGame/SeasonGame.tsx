import axios from "axios";

import React, { useEffect, useState, useCallback } from "react";
import Box from "@material-ui/core/Box";

import WeekPicker from "../General/WeekPicker";
import SeasonGameList from "./SeasonGameList";

const fetchGames = async (
  week: number,
  setGames: (arg0: any) => void,
  setLoading: (arg0: boolean) => void
) => {
  axios
    .get(`/game/week/${week}`)
    .then((response) => {
      setGames(response.data);
      setLoading(false);
    })
    .catch((error) =>
      console.error(`There was an error retrieving the game list: ${error}`)
    );
};

const SeasonGame = () => {
  const [games, setGames] = useState([]);
  const [week, setWeek] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchGamesCallback = useCallback(() => {
    fetchGames(week, setGames, setLoading);
  }, [week]);

  // Fetch all books on initial render
  useEffect(() => {
    fetchGamesCallback();
  }, [week]);

  return (
    <Box>
      <WeekPicker week={week} setWeek={setWeek} />
      <SeasonGameList games={games} loading={loading} />
    </Box>
  );
};

export default SeasonGame;
