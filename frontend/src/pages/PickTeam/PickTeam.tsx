import { pickBy, omit, startsWith } from "lodash";

import React, { useEffect, useState, useCallback } from "react";

import Snackbar from "@material-ui/core/Snackbar";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import LinearProgress from "@material-ui/core/LinearProgress";

import fetchUserData from "../../utils/api-handlers/fetchUserData";
import putUserSelections from "../../utils/api-handlers/putUserSelections";
import { useAuth0 } from "@auth0/auth0-react";
import UserNotRegistered from "../../components/General/UserNotRegistered";

import SelectionButton from "./SelectionButton";

import TeamDisplay from "../../components/WeekDisplay/TeamDisplay";
import WeekDisplay, {
  TeamDisplayWrapperProps,
} from "../../components/WeekDisplay/WeekDisplay";

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
  const [isRegisteredUser, setIsRegisteredUser] = useState(true);

  // snackbar
  const errorSnackbarErrorColor = "#e57373";
  const [open, setOpen] = React.useState(false);
  const [isFail, setFail] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = React.useState("");

  const handleClick = (message: string, failValue: boolean) => {
    setSnackBarMessage(message);
    setFail(failValue);
    setOpen(true);
  };

  const handleClose = (event: any, reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setFail(false);
    setSnackBarMessage("");
  };

  const putUserSelectionsCallback = useCallback(() => {
    const body = {
      [`wk${week}A`]: selectionA,
      [`wk${week}B`]: selectionB,
    };
    putUserSelections(user.sub, body, handleClick);
  }, [user.sub, week, selectionA, selectionB]);

  // Fetch on initial render
  useEffect(() => {
    setSelectionA("");
    setSelectionB("");
    fetchUserData(user.sub, (data, isRegUser) => {
      setIsRegisteredUser(isRegUser);
      if (isRegUser) {
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
      }
    });
  }, [user.sub, week]);

  if (!isRegisteredUser) {
    return <UserNotRegistered />;
  }

  if (!isLoadedUser) {
    return <LinearProgress />;
  }

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

  const TeamDisplayWrapper = (props: TeamDisplayWrapperProps) => {
    return (
      <SelectionButton
        team={props.team.id}
        disabled={!props.isPickWindowOpen}
        savedSelections={savedSelections}
        handleTeamSelect={handleTeamSelect}
        isTeamSelected={isTeamSelected}
        areTwoTeamsSelected={areTwoTeamsSelected}
      >
        <TeamDisplay team={props.team} />
      </SelectionButton>
    );
  };

  return (
    <Box>
      <WeekDisplay
        render={TeamDisplayWrapper}
        week={week}
        setWeek={setWeek}
        hasBye
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={putUserSelectionsCallback}
      >
        {`Pick: ${selectionA} ${selectionB}`}
      </Button>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={snackBarMessage}
        // @ts-ignore
        ContentProps={
          isFail && {
            style: {
              background: errorSnackbarErrorColor,
            },
          }
        }
      />
    </Box>
  );
};

export default PickTeam;
