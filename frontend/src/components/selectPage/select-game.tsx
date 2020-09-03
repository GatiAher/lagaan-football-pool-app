import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { SelectGameList } from "./select-game-list";
import "./select-game.css";

const fetchGames = async (
  season: number,
  week: number,
  setGames: (arg0: any) => void,
  setLoading: (arg0: boolean) => void
) => {
  axios
    .get(`/game/season/${season}/week/${week}`)
    .then((response) => {
      setGames(response.data);
      setLoading(false);
    })
    .catch((error) =>
      console.error(`There was an error retrieving the game list: ${error}`)
    );
};

export const SelectGame = () => {
  const [season, setSeason] = useState(54);
  const [week, setWeek] = useState(1);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectionA, setSelectionA] = useState("");
  const [selectionB, setSelectionB] = useState("");

  const fetchGamesCallback = useCallback(() => {
    fetchGames(season, week, setGames, setLoading);
  }, [season, week]);

  // Fetch all books on initial render
  useEffect(() => {
    fetchGamesCallback();
  }, [season, week, fetchGamesCallback]);

  const handleFilterSubmit = () => {
    setSelectionA("");
    setSelectionB("");
    fetchGamesCallback();
  };

  const handleTeamSelect = (team: string): void => {
    if (selectionA === team) {
      setSelectionA("");
    } else if (selectionB === team) {
      setSelectionB("");
    } else if (selectionA === "") {
      setSelectionA(team);
    } else if (selectionB === "") {
      setSelectionB(team);
    }
  };

  const isTeamSelected = (team: string): boolean => {
    return team === selectionA || team === selectionB;
  };

  const USER = "test";

  const handleTeamSubmit = () => {
    const nameA = `wk${week}A`;
    const nameB = `wk${week}B`;
    const update = {
      [nameA]: selectionA,
      [nameB]: selectionB,
    };
    axios
      .put(`/user/update/username/${USER}`, update)
      .then((response) => {
        return response;
      })
      .catch((error) =>
        console.error(
          `There was an error in submitting the user selections: ${error}`
        )
      );
  };

  return (
    <div className="game-list-wrapper">
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
            <fieldset>
              <label className="form-label" htmlFor="week">
                Enter Week:
              </label>
              <input
                className="form-input"
                type="number"
                id="week"
                name="week"
                value={week}
                onChange={(e) => {
                  setWeek(parseInt(e.currentTarget.value, 10));
                }}
              />
            </fieldset>
          </div>
        </div>
        <button onClick={handleFilterSubmit} className="btn btn-add">
          Set Season and Week
        </button>
      </div>
      <SelectGameList
        games={games}
        loading={loading}
        handleTeamSelect={handleTeamSelect}
        isTeamSelected={isTeamSelected}
      />
      <button
        onClick={handleTeamSubmit}
        className="btn btn-add"
        disabled={selectionA === "" || selectionB === ""}
      >
        {`Pick: ${selectionA} ${selectionB}`}
      </button>
    </div>
  );
};
