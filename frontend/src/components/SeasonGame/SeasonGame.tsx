import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { SeasonGameList } from "./SeasonGameList";
import "./SeasonGame.css";

const fetchGames = async (
  season: number,
  setGames: (arg0: any) => void,
  setLoading: (arg0: boolean) => void
) => {
  axios
    .get(`/game/season/${season}`)
    .then((response) => {
      setGames(response.data);
      setLoading(false);
    })
    .catch((error) =>
      console.error(`There was an error retrieving the game list: ${error}`)
    );
};

export const SeasonGame = () => {
  const [season, setSeason] = useState(54);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGamesCallback = useCallback(() => {
    fetchGames(season, setGames, setLoading);
  }, [season]);

  // Fetch all books on initial render
  useEffect(() => {
    fetchGamesCallback();
  }, [fetchGamesCallback]);

  return (
    <div className="game-list-wrapper">
      {/* Form for creating new book */}
      <div className="game-list-form">
        <div className="form-wrapper">
          <div className="form-row">
            <fieldset>
              <label className="form-label" htmlFor="season">
                Enter Season:
              </label>
              <input
                className="form-input"
                type="number"
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
