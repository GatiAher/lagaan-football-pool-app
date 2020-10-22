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

import fetchUsers from "../../utils/api-handlers/fetchUsers";
import UserType from "../../utils/types/UserType";

import fetchTeamMap from "../../utils/api-handlers/fetchTeamMap";
import TeamType from "../../utils/types/TeamType";
import { TEAMS } from "../../utils/constants/teams";
// TODO: replace or remove
import TeamDisplay from "../WeekDisplay/TeamDisplayWWOStatus";

import UserNotRegistered from "../General/UserNotRegistered";

// TODO: clean up

const highlightColor = "#ffed46";

const getSelectedTeams = (rowData: UserType) => {
  const selectedTeams = pickBy(rowData, (value, key) => startsWith(key, "wk"));
  const selectedTeamsStrings = Object.values(selectedTeams);
  return selectedTeamsStrings;
};

const RemainingTeams = ({
  rowData,
  teamMap,
  width,
}: {
  rowData: UserType;
  teamMap: Map<string, TeamType>;
  width: "xs" | "sm" | "md" | "lg" | "xl";
}) => {
  const selectedTeams = getSelectedTeams(rowData);
  const numCols = width === "xs" || width === "sm" ? 4 : 6;
  console.log("WIDTH", width, numCols);
  return (
    <Box py={1}>
      <Typography variant="h6" color="primary">
        Selections
      </Typography>
      <GridList cellHeight="auto" cols={numCols}>
        {TEAMS.map((team) => {
          const bgcolor = selectedTeams.includes(team)
            ? highlightColor
            : "white";
          return (
            <GridListTile key={team}>
              <Box bgcolor={bgcolor}>
                <TeamDisplay width="xs" team={teamMap.get(team)} border={0} />
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

  const [teamMap, setTeamMap] = useState(new Map<string, TeamType>());
  const [isLoadedTeamMap, setIsLoadedTeamMap] = useState(false);

  const [isRegisteredUser, setIsRegisteredUser] = useState(true);

  // Fetch on initial render
  useEffect(() => {
    fetchUsers((data) => {
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
    if (isRegisteredUser) {
      fetchTeamMap((data) => {
        setTeamMap(data);
        setIsLoadedTeamMap(true);
      });
    }
  }, []);

  if (!isRegisteredUser) {
    return <UserNotRegistered />;
  }

  const currentWeek = getCurrentWeek();
  const columnLabels = [
    { title: "rank", field: "rank" },
    { title: "name" },
    { title: "W-L-T" },
    { title: `week ${currentWeek - 1}`, field: `wk${currentWeek - 1}A` },
    { title: `week ${currentWeek - 1}`, field: `wk${currentWeek - 1}B` },
    { title: "score", field: "score" },
  ];

  return (
    <div>
      <Typography gutterBottom>
        {`If name is red, you have not picked teams for week ${currentWeek}`}
      </Typography>
      {isLoadedUsers && isLoadedTeamMap ? (
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
            if (
              col.field === `wk${currentWeek - 1}A` ||
              col.field === `wk${currentWeek - 1}B`
            ) {
              return {
                title: col.title,
                field: col.field,
                render: (rowData) => {
                  let selection = rowData[col.field]
                    ? rowData[col.field]
                    : "empty";
                  return (
                    <TeamDisplay
                      width="xs"
                      team={teamMap.get(selection)}
                      week={currentWeek - 1}
                      border={1}
                    />
                  );
                },
              };
            } else if (col.title === "name") {
              return {
                title: col.title,
                field: "firstName",
                render: (rowData) => {
                  let color =
                    rowData[`wk${currentWeek}A`] && rowData[`wk${currentWeek}B`]
                      ? "black"
                      : "red";
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
                  teamMap={teamMap}
                  width={width}
                />
              </Box>
            );
          }}
        />
      ) : (
        <LinearProgress />
      )}
    </div>
  );
};

export default withWidth()(Leaderboard);
