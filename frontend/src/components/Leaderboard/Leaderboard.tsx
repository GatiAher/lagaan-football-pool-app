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
import { colors } from "@material-ui/core";

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

const Leaderboard = (props: { width: "xs" | "sm" | "md" | "lg" | "xl" }) => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoadedUsers, setIsLoadedUsers] = useState(false);

  const [teamMap, setTeamMap] = useState(new Map<string, TeamType>());
  const [isLoadedTeamMap, setIsLoadedTeamMap] = useState(false);

  const width = props.width;

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
    { title: "name", field: "name" },
    { title: "win", field: "numOfWin" },
    { title: "loss", field: "numOfLoss" },
    { title: "tie", field: "numOfTie" },
    { title: `week ${currentWeek - 1}`, field: `wk${currentWeek - 1}A` },
    { title: `week ${currentWeek - 1}`, field: `wk${currentWeek - 1}B` },
    { title: "score", field: "score" },
  ];

  return (
    <div>
      {isLoadedUsers && isLoadedTeamMap ? (
        <MaterialTable
          title="Users"
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
                  return <Box>{selection}</Box>;
                },
              };
            } else if (col.field == "name") {
              return {
                title: col.title,
                field: col.field,
                render: (rowData) => {
                  return (
                    <Box>{`${rowData.firstName} ${rowData.lastName}`}</Box>
                  );
                },
              };
            }
            return {
              title: col.title,
              field: col.field,
            };
          })}
          data={users}
          detailPanel={(rowData) => {
            return (
              <Box bgcolor="white" p={2}>
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
