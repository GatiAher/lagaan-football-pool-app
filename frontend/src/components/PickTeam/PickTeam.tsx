import axios from "axios";
import { pickBy, omit, startsWith } from "lodash";

import React, { useEffect, useState, useCallback } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import WeekPicker from "../General/WeekPicker";

import PickTeamSection from "./PickTeamSection";
import PickByeSection from "./PickByeSection";

import fetchGames from "../../utils/api-handlers/fetchGames";
import fetchTeamWinLossMap from "../../utils/api-handlers/fetchTeamWinLossMap";
import getCurrentWeek from "../../utils/getCurrentWeek";

import { useUser } from "../../context/TempUserContext";

const fetchUserData = async (
  id: number,
  week: number,
  setSelectionA: (arg0: string) => void,
  setSelectionB: (arg0: string) => void,
  setSavedSelections: (arg0: any) => void,
  setLoading: (arg0: boolean) => void
) => {
  axios.get(`/user/${id}`).then((response) => {
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
    setSavedSelections(teamSelectionsList);
    setLoading(false);
  });
};

const putUserSelections = async (
  id: number,
  week: number,
  selectionA: string,
  selectionB: string,
  setSubmissionMessage: (arg0: string) => void
) => {
  axios
    .put(`/user/${id}`, {
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
  const [week, setWeek] = useState(getCurrentWeek());

  const [loadingGames, setLoadingGames] = useState(true);
  const [games, setGames] = useState([]);

  const [loadingTeamWinLossMap, setLoadingTeamWinLossMap] = useState(true);
  const [teamWinLossMap, setTeamWinLossMap] = useState({});

  const [loadingUserData, setLoadingUserData] = useState(true);
  const [savedSelections, setSavedSelections] = useState([]);
  const [selectionA, setSelectionA] = useState("");
  const [selectionB, setSelectionB] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState("");

  const putUserSelectionsCallback = useCallback(() => {
    putUserSelections(
      user.user_id,
      week,
      selectionA,
      selectionB,
      setSubmissionMessage
    );
  }, [user.user_id, week, selectionA, selectionB]);

  // Fetch on initial render
  useEffect(() => {
    setSelectionA("");
    setSelectionB("");
    fetchUserData(
      user.user_id,
      week,
      setSelectionA,
      setSelectionB,
      setSavedSelections,
      setLoadingUserData
    );
    fetchGames(week, (data) => {
      setGames(data);
      setLoadingGames(false);
    });
    fetchTeamWinLossMap((data) => {
      setTeamWinLossMap(data);
      setLoadingTeamWinLossMap(false);
    });
  }, [user.user_id, week]);

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
      <PickTeamSection
        loading={loadingUserData || loadingTeamWinLossMap || loadingGames}
        games={games}
        teamWinLossMap={teamWinLossMap}
        savedSelections={savedSelections}
        handleTeamSelect={handleTeamSelect}
        isTeamSelected={isTeamSelected}
        isTwoTeamSelected={isTwoTeamSelected}
      />
      <PickByeSection
        loading={loadingUserData || loadingTeamWinLossMap}
        week={week}
        savedSelections={savedSelections}
        setSelectionA={setSelectionA}
        setSelectionB={setSelectionB}
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
