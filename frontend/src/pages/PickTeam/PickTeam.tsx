import { pickBy, startsWith } from "lodash";

import React, { useEffect, useState } from "react";

import PickTeamView from "./PickTeamView";

import { useAuth0 } from "@auth0/auth0-react";

import api from "../../api";
import SnackBar, { SnackBarProps } from "../../components/snackbar";

import { useCurrentWeek } from "../../contexts/CurrentWeekContext";
import UserType from "../../types/UserType";

const PickTeamRegular = () => {
  const { currentWeek } = useCurrentWeek();
  const [week, setWeek] = useState(currentWeek);

  useEffect(() => {
    setWeek(currentWeek);
  }, [currentWeek]);

  const { user } = useAuth0();
  const [isLoadedUser, setIsLoadedUser] = useState(false);
  const [selections, setSelections] = useState<(string | number | undefined)[]>(
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
      // get any previous picks for this week
      let teamSelections = pickBy(
        userData,
        (value, key) => startsWith(key, `wk${week}`) && value !== null && value !== "" 
      );
      // @ts-ignore
      const teamSelectionsList = Object.values(teamSelections);
      setSelections(teamSelectionsList);
      setIsLoadedUser(true);
    });
  }, [user.sub, week]);

  const handleSelection = (team: string): void => {
    let newSelections;
    if (selections.includes(team)) {
      // remove from array
      newSelections = selections.filter((oldTeam) => oldTeam !== team);
    } else {
      // add to array
      newSelections = selections.concat(team);
    }
    setSelections(newSelections);
  };

  return (
    <div>
      <PickTeamView
        week={week}
        setWeek={setWeek}
        userData={userData}
        selections={selections}
        handleSelection={handleSelection}
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

export default PickTeamRegular;
