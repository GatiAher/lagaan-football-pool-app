import { pickBy, startsWith } from "lodash";

import { useAuth0 } from "@auth0/auth0-react";

import React, { useEffect, useState } from "react";
import withWidth from "@material-ui/core/withWidth";
import { useTheme } from "@material-ui/core";

import MaterialTable from "material-table";

import LinearProgress from "@material-ui/core/LinearProgress";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

import getCurrentWeek from "../../utils/getCurrentWeek";

import api from "../../api";
import UserType from "../../types/UserType";
import UserNotRegistered from "../../frontend-components/UserNotRegistered";

import { TEAMS } from "./teams";

const highlightColor = "#ffed46";

const getPastSelectedTeams = (
  rowData: UserType,
  currentWeek: number,
  mode?: "past" | "future"
) => {
  const thisMode = mode || "past";
  const selectedTeams = pickBy(rowData, (value, key) => {
    if (startsWith(key, "wk")) {
      const regex = /(\d)+/g;
      const found = key.match(regex);
      if (found) {
        const weekNum = parseInt(found[0], 10);
        if (thisMode === "past" && weekNum < currentWeek) {
          return true;
        } else if (thisMode === "future" && weekNum >= currentWeek) {
          return true;
        }
      }
    }
    return false;
  });
  return Object.values(selectedTeams);
};

const RemainingTeams = ({
  rowData,
  width,
  currentWeek,
}: {
  rowData: UserType;
  width: "xs" | "sm" | "md" | "lg" | "xl";
  currentWeek: number;
}) => {
  const numCols = width === "xs" || width === "sm" ? 4 : 8;
  const { user } = useAuth0();
  const isCurrentUser = user.sub === rowData.id;
  const pastSelectedTeams = getPastSelectedTeams(rowData, currentWeek, "past");
  const futureSelectedTeams: (string | number | undefined)[] = isCurrentUser
    ? getPastSelectedTeams(rowData, currentWeek, "future")
    : [];

  return (
    <Box py={1}>
      <Typography variant="h6" color="primary">
        {`Picks Week 1 - Week ${currentWeek - 1}`}
      </Typography>
      <GridList cellHeight="auto" cols={numCols}>
        {TEAMS.map((team) => {
          let bgcolor = "white";
          let wk = "__";
          if (pastSelectedTeams.includes(team)) {
            bgcolor = highlightColor;
            if (isCurrentUser) {
              let wkNum = Math.floor(pastSelectedTeams.indexOf(team) / 2) + 1;
              wk = wkNum.toString().padStart(2, "0");
            }
          }
          if (isCurrentUser) {
            if (futureSelectedTeams.includes(team)) {
              bgcolor = "DeepSkyBlue";
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

const Leaderboard = ({
  width,
}: {
  width: "xs" | "sm" | "md" | "lg" | "xl";
}) => {
  const theme = useTheme();

  const { user } = useAuth0();
  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoadedUsers, setIsLoadedUsers] = useState(false);
  const [isRegisteredUser, setIsRegisteredUser] = useState(true);

  const currentWeek = getCurrentWeek();
  const bannerMessage = `If name is blue, you have picked teams for week ${currentWeek}`;

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
      } else {
        setIsRegisteredUser(false);
      }
    });
  }, [user.sub]);

  if (!isRegisteredUser) {
    return <UserNotRegistered />;
  }

  if (!isLoadedUsers) {
    return (
      <Box>
        <Typography gutterBottom>{bannerMessage}</Typography>
        <LinearProgress />
      </Box>
    );
  }

  const columnLabels = [
    { title: "rank", field: "rank" },
    { title: "name" },
    { title: "score", field: "score" },
    { title: "W-L-T" },
  ];

  return (
    <div>
      <Typography gutterBottom>{bannerMessage}</Typography>
      <MaterialTable
        title="Users"
        options={{
          exportButton: true,
          headerStyle: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.grey[100],
          },
          rowStyle: (rowData) => ({
            backgroundColor:
              user.sub === rowData.id
                ? highlightColor
                : theme.palette.background.paper,
          }),
          paging: false,
        }}
        // @ts-ignore
        columns={columnLabels.map((col) => {
          if (col.title === "name") {
            return {
              title: col.title,
              field: "firstName",
              render: (rowData) => {
                let color =
                  rowData[`wk${currentWeek}A`] && rowData[`wk${currentWeek}B`]
                    ? "blue"
                    : "black";
                return (
                  <Box
                    color={color}
                    fontWeight="fontWeightBold"
                  >{`${rowData.firstName} ${rowData.lastName}`}</Box>
                );
              },
            };
          } else if (col.title === "W-L-T") {
            return {
              title: col.title,
              render: (rowData) => {
                return `${rowData.numOfWin}-${rowData.numOfLoss}-${rowData.numOfTie}`;
              },
            };
          }
          return {
            title: col.title,
            field: col.field,
            render: (rowData) => (
              <Box fontWeight="fontWeightBold">{rowData[col.field]}</Box>
            ),
          };
        })}
        data={users}
        detailPanel={(rowData) => {
          return (
            <Box p={2} bgcolor={theme.palette.background.default}>
              <RemainingTeams
                rowData={rowData}
                width={width}
                currentWeek={currentWeek}
              />
            </Box>
          );
        }}
      />
    </div>
  );
};

export default withWidth()(Leaderboard);
