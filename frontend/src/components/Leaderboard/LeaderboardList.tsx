import React from "react";
import Box from "@material-ui/core/Box";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Typography from "@material-ui/core/Typography";

import MaterialTable from "material-table";

import { pickBy, startsWith } from "lodash";

import UserType from "../../utils/types/UserType";
import { TEAMS } from "../../utils/constants/teams";
import getCurrentWeek from "../../utils/getCurrentWeek";
import { TeamToWinLossMap } from "../../utils/types/TeamType";
import TeamDisplay from "../General/TeamDisplay";

const getTableItemColor = (status: number) => {
  console.log("STA", status);
  let color = "";
  switch (status) {
    case 1:
      color = "yellow";
      break;
    case 2:
      color = "green";
      break;
    case 0:
      color = "red";
      break;
  }
  return color;
};

const WeekSummary = ({
  rowData,
  teamWinLossMap,
}: {
  rowData: UserType;
  teamWinLossMap: TeamToWinLossMap;
}) => {
  const weeks = [];
  for (let i = 1; i <= 17; i++) {
    weeks.push(i);
  }
  return (
    <Box py={1}>
      <Typography variant="h6" color="primary">
        Week Summary
      </Typography>
      <GridList cellHeight="auto" cols={2}>
        {weeks.map((week) => {
          // @ts-ignore
          const teamA = rowData[`wk${week}A`];
          // @ts-ignore
          const colorA = getTableItemColor(
            // @ts-ignore
            rowData[`sc${week}A`]
          );
          // @ts-ignore
          const teamB = rowData[`wk${week}B`];
          const colorB = getTableItemColor(
            // @ts-ignore
            rowData[`sc${week}A`]
          );
          return (
            <GridListTile key={week}>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-around"
                bgcolor="white"
              >
                <Box p={1}>
                  <Typography variant="h6" color="primary">
                    {week}
                  </Typography>
                </Box>
                <Box p={1} bgcolor={colorA}>
                  <TeamDisplay team={teamA} teamWinLossMap={teamWinLossMap} />
                </Box>
                <Box p={1} bgcolor={colorB}>
                  <TeamDisplay team={teamB} teamWinLossMap={teamWinLossMap} />
                </Box>
              </Box>
            </GridListTile>
          );
        })}
      </GridList>
    </Box>
  );
};

const getSelectedTeams = (rowData: UserType) => {
  const selectedTeams = pickBy(rowData, (value, key) => startsWith(key, "wk"));
  const selectedTeamsStrings = Object.values(selectedTeams);
  return selectedTeamsStrings;
};

const RemainingTeams = ({
  rowData,
  teamWinLossMap,
}: {
  rowData: UserType;
  teamWinLossMap: TeamToWinLossMap;
}) => {
  const selectedTeams = getSelectedTeams(rowData);
  return (
    <Box py={1}>
      <Typography variant="h6" color="primary">
        Picked
      </Typography>
      <GridList cellHeight="auto" cols={4}>
        {TEAMS.map((team) => {
          const bgcolor = selectedTeams.includes(team) ? "yellow" : "white";
          const color = selectedTeams.includes(team) ? "gray" : "black";
          return (
            <GridListTile key={team}>
              <Box p={1} bgcolor={bgcolor} color={color}>
                <TeamDisplay team={team} teamWinLossMap={teamWinLossMap} />
              </Box>
            </GridListTile>
          );
        })}
      </GridList>
    </Box>
  );
};

interface LeaderboardListProps {
  users: UserType[];
  loading: boolean;
  teamWinLossMap: TeamToWinLossMap;
}

const LeaderboardList = (props: LeaderboardListProps) => {
  // Show loading message
  if (props.loading) return <p>Game table is loading...</p>;

  let rank = 0;
  let score = 0;
  if (props.users.length > 0) {
    props.users.forEach((user) => {
      if (user.score !== score) {
        rank += 1;
        score = user.score;
      }
      user.rank = rank;
    });
  }

  const currentWeek = getCurrentWeek();
  const columnLabels = ["rank", "username", "score", "A", "B"];

  return (
    <div>
      <MaterialTable
        title="Users"
        // @ts-ignore
        columns={columnLabels.map((key) => {
          if (key == "A" || key == "B") {
            const field = `wk${currentWeek - 1}${key}`;
            return {
              title: field,
              field: field,
              render: (rowData) => {
                let color = getTableItemColor(
                  rowData[`sc$${currentWeek - 1}${key}`]
                );
                return <Box color={color}>{rowData[field]}</Box>;
              },
            };
          }
          return {
            title: key,
            field: key,
          };
        })}
        data={props.users}
        detailPanel={(rowData) => {
          return (
            <Box bgcolor="white" p={2}>
              <WeekSummary
                rowData={rowData}
                teamWinLossMap={props.teamWinLossMap}
              />
              <RemainingTeams
                rowData={rowData}
                teamWinLossMap={props.teamWinLossMap}
              />
            </Box>
          );
        }}
      />
    </div>
  );
};

export default LeaderboardList;
