import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { pickBy, omit, startsWith } from "lodash";
import { PickTeamList } from "./PickTeamList";
import { PickBye } from "./PickBye";
import { useUser } from "../../context/TempUserContext";

const fetchGames = async (
  season: number,
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

const fetchUserData = async (
  userId: number,
  week: number,
  setSelectionA: (arg0: string) => void,
  setSelectionB: (arg0: string) => void,
  setDisabledBye1: (arg0: boolean) => void,
  setDisabledBye2: (arg0: boolean) => void,
  setSavedSelections: (arg0: any) => void
) => {
  axios.get(`/user/id/${userId}`).then((response) => {
    const userData = response.data[0];
    const nameA = `wk${week}A`;
    const nameB = `wk${week}B`;
    if (userData[nameA] !== null) {
      setSelectionA(userData[nameA]);
    }
    if (userData[nameB] !== null) {
      setSelectionB(userData[nameB]);
    }
    let teamSelections = pickBy(userData, (value, key) =>
      startsWith(key, "wk")
    );
    teamSelections = omit(teamSelections, [nameA, nameB]);
    const teamSelectionsList = Object.values(teamSelections);
    if (week === 10) {
      if (!teamSelectionsList.includes("BYE1")) {
        setSelectionA("BYE1");
        setDisabledBye1(true);
      }
      if (!teamSelectionsList.includes("BYE2")) {
        setSelectionB("BYE2");
        setDisabledBye2(true);
      }
    } else if (week > 10) {
      setDisabledBye1(true);
      setDisabledBye2(true);
    }
    setSavedSelections(teamSelectionsList);
  });
};

export const PickTeam = () => {
  const { user } = useUser();
  const [season, setSeason] = useState(54);
  const [week, setWeek] = useState(1);
  const [games, setGames] = useState([]);
  const [savedSelections, setSavedSelections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectionA, setSelectionA] = useState("");
  const [selectionB, setSelectionB] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [disabledBye1, setDisabledBye1] = useState(false);
  const [disabledBye2, setDisabledBye2] = useState(false);

  const fetchGamesCallback = useCallback(() => {
    fetchGames(season, week, setGames, setLoading);
  }, [season, week]);

  const fetchUserDataCallback = useCallback(() => {
    fetchUserData(
      user.user_id,
      week,
      setSelectionA,
      setSelectionB,
      setDisabledBye1,
      setDisabledBye2,
      setSavedSelections
    );
  }, [user, week]);

  // Fetch all games on initial render
  useEffect(() => {
    fetchGamesCallback();
    fetchUserDataCallback();
  }, []);

  const handleFilterSubmit = () => {
    setSelectionA("");
    setSelectionB("");
    setSubmissionMessage("");
    fetchGamesCallback();
    fetchUserDataCallback();
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

  const isTwoTeamSelected = (): boolean => {
    return selectionA !== "" && selectionB !== "";
  };

  const handleTeamSubmit = () => {
    const update = {
      [`wk${week}A`]: selectionA,
      [`wk${week}B`]: selectionB,
    };
    axios
      .put(`/user/update/id/${user.user_id}`, update)
      .then((response) => {
        setSubmissionMessage(response.data.message);
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
      <PickTeamList
        games={games}
        loading={loading}
        savedSelections={savedSelections}
        handleTeamSelect={handleTeamSelect}
        isTeamSelected={isTeamSelected}
        isTwoTeamSelected={isTwoTeamSelected}
      />
      <PickBye
        disabled1={disabledBye1}
        disabled2={disabledBye2}
        loading={loading}
        savedSelections={savedSelections}
        handleTeamSelect={handleTeamSelect}
        isTeamSelected={isTeamSelected}
        isTwoTeamSelected={isTwoTeamSelected}
      />
      <button
        onClick={handleTeamSubmit}
        className="btn btn-add"
        disabled={selectionA === "" || selectionB === ""}
      >
        {`Pick: ${selectionA} ${selectionB}`}
      </button>
      <h1>{submissionMessage}</h1>
    </div>
  );
};
