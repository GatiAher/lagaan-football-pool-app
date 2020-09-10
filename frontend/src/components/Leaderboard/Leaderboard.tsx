import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { LeaderboardList } from "./LeaderboardList";

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

export const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsersCallback = useCallback(() => {
    fetchUsers(setUsers, setLoading);
  }, []);

  // Fetch all books on initial render
  useEffect(() => {
    fetchUsersCallback();
  }, [fetchUsersCallback]);

  return (
    <div className="game-list-wrapper">
      {/* Form for creating new book */}
      <LeaderboardList users={users} loading={loading} />
    </div>
  );
};
