import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { SeasonGameList } from "./SeasonGameList";

const fetchGames = async (
  setGames: (arg0: any) => void,
  setLoading: (arg0: boolean) => void
) => {
  axios
    .get(`/game/`)
    .then((response) => {
      setGames(response.data);
      setLoading(false);
    })
    .catch((error) =>
      console.error(`There was an error retrieving the game list: ${error}`)
    );
};

export const SeasonGame = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGamesCallback = useCallback(() => {
    fetchGames(setGames, setLoading);
  }, []);

  // Fetch all books on initial render
  useEffect(() => {
    fetchGamesCallback();
  }, []);

  return <SeasonGameList games={games} loading={loading} />;
};
