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
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [teamWinLossMap, setTeamWinLossMap] = useState({});

  // Fetch on initial render
  useEffect(() => {
    fetchTeamWinLossMap((data) => {
      setTeamWinLossMap(data);
      setLoading(false);
    });
    fetchUsers((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  return (
    <LeaderboardList
      users={users}
      teamWinLossMap={teamWinLossMap}
      loading={loading}
    />
  );
};

export default Leaderboard;
