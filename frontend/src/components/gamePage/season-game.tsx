import React, { useEffect, useState } from "react";
import axios from "axios";
import { SeasonGameList } from "./season-game-list";
import "./season-game.css";

export const SeasonGame = () => {
  const [season, setSeason] = useState(54);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  // Fetch all books on initial render
  useEffect(() => {
    fetchGames();
  }, [season]);

  const fetchGames = async () => {
    axios
      .get(`http://localhost:3001/game/season/${season}`)
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
      {/* Form for creating new book */}
      <div className="game-list-form">
        <div className="form-wrapper">
          <div className="form-row">
            <fieldset>
              <label className="form-label" htmlFor="title">
                Enter Season:
              </label>
              <input
                className="form-input"
                type="string"
                id="season"
                name="season"
                value={season}
                onChange={(e) => {
                  setSeason(parseInt(e.currentTarget.value, 10));
                }}
              />
            </fieldset>
          </div>
        </div>
      </div>
      <SeasonGameList games={games} loading={loading} />
    </div>
  );
};
