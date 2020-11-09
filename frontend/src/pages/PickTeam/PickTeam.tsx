import { pickBy, omit, startsWith } from "lodash";

import React, { useEffect, useState, useCallback } from "react";
import Button from "@material-ui/core/Button";

import PickTeamView from "./PickTeamView";

import { useAuth0 } from "@auth0/auth0-react";

import api from "../../api";
import SnackBar, { SnackBarProps } from "../../components/snackbar";

import getCurrentWeek from "../../utils/getCurrentWeek";

const PickTeam = () => {
  const { user } = useAuth0();

  const currentWeek = getCurrentWeek();
  const [week, setWeek] = useState(currentWeek);

  const [savedSelections, setSavedSelections] = useState<
    (string | number | undefined)[]
  >([]);

  const [selectionA, setSelectionA] = useState("");
  const [selectionB, setSelectionB] = useState("");
  const [isLoadedUser, setIsLoadedUser] = useState(false);

  // snackbar
  const [snackBarMessage, setSnackBarMessage] = React.useState<
    (SnackBarProps & { date: Date }) | null
  >(null);

  const setSnackBarMessageUnique = (props: SnackBarProps) =>
    setSnackBarMessage({ ...props, date: new Date() });

  const putUserSelectionsCallback = useCallback(() => {
    const body = {
      [`wk${week}A`]: selectionA,
      [`wk${week}B`]: selectionB,
    };
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
  }, [user.sub, week, selectionA, selectionB]);

  // Fetch on initial render
  useEffect(() => {
    setSelectionA("");
    setSelectionB("");
    api.user.getOne(user.sub).then((data) => {
      const getKeyValue = <T, K extends keyof T>(obj: T, key: K): T[K] =>
        obj[key];
      const userData = data[0];
      // @ts-ignore
      const teamA = getKeyValue(userData, `wk${week}A`);
      // @ts-ignore
      const teamB = getKeyValue(userData, `wk${week}B`);
      let teamSelections = pickBy(userData, (value, key) =>
        startsWith(key, "wk")
      );
      // set already picked teams
      teamSelections = omit(teamSelections, [`wk${week}A`, `wk${week}B`]);
      // @ts-ignore
      const teamSelectionsList = Object.values(teamSelections);
      setSavedSelections(teamSelectionsList);
      // set changable picks
      if (typeof teamA === "string") {
        setSelectionA(teamA);
      }
      if (typeof teamB === "string") {
        setSelectionB(teamB);
      }
      setIsLoadedUser(true);
    });
  }, [user.sub, week]);

  const handleTeamSelect = (team: string): void => {
    if (selectionA === team) {
      setSelectionA("");
    } else if (selectionB === team) {
      setSelectionB("");
    } else if (selectionA === "") {
      setSelectionA(team);
    } else if (selectionB === "") {
      setSelectionB(team);
    }
  };

  const isTeamSelected = (team: string): boolean => {
    return team === selectionA || team === selectionB;
  };

  const areTwoTeamsSelected = (): boolean => {
    return selectionA !== "" && selectionB !== "";
  };

  return (
    <div>
      <PickTeamView
        week={week}
        setWeek={setWeek}
        savedSelections={savedSelections}
        handleTeamSelect={handleTeamSelect}
        isTeamSelected={isTeamSelected}
        areTwoTeamsSelected={areTwoTeamsSelected}
        isLoadedUser={isLoadedUser}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={putUserSelectionsCallback}
      >
        {`Pick: ${selectionA} ${selectionB}`}
      </Button>
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
