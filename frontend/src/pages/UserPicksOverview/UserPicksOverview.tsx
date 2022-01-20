import React, { useEffect, useState } from "react";
import withWidth from "@material-ui/core/withWidth";

import { useAuth0 } from "@auth0/auth0-react";

import UserPickOverviewView from "./UserPicksOverviewView";

import { useCurrentWeek } from "../../contexts/CurrentWeekContext";

import api from "../../api";

import UserType from "../../types/UserType";

import TeamType from "../../types/TeamType";

type UserPickOverviewProps = {
  metricField?: "score" | "scorePlayoff";
};

const UserPickOverview = ({ metricField }: UserPickOverviewProps) => {
  const metricFieldChosen = metricField || "score";
  const { user } = useAuth0();
  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoadedUsers, setIsLoadedUsers] = useState(false);

  const { currentWeek } = useCurrentWeek();
  const activeField = metricFieldChosen === "scorePlayoff" ? "activePlayoff" : "active";

  const [teamMap, setTeamMap] = useState(new Map<string, TeamType>());
  const [isLoadedTeamMap, setIsLoadedTeamMap] = useState(false);

  // Fetch on initial render
  useEffect(() => {
    api.user.getList(metricFieldChosen, activeField, 1).then((data) => {
      const listOfUserIds: string[] = [];
      data.forEach((element: UserType) => {
        listOfUserIds.push(element.id);
      });
      if (listOfUserIds.includes(user.sub)) {
        setUsers(data);
        setIsLoadedUsers(true);
        api.team.fetchTeamMap().then((teamMapData) => {
          setTeamMap(teamMapData);
          setIsLoadedTeamMap(true);
        });
      }
    });
  }, [user.sub, metricFieldChosen, activeField]);

  return (
    <UserPickOverviewView
      currentWeek={currentWeek}
      currentUserSub={user.sub}
      users={users}
      isLoadedUsers={isLoadedUsers}
      teamMap={teamMap}
      isLoadedTeamMap={isLoadedTeamMap}
      metricField={metricFieldChosen}
    />
  );
};

export default withWidth()(UserPickOverview);
