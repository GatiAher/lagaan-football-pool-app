import React, { useEffect, useState } from "react";
import axios from "axios";
import { SelectGameList } from "./select-game-list";
import "./select-game.css";

export const SelectGame = () => {
  const [season, setSeason] = useState(54);
  const [week, setWeek] = useState(1);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  // Fetch all books on initial render
  useEffect(() => {
    fetchGames();
  }, [season]);

  const fetchGames = async () => {
    axios
      .get(`http://localhost:3001/game/season/${season}/week/${week}`)
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
              <label className="form-label" htmlFor="season">
                Enter Season:
              </label>
              <input
                className="form-input"
                type="string"
                id="season"
                name="season"
                value={season}
                onChange={(e) => {
                  const value = e.currentTarget.value;
                  if (value !== "") {
                    setSeason(parseInt(e.currentTarget.value, 10));
                  }
                }}
              />
            </fieldset>
            <fieldset>
              <label className="form-label" htmlFor="week">
                Enter Week:
              </label>
              <input
                className="form-input"
                type="string"
                id="week"
                name="week"
                value={week}
                onChange={(e) => {
                  const value = e.currentTarget.value;
                  setWeek(parseInt(e.currentTarget.value, 10));
                }}
              />
            </fieldset>
          </div>
        </div>
      </div>
      <SelectGameList games={games} loading={loading} />
    </div>
  );
};
