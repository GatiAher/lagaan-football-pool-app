import axios from "axios";
import { pickBy, omit, startsWith } from "lodash";

import React, { useEffect, useState, useCallback } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import WeekPicker from "../General/WeekPicker";

import PickTeamList from "./PickTeamList";
import PickBye from "./PickBye";
import { TeamToWinLossMap } from "../../utils/types/TeamType";
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

const PickTeam = () => {
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

  return (
    <Box>
      <WeekPicker week={week} setWeek={setWeek} />
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
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={putUserSelectionsCallback}
        disabled={selectionA === "" || selectionB === ""}
      >
        {`Pick: ${selectionA} ${selectionB}`}
      </Button>
      <h1>{submissionMessage}</h1>
    </Box>
  );
};

export default PickTeam;
