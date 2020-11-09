import React from "react";
import withWidth from "@material-ui/core/withWidth";
import { useTheme } from "@material-ui/core";

import MaterialTable from "material-table";

import LinearProgress from "@material-ui/core/LinearProgress";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import UserType from "../../types/UserType";

import TeamType from "../../types/TeamType";

import { startsWith } from "lodash";

const highlightColor = "#ffed46";

type UserPickOverviewViewProps = {
  currentWeek: number;
  currentUserSub: string;
  users: UserType[];
  isLoadedUsers: boolean;
  teamMap: Map<string, TeamType>;
  isLoadedTeamMap: boolean;
};

const UserPickOverviewView = ({
  currentWeek,
  currentUserSub,
  users,
  isLoadedUsers,
  teamMap,
  isLoadedTeamMap,
}: UserPickOverviewViewProps) => {
  const theme = useTheme();

  const bannerMessage = `If name is blue, you have picked teams for week ${currentWeek}`;

  if (!isLoadedUsers || !isLoadedTeamMap) {
    return (
      <Box>
        <Typography gutterBottom>{bannerMessage}</Typography>
        <LinearProgress />
      </Box>
    );
  }

  const columnLabels = [
    { title: "rank", field: "rank" },
    { title: "score", field: "score" },
    { title: "name" },
  ];
  for (let i = currentWeek - 1; i > 0; i--) {
    columnLabels.push({
      title: `${i}A`,
      field: `wk${i}A`,
    });
    columnLabels.push({
      title: `${i}B`,
      field: `wk${i}B`,
    });
  }

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
              currentUserSub === rowData.id
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
          } else if (startsWith(col.field, "wk")) {
            return {
              title: col.title,
              field: col.field,
              render: (rowData) => {
                let team = rowData[col.field];
                // @ts-ignore
                const weekTag = col.field.slice(0, -1);
                let status = "default";
                try {
                  // @ts-ignore
                  status = teamMap.get(team)[weekTag];
                } catch {}
                let textColor = theme.palette.text.primary;
                let bgcolor = theme.palette.background.paper;
                if (status === "win") {
                  textColor = theme.palette.grey[100];
                  bgcolor = theme.palette.success.dark;
                } else if (status === "loss") {
                  textColor = theme.palette.error.dark;
                  bgcolor = theme.palette.error.light;
                } else if (status === "tie") {
                  textColor = theme.palette.grey.A700;
                  bgcolor = theme.palette.divider;
                }
                return (
                  <Box
                    fontWeight="fontWeightMedium"
                    color={textColor}
                    bgcolor={bgcolor}
                    textAlign="center"
                  >
                    {rowData[col.field]}
                  </Box>
                );
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
      />
    </div>
  );
};

export default withWidth()(UserPickOverviewView);
