import axios from "axios";

import React, { useEffect, useState, useCallback } from "react";

import LeaderboardList from "./LeaderboardList";
import { TeamToWinLossMap } from "../../utils/types/TeamType";

const fetchUsers = async (
  setUsers: (arg0: any) => void,
  setLoading: (arg0: boolean) => void
) => {
  axios
    .get(`/user/ranked`)
    .then((response) => {
      setUsers(response.data);
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

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [teamWinLossMap, setTeamWinLossMap] = useState({});

  const fetchUsersCallback = useCallback(() => {
    fetchUsers(setUsers, setLoading);
  }, []);

  const fetchTeamDataCallback = useCallback(() => {
    fetchTeamData(setTeamWinLossMap, setLoading);
  }, []);

  // Fetch all books on initial render
  useEffect(() => {
    fetchUsersCallback();
    fetchTeamDataCallback();
  }, [fetchUsersCallback]);

  return (
    <LeaderboardList
      users={users}
      teamWinLossMap={teamWinLossMap}
      loading={loading}
    />
  );
};

export default Leaderboard;
