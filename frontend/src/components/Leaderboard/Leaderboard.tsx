import axios from "axios";
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

import UserType from "../../utils/types/UserType";

import fetchTeamMap from "../../utils/api-handlers/fetchTeamMap";
import TeamType from "../../utils/types/TeamType";
import { TEAMS } from "../../utils/constants/teams";
import TeamDisplay from "../General/TeamDisplay";

const fetchUsers = async (callback: (arg0: any) => void) => {
  const query = {
    sort: JSON.stringify(["score", "desc"]),
  };
  axios
    .get("/user", { params: query })
    .then((response) => {
      callback(response.data);
    })
    .catch((error) => {
      console.error(
        `Encountered an error while retrieving the game list: ${error}`
      );
    });
};

const getSelectedTeams = (rowData: UserType) => {
  const selectedTeams = pickBy(rowData, (value, key) => startsWith(key, "wk"));
  const selectedTeamsStrings = Object.values(selectedTeams);
  return selectedTeamsStrings;
};

const RemainingTeams = ({
  rowData,
  teamMap,
}: {
  rowData: UserType;
  teamMap: Map<string, TeamType>;
}) => {
  const selectedTeams = getSelectedTeams(rowData);
  return (
    <Box py={1}>
      <Typography variant="h6" color="primary">
        Selections
      </Typography>
      <GridList cellHeight="auto" cols={6}>
        {TEAMS.map((team) => {
          const bgcolor = selectedTeams.includes(team) ? "yellow" : "white";
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

const Leaderboard = () => {
  const theme = useTheme();

  const { user } = useAuth0();

  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoadedUsers, setIsLoadedUsers] = useState(false);

  const [teamMap, setTeamMap] = useState(new Map<string, TeamType>());
  const [isLoadedTeamMap, setIsLoadedTeamMap] = useState(false);

  // Fetch on initial render
  useEffect(() => {
    fetchTeamMap((data) => {
      setTeamMap(data);
      setIsLoadedTeamMap(true);
    });
    fetchUsers((data) => {
      setUsers(data);
      setIsLoadedUsers(true);
    });
  }, []);

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
                  ? "yellow"
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
                  return (
                    <Box fontWeight="fontWeightBold">{`${rowData.firstName} ${rowData.lastName}`}</Box>
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
                <RemainingTeams rowData={rowData} teamMap={teamMap} />
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
