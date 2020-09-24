import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import MaterialTable from "material-table";

import { pickBy, startsWith } from "lodash";

import UserType from "../../utils/types/UserType";
import { TEAMS } from "../../utils/constants/teams";
import TeamLogo from "../General/TeamLogo";
import { Avatar } from "@material-ui/core";

const getSelectedTeams = (rowData: UserType) => {
  const selectedTeams = pickBy(rowData, (value, key) => startsWith(key, "wk"));
  const selectedTeamsStrings = Object.values(selectedTeams);
  return selectedTeamsStrings;
};

const getTableItemColor = (status: number) => {
  let color = "grey";
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

interface LeaderboardListProps {
  users: UserType[];
  loading: boolean;
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

  const columnLabels = ["rank", "username", "score"];
  for (var i = 1; i <= 17; i++) {
    columnLabels.push(`wk${i}A`);
    columnLabels.push(`wk${i}B`);
  }

  return (
    <div>
      <MaterialTable
        title="Users"
        // @ts-ignore
        columns={columnLabels.map((key) => {
          if (startsWith(key, "wk")) {
            return {
              title: key,
              field: key,
              render: (rowData) => {
                let idx = key.substring(2);
                console.log(rowData[`sc${idx}`]);
                let color = getTableItemColor(rowData[`sc${idx}`]);
                return <Box color={color}>{rowData[key]}</Box>;
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
          const selectedTeams = getSelectedTeams(rowData);
          return (
            <Box bgcolor="black" p={2}>
              <Typography variant="h6" color="primary">
                Not Picked
              </Typography>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-evenly"
                p={1}
              >
                {TEAMS.map((team) => {
                  const bgcolor = selectedTeams.includes(team)
                    ? "black"
                    : "white";
                  const color = selectedTeams.includes(team) ? "gray" : "black";
                  return (
                    <Box
                      border={1}
                      color={color}
                      bgcolor={bgcolor}
                      display="flex"
                      flexDirection="row"
                    >
                      <TeamLogo team={team} />
                      {team}
                    </Box>
                  );
                })}
              </Box>
            </Box>
          );
        }}
      />
    </div>
  );
};

export default LeaderboardList;
