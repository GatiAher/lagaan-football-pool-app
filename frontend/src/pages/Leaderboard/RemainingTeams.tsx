import React from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import UserType from "../../types/UserType";
import { pickBy, startsWith } from "lodash";

import { TEAMS } from "./teams";

const pastSelectionsHighlightColor = "#ffed46";
const futureSelectionsHighlightColor = "DeepSkyBlue";

const getSelectedTeams = (
  rowData: UserType,
  currentWeek: number,
  mode?: "past" | "future"
) => {
  const thisMode = mode || "past";
  const selectedTeams = pickBy(rowData, (value, key) => {
    if (startsWith(key, "wk")) {
      const found = key.match(/(\d)+/g);
      if (found) {
        const weekNum = parseInt(found[0], 10);
        if (thisMode === "past" && weekNum < currentWeek) {
          return true;
        } else if (
          thisMode === "future" &&
          weekNum >= currentWeek &&
          weekNum <= 17
        ) {
          return true;
        }
      }
    }
    return false;
  });
  return Object.values(selectedTeams);
};

type RemainingTeamsProps = {
  rowData: UserType;
  width: "xs" | "sm" | "md" | "lg" | "xl";
  currentWeek: number;
  userSub: string;
};

const RemainingTeams = ({
  rowData,
  width,
  currentWeek,
  userSub,
}: RemainingTeamsProps) => {
  const numCols = width === "xs" || width === "sm" ? 4 : 8;
  const isCurrentUser = userSub === rowData.id;
  const pastSelectedTeams = getSelectedTeams(rowData, currentWeek, "past");
  const futureSelectedTeams: (string | number | undefined)[] = isCurrentUser
    ? getSelectedTeams(rowData, currentWeek, "future")
    : [];

  return (
    <Box py={1}>
      <Typography variant="h6" color="primary">
        {`Regular Season Picks:`}
      </Typography>
      <GridList cellHeight="auto" cols={numCols}>
        {TEAMS.map((team) => {
          let bgcolor = "white";
          let wk = "__";
          if (pastSelectedTeams.includes(team)) {
            bgcolor = pastSelectionsHighlightColor;
            if (isCurrentUser) {
              let wkNum = Math.floor(pastSelectedTeams.indexOf(team) / 2) + 1;
              wk = wkNum.toString().padStart(2, "0");
            }
          }
          if (isCurrentUser) {
            if (futureSelectedTeams.includes(team)) {
              bgcolor = futureSelectionsHighlightColor;
              let wkNum =
                Math.floor(futureSelectedTeams.indexOf(team) / 2) + currentWeek;
              wk = wkNum.toString().padStart(2, "0");
            }
            return (
              <GridListTile key={team}>
                <Box
                  bgcolor={bgcolor}
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-around"
                >
                  <Typography align="center" variant="body2">
                    {wk}
                  </Typography>
                  <Typography align="center" variant="body2">
                    {team}
                  </Typography>
                </Box>
              </GridListTile>
            );
          }
          return (
            <GridListTile key={team}>
              <Box bgcolor={bgcolor}>
                <Typography align="center" variant="body2">
                  {team}
                </Typography>
              </Box>
            </GridListTile>
          );
        })}
      </GridList>
    </Box>
  );
};

export default RemainingTeams;
