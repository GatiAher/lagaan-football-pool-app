import React, { useEffect, useState } from "react";
import axios from "axios";
import { AllGameList } from "./all-game-list";
import "./../styles/all-game.css";

export const AllGame = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  // Fetch all books on initial render
  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    axios
      .get("http://localhost:3001/game/all")
      .then((response) => {
        setGames(response.data);
        setLoading(false);
      })
      .catch((error) =>
        console.error(`There was an error retrieving the game list: ${error}`)
      );
  };

  return (
    <div className="game-list-wrapper">
      <AllGameList games={games} loading={loading} />
    </div>
  );
};
