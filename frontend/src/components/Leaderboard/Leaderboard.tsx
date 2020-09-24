import axios from "axios";

import React, { useEffect, useState, useCallback } from "react";

import LeaderboardList from "./LeaderboardList";

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

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsersCallback = useCallback(() => {
    fetchUsers(setUsers, setLoading);
  }, []);

  // Fetch all books on initial render
  useEffect(() => {
    fetchUsersCallback();
  }, [fetchUsersCallback]);

  return <LeaderboardList users={users} loading={loading} />;
};

export default Leaderboard;
