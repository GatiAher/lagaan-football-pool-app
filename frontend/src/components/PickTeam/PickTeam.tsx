import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { pickBy, omit, startsWith } from "lodash";
import { PickTeamList } from "./PickTeamList";
import { PickBye } from "./PickBye";
import { TeamToWinLossMap } from "../../utils/types/team-type";
import { useUser } from "../../context/TempUserContext";

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

const fetchTeamData = async (
  setTeamWinLossMap: (arg0: any) => void,
  setLoading: (arg0: boolean) => void
) => {
  axios
    .get(`/team`)
    .then((response) => {
      if (Array.isArray(response.data)) {
        const teamWinLossMap: TeamToWinLossMap = {};
        response.data.forEach((teamObj) => {
          teamWinLossMap[teamObj.team] = {
            numOfWin: teamObj.numOfWin,
            numOfLoss: teamObj.numOfLoss,
          };
        });
        setTeamWinLossMap(teamWinLossMap);
        setLoading(false);
      }
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

const putUserSelections = async (
  user_id: number,
  week: number,
  selectionA: string,
  selectionB: string,
  setSubmissionMessage: (arg0: string) => void
) => {
  axios
    .put(`/user/update/id/${user_id}`, {
      [`wk${week}A`]: selectionA,
      [`wk${week}B`]: selectionB,
    })
    .then((response) => {
      setSubmissionMessage(response.data.message);
    })
    .catch((error) =>
      console.error(
        `There was an error in submitting the user selections: ${error}`
      )
    );
};

export const PickTeam = () => {
  const { user } = useUser();
  const [week, setWeek] = useState(1);
  const [games, setGames] = useState([]);
  const [teamWinLossMap, setTeamWinLossMap] = useState({});
  const [savedSelections, setSavedSelections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectionA, setSelectionA] = useState("");
  const [selectionB, setSelectionB] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [disabledBye1, setDisabledBye1] = useState(false);
  const [disabledBye2, setDisabledBye2] = useState(false);

  const fetchGamesCallback = useCallback(() => {
    fetchGames(week, setGames, setLoading);
  }, [week]);

  const fetchTeamDataCallback = useCallback(() => {
    fetchTeamData(setTeamWinLossMap, setLoading);
  }, []);

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

  const putUserSelectionsCallback = useCallback(() => {
    putUserSelections(
      user.user_id,
      week,
      selectionA,
      selectionB,
      setSubmissionMessage
    );
  }, [user.user_id, week, selectionA, selectionB]);

  // Fetch all games on initial render
  useEffect(() => {
    fetchGamesCallback();
    fetchUserDataCallback();
    fetchTeamDataCallback();
  }, [week]);

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

  const handleTeamSubmit = () => {
    putUserSelectionsCallback();
  };

  const isTeamSelected = (team: string): boolean => {
    return team === selectionA || team === selectionB;
  };

  const isTwoTeamSelected = (): boolean => {
    return selectionA !== "" && selectionB !== "";
  };

  return (
    <div className="game-list-wrapper">
      <div className="game-list-form">
        <div className="form-wrapper">
          <div className="form-row">
            <fieldset>
              <label className="form-label" htmlFor="week">
                Enter Week:
              </label>
              <select
                className="form-input"
                id="week"
                name="week"
                value={week}
                onChange={(e) => {
                  setWeek(parseInt(e.target.value, 10));
                  handleFilterSubmit();
                }}
              >
                <option value={1}>WEEK 1</option>
                <option value={2}>WEEK 2</option>
                <option value={3}>WEEK 3</option>
                <option value={4}>WEEK 4</option>
                <option value={5}>WEEK 5</option>
                <option value={6}>WEEK 6</option>
                <option value={7}>WEEK 7</option>
                <option value={8}>WEEK 8</option>
                <option value={9}>WEEK 9</option>
                <option value={10}>WEEK 10</option>
                <option value={11}>WEEK 11</option>
                <option value={12}>WEEK 12</option>
                <option value={13}>WEEK 13</option>
                <option value={14}>WEEK 14</option>
                <option value={15}>WEEK 15</option>
                <option value={16}>WEEK 16</option>
                <option value={17}>WEEK 17</option>
              </select>
            </fieldset>
          </div>
        </div>
      </div>
      <PickTeamList
        games={games}
        teamWinLossMap={teamWinLossMap}
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
