import axios from "axios";
import { pickBy, startsWith } from "lodash";

import React, { useEffect, useState, useCallback } from "react";
import withWidth from "@material-ui/core/withWidth";

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
    sort: JSON.stringify(["score", "asc"]),
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
              backgroundColor: "#01579b",
              color: "#FFF",
            },
          }}
          // @ts-ignore
          columns={columnLabels.map((col) => {
            if (
              col.field == `wk${currentWeek - 1}A` ||
              col.field == `wk${currentWeek - 1}B`
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
                      border={1}
                    />
                  );
                },
              };
            } else if (col.title == "name") {
              return {
                title: col.title,
                field: "firstName",
                render: (rowData) => {
                  return `${rowData.firstName} ${rowData.lastName}`;
                },
              };
            } else if (col.title == "W-L-T") {
              return {
                title: col.title,
                render: (rowData) => {
                  return `${rowData.numOfWin}-${rowData.numOfLoss}-${rowData.numOfTie}`;
                },
              };
            }
            return col;
          })}
          data={users}
          detailPanel={(rowData) => {
            return (
              <Box p={2}>
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
