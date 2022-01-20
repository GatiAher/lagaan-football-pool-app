import { pickBy, startsWith } from "lodash";

import React, { useEffect, useState } from "react";

import PickTeamView from "./PickTeamView";

import { useAuth0 } from "@auth0/auth0-react";

import api from "../../api";
import SnackBar, { SnackBarProps } from "../../components/snackbar";

import { useCurrentWeek } from "../../contexts/CurrentWeekContext";
import UserType from "../../types/UserType";

const PickTeam = () => {
  const { currentWeek } = useCurrentWeek();
  const [week, setWeek] = useState(currentWeek);

  useEffect(() => {
    setWeek(currentWeek);
  }, [currentWeek]);

  const { user } = useAuth0();
  const [isLoadedUser, setIsLoadedUser] = useState(false);
  const [selections, setSelections] = useState<(string | number | boolean | undefined)[]>(
    []
  );
  const [userData, setUserData] = useState<UserType | null>(null);

  // snackbar
  const [snackBarMessage, setSnackBarMessage] = React.useState<
    (SnackBarProps & { date: Date }) | null
  >(null);

  const setSnackBarMessageUnique = (props: SnackBarProps) =>
    setSnackBarMessage({ ...props, date: new Date() });

  const submitSelections = (body: object) => {
    api.user
      .putUserSelections(user.sub, body)
      .then(() =>
        setSnackBarMessageUnique({
          message: "Successfully updated picks!",
          status: "success",
        })
      )
      .catch((err) => {
        setSnackBarMessageUnique({
          message: `Failed to update picks: ${JSON.stringify(err)}`,
          status: "fail",
        });
      });
  };

  // Fetch on initial render
  useEffect(() => {
    api.user.getOne(user.sub).then((data) => {
      const userData = data[0];
      setUserData(userData);
      if (week < 24) {
        // get any previous picks for this week
        let teamSelections = pickBy(userData, (value, key) => {
          if (week >= 19) {
            return startsWith(key, `wk${week}`);
          } else {
            return (
              startsWith(key, `wk${week}`) && value !== null && value !== ""
            );
          }
        });
        // @ts-ignore
        const teamSelectionsList = Object.values(teamSelections);
        setSelections(teamSelectionsList);
      }
      setIsLoadedUser(true);
    });
  }, [user.sub, week]);

  return (
    <div>
      <PickTeamView
        week={week}
        setWeek={setWeek}
        userData={userData}
        selections={selections}
        setSelections={setSelections}
        submitSelections={submitSelections}
        isLoadedUser={isLoadedUser}
      />
      {snackBarMessage !== null && (
        <SnackBar
          key={snackBarMessage.date.valueOf()}
          message={snackBarMessage.message}
          status={snackBarMessage.status}
        />
      )}
    </div>
  );
};

export default PickTeam;
