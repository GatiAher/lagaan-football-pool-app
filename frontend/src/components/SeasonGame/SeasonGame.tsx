import React, { useEffect, useState, useCallback } from "react";
import Box from "@material-ui/core/Box";

import WeekPicker from "../General/WeekPicker";
import SeasonGameList from "./SeasonGameList";

import fetchGames from "../../utils/api-handlers/fetchGames";
import getCurrentWeek from "../../utils/getCurrentWeek";

const SeasonGame = () => {
  const [games, setGames] = useState([]);
  const [week, setWeek] = useState(getCurrentWeek());
  const [loading, setLoading] = useState(true);

  // Fetch on initial render
  useEffect(() => {
    fetchGames(week, (data) => {
      setGames(data);
      setLoading(false);
    });
  }, [week]);

  return (
    <Box>
      <WeekPicker week={week} setWeek={setWeek} />
      <SeasonGameList games={games} loading={loading} />
    </Box>
  );
};

export default SeasonGame;
