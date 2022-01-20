import React, { useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";

import { useCurrentWeek } from "../../contexts/CurrentWeekContext";

import api from "../../api";
import UserType from "../../types/UserType";

import LeaderboardView from "./LeaderboardView";

const Leaderboard = () => {
  const { user } = useAuth0();
  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoadedUsers, setIsLoadedUsers] = useState(false);

  const { currentWeek } = useCurrentWeek();
  const metricField = currentWeek > 18 ? "scorePlayoff" : "score";
  const activeField = currentWeek > 18 ? "activePlayoff" : "active";

  // Fetch on initial render
  useEffect(() => {
    api.user.getList(metricField, activeField, 1).then((data) => {
      const listOfUserIds: string[] = [];
      data.forEach((element: UserType) => {
        listOfUserIds.push(element.id);
      });
      if (listOfUserIds.includes(user.sub)) {
        setUsers(data);
        setIsLoadedUsers(true);
      }
    });
  }, [user.sub, metricField, activeField]);

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
