import axios from "axios";

import React, { useEffect, useState, useCallback } from "react";

import LeaderboardList from "./LeaderboardList";

import fetchTeamWinLossMap from "../../utils/api-handlers/fetchTeamWinLossMap";

const fetchUsers = async (callback: (arg0: any) => void) => {
  const query = {
    sort: JSON.stringify(["score", "asc"]),
  };
  axios
    .get("/user", { params: query })
    .then((response) => {
      callback(response.data);
    })
    .catch((error) =>
      console.error(`There was an error retrieving the game list: ${error}`)
    );
};

const Leaderboard = () => {
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [users, setUsers] = useState([]);

  const [loadingTeamWinLossMap, setLoadingTeamWinLossMap] = useState(true);
  const [teamWinLossMap, setTeamWinLossMap] = useState({});

  // Fetch on initial render
  useEffect(() => {
    fetchTeamWinLossMap((data) => {
      setTeamWinLossMap(data);
      setLoadingTeamWinLossMap(false);
    });
    fetchUsers((data) => {
      setUsers(data);
      setLoadingUsers(false);
    });
  }, []);

  return (
    <LeaderboardList
      users={users}
      teamWinLossMap={teamWinLossMap}
      loading={loadingUsers || loadingTeamWinLossMap}
    />
  );
};

export default Leaderboard;
