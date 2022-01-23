import React, { useEffect, useState } from "react";
import withWidth from "@material-ui/core/withWidth";

import { useAuth0 } from "@auth0/auth0-react";

import UserPickOverviewView from "./UserPicksOverviewView";

import { useCurrentWeek } from "../../contexts/CurrentWeekContext";

import api from "../../api";

import UserType from "../../types/UserType";

import TeamType from "../../types/TeamType";
import parseDateTimeLocal from "../../utils/parseDateTimeLocal";
import { getDisplayDateString } from "../../components/game-by-week/processGameStartTime";

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

  const [bannerMessage, setBannerMessage] = useState("");
  const [isShowPremptively, setIsShowPremptively] = useState(false);


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

    const currentDateObj = new Date();

    // if regular season after Sunday 1pm, or Monday show current week
    if (metricFieldChosen === "score") {
      if ((currentDateObj.getDay() === 0 && currentDateObj.getHours() >= 13) || (currentDateObj.getDay() === 1)) {
        setIsShowPremptively(true);
        setBannerMessage("Picks have been revealed. ")
      } else {
        setBannerMessage("Picks will be revealed on Sunday 1pm. ")
      }
    }

    // if post season, 1 hour after last pick window time show current week
    if (metricFieldChosen === "scorePlayoff") {
      api.game.fetchGamesByWeek(currentWeek).then((data) => {
        const dateObjs = data.map((game) => parseDateTimeLocal(game.pickWindowTime).valueOf());
        const maxDateObj = new Date(Math.max(...dateObjs));
        // picks should become visible 1 hour after the latest pick window time
        maxDateObj.setHours(maxDateObj.getHours() + 1);
        if (currentDateObj.valueOf() > maxDateObj.valueOf()) {
          setIsShowPremptively(true);
          setBannerMessage("Picks have been revealed. ");
        } else {
          setBannerMessage(`Picks will be revealed on ${getDisplayDateString(maxDateObj)}. `)
        }
      });
    }
  }, [user.sub, metricFieldChosen, activeField, currentWeek]);

  return (
    <UserPickOverviewView
      currentWeek={currentWeek}
      currentUserSub={user.sub}
      users={users}
      isLoadedUsers={isLoadedUsers}
      teamMap={teamMap}
      isLoadedTeamMap={isLoadedTeamMap}
      metricField={metricFieldChosen}
      showPremptively={isShowPremptively}
      bannerMessage={bannerMessage}
    />
  );
};

export default withWidth()(UserPickOverview);
