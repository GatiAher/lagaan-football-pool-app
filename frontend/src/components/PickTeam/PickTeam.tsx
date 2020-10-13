import axios from "axios";
import { pickBy, omit, startsWith } from "lodash";

import React, { useEffect, useState, useCallback } from "react";
import withWidth from "@material-ui/core/withWidth";

import LinearProgress from "@material-ui/core/LinearProgress";
import Snackbar from "@material-ui/core/Snackbar";

import Box from "@material-ui/core/Box";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Button from "@material-ui/core/Button";

import getCurrentWeek from "../../utils/getCurrentWeek";
import WeekPicker from "../General/WeekPicker";

import fetchGames from "../../utils/api-handlers/fetchGames";
import GameType from "../../utils/types/GameType";

import fetchTeamMap from "../../utils/api-handlers/fetchTeamMap";
import TeamType from "../../utils/types/TeamType";

import UserType from "../../utils/types/UserType";
import { useAuth0 } from "@auth0/auth0-react";

import SelectionButton from "./SelectionButton";
import TeamDisplay from "../General/TeamDisplay";
import DateTag from "../General/DateTag";
import dateParser from "../../utils/dateParser";
import { BYE_WEEK_START, BYE_WEEK_END } from "../../utils/constants/bye-week";

const fetchUserData = (id: string, callback: (arg0: UserType[]) => void) => {
  axios
    .get(`/user/${id}`)
    .then((response) => {
      callback(response.data);
    })
    .catch((error) => {
      console.error(
        `Encountered an error while retrieving the user data: ${error}`
      );
    });
};

const putUserSelections = (
  id: string,
  body: any,
  callback: (arg0: any, arg1: boolean) => void
) => {
  axios
    .put(`/user/${id}`, body)
    .then((response) => {
      callback(response.data.message, false);
    })
    .catch((error) => {
      callback(error.message, true);
    });
};

const PickTeam = (props: { width: "xs" | "sm" | "md" | "lg" | "xl" }) => {
  const [week, setWeek] = useState(getCurrentWeek());

  const [games, setGames] = useState<GameType[]>([]);
  const [isLoadedGame, setIsLoadedGames] = useState(false);

  const [teamMap, setTeamMap] = useState(new Map<string, TeamType>());
  const [isLoadedTeamMap, setIsLoadedTeamMap] = useState(false);

  const { user } = useAuth0();

  const [savedSelections, setSavedSelections] = useState<
    (string | number | undefined)[]
  >([]);
  const [selectionA, setSelectionA] = useState("");
  const [selectionB, setSelectionB] = useState("");
  const [isLoadedUser, setIsLoadedUser] = useState(false);

  // Snackbar

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

  const width = props.width;

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
    fetchUserData(user.sub, (data) => {
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
    fetchGames(week, (data) => {
      setGames(data);
      setIsLoadedGames(true);
    });
    fetchTeamMap((data) => {
      setTeamMap(data);
      setIsLoadedTeamMap(true);
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

  const AreTwoTeamsSelected = (): boolean => {
    return selectionA !== "" && selectionB !== "";
  };

  return (
    <Box>
      <WeekPicker week={week} setWeek={setWeek} />
      <Box pb={2}>
        {isLoadedGame && isLoadedTeamMap && isLoadedUser ? (
          <GridList cellHeight={"auto"} cols={1}>
            {games.map((game) => {
              const { dateString, isOver } = dateParser(game.startTime);
              const statusString = isOver ? "CLOSED" : "OPEN";
              return (
                <GridListTile key={game.id}>
                  <DateTag
                    firstString={dateString}
                    secondString={statusString}
                  />
                  <Box display="flex" flexDirection="row">
                    <SelectionButton
                      team={game.homeTeam}
                      disabled={isOver}
                      savedSelections={savedSelections}
                      handleTeamSelect={handleTeamSelect}
                      isTeamSelected={isTeamSelected}
                      AreTwoTeamsSelected={AreTwoTeamsSelected}
                    >
                      <TeamDisplay
                        width={width}
                        team={teamMap.get(game.homeTeam)}
                      />
                    </SelectionButton>
                    <SelectionButton
                      team={game.visTeam}
                      disabled={isOver}
                      savedSelections={savedSelections}
                      handleTeamSelect={handleTeamSelect}
                      isTeamSelected={isTeamSelected}
                      AreTwoTeamsSelected={AreTwoTeamsSelected}
                    >
                      <TeamDisplay
                        width={width}
                        team={teamMap.get(game.visTeam)}
                      />
                    </SelectionButton>
                  </Box>
                </GridListTile>
              );
            })}
            {week < BYE_WEEK_END && week > BYE_WEEK_START && (
              <div>
                <DateTag
                  firstString={`Use By Week ${BYE_WEEK_END}`}
                  secondString={"OPEN"}
                />
                <Box display="flex" flexDirection="row">
                  <SelectionButton
                    team="BYE1"
                    disabled={false}
                    savedSelections={savedSelections}
                    handleTeamSelect={handleTeamSelect}
                    isTeamSelected={isTeamSelected}
                    AreTwoTeamsSelected={AreTwoTeamsSelected}
                  >
                    <TeamDisplay width={width} team={teamMap.get("BYE1")} />
                  </SelectionButton>
                  <SelectionButton
                    team={"BYE2"}
                    disabled={false}
                    savedSelections={savedSelections}
                    handleTeamSelect={handleTeamSelect}
                    isTeamSelected={isTeamSelected}
                    AreTwoTeamsSelected={AreTwoTeamsSelected}
                  >
                    <TeamDisplay width={width} team={teamMap.get("BYE2")} />
                  </SelectionButton>
                </Box>
              </div>
            )}
          </GridList>
        ) : (
          <LinearProgress />
        )}
      </Box>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={putUserSelectionsCallback}
        disabled={selectionA === "" || selectionB === ""}
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

export default withWidth()(PickTeam);
