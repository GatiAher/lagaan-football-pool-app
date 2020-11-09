import React, { useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";

import getCurrentWeek from "../../utils/getCurrentWeek";

import api from "../../api";
import UserType from "../../types/UserType";

import LeaderboardView from "./LeaderboardView";

const Leaderboard = () => {
  const { user } = useAuth0();
  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoadedUsers, setIsLoadedUsers] = useState(false);

  const currentWeek = getCurrentWeek();

  // Fetch on initial render
  useEffect(() => {
    api.user.getList().then((data) => {
      const listOfUserIds: string[] = [];
      data.forEach((element: UserType) => {
        listOfUserIds.push(element.id);
      });
      if (listOfUserIds.includes(user.sub)) {
        setUsers(data);
        setIsLoadedUsers(true);
      }
    });
  }, [user.sub]);

  return (
    <LeaderboardView
      userSub={user.sub}
      users={users}
      isLoadedUsers={isLoadedUsers}
      currentWeek={currentWeek}
    />
  );
};

export default Leaderboard;
