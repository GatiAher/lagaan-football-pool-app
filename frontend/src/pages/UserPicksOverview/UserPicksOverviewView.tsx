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

const highlightColor = "#ebe76c";

const getWinningScores = (
  users: UserType[],
  metricField: "score" | "scorePlayoff"
) => {
  const allScores = users.map((u) => u[metricField]);
  const distinctScores = allScores.filter((n, i) => allScores.indexOf(n) === i);
  // sort in desc
  const sortedScores = distinctScores.sort((a, b) => b - a);
  return sortedScores.slice(0, 3);
};

type UserPickOverviewViewProps = {
  currentWeek: number;
  currentUserSub: string;
  users: UserType[];
  isLoadedUsers: boolean;
  teamMap: Map<string, TeamType>;
  isLoadedTeamMap: boolean;
  metricField: "score" | "scorePlayoff";
};

const UserPickOverviewView = ({
  currentWeek,
  currentUserSub,
  users,
  isLoadedUsers,
  teamMap,
  isLoadedTeamMap,
  metricField,
}: UserPickOverviewViewProps) => {
  const theme = useTheme();

  let bannerMessage = ``;
  if (currentWeek <= 17 && metricField === "score") {
    bannerMessage = `If name is blue, you have picked 2 teams for week ${currentWeek}`;
  }
  if (currentWeek > 17 && metricField === "scorePlayoff") {
    bannerMessage = `If name is blue, you have picked a team for week ${currentWeek}`;
  }

  if (!isLoadedUsers || !isLoadedTeamMap) {
    return (
      <Box>
        <Typography gutterBottom>{bannerMessage}</Typography>
        <LinearProgress />
      </Box>
    );
  }

  const cellStyle = () => {
    return {
      margin: 0,
      padding: 0,
    };
  };

  type columnLabelsType = { title: string; field?: string };
  const columnLabels: columnLabelsType[] = [
    { title: metricField, field: metricField },
    { title: "name" },
  ];

  if (metricField === "score") {
    // show up to week 17
    const visibleRegSeason = currentWeek <= 17 ? currentWeek - 1 : 17;
    for (let i = visibleRegSeason; i > 0; i--) {
      columnLabels.push(
        {
          title: `${i}A`,
          field: `wk${i}A`,
        },
        {
          title: `${i}B`,
          field: `wk${i}B`,
        }
      );
    }
  } else if (metricField === "scorePlayoff") {
    if (currentWeek >= 21) {
      columnLabels.push({
        title: `21A`,
        field: `wk21A`,
      });
    }
    if (currentWeek >= 20) {
      columnLabels.push(
        {
          title: `20A`,
          field: `wk20A`,
        },
        {
          title: `20B`,
          field: `wk20B`,
        }
      );
    }
    if (currentWeek >= 19) {
      columnLabels.push(
        {
          title: `19A`,
          field: `wk19A`,
        },
        {
          title: `19B`,
          field: `wk19B`,
        },
        {
          title: `19C`,
          field: `wk19C`,
        },
        {
          title: `19D`,
          field: `wk19D`,
        }
      );
    }
    if (currentWeek > 18) {
      columnLabels.push(
        {
          title: `18A`,
          field: `wk18A`,
        },
        {
          title: `18B`,
          field: `wk18B`,
        },
        {
          title: `18C`,
          field: `wk18C`,
        },
        {
          title: `18D`,
          field: `wk18D`,
        },
        {
          title: `18E`,
          field: `wk18E`,
        },
        {
          title: `18F`,
          field: `wk18F`,
        }
      );
    }
  }

  // highlight winners
  let winningScores = [-1, -1, -1];
  if (
    (currentWeek > 17 && metricField === "score") ||
    (currentWeek > 21 && metricField === "scorePlayoff")
  ) {
    winningScores = getWinningScores(users, metricField);
  }

  console.log(currentWeek);

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
            padding: "1px",
            paddingLeft: "16px",
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
              cellStyle: cellStyle,
              render: (rowData) => {
                let color = "black";
                if (
                  currentWeek <= 17 &&
                  metricField === "score" &&
                  rowData[`wk${currentWeek}A`] &&
                  rowData[`wk${currentWeek}B`]
                ) {
                  color = "blue";
                } else if (
                  currentWeek > 17 &&
                  metricField === "scorePlayoff" &&
                  rowData[`wk${currentWeek}A`]
                ) {
                  color = "blue";
                }
                if (
                  (currentWeek > 17 && metricField === "score") ||
                  (currentWeek > 21 && metricField === "scorePlayoff")
                ) {
                  if (rowData[metricField] === winningScores[2]) {
                    color = "#c47448";
                  } else if (rowData[metricField] === winningScores[1]) {
                    color = "#989da3";
                  } else if (rowData[metricField] === winningScores[0]) {
                    color = "#bb911a";
                  }
                }
                return (
                  <Box
                    minWidth="150px"
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
              cellStyle: cellStyle,
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
                  textColor = theme.palette.grey[100];
                  bgcolor = theme.palette.error.dark;
                } else if (status === "tie") {
                  textColor = theme.palette.grey.A700;
                  bgcolor = theme.palette.grey[300];
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
            cellStyle: cellStyle,
            render: (rowData) => (
              <Box pl="16px" fontWeight="fontWeightBold">
                {rowData[col.field]}
              </Box>
            ),
          };
        })}
        data={users}
      />
    </div>
  );
};

export default withWidth()(UserPickOverviewView);
