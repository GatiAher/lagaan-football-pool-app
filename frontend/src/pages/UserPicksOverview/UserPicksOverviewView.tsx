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
const goldColor = "#c47448";
const silverColor = "#989da3";
const bronzeColor = "#bb911a";


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
  const regSeasonOver = currentWeek > 17;
  const playoffSeasonOver = currentWeek > 21;

  const currentDateObj = new Date();
  // if after Sunday 1pm or Monday, show current week
  // else show last week
  const showPremptively = (currentDateObj.getDay() === 0 && currentDateObj.getHours() >= 13) || currentDateObj.getDay() === 1;

  let bannerMessage = ``;
  if (!regSeasonOver && metricField === "score") {
    bannerMessage = `If name is blue, you have picked 2 teams for week ${currentWeek}`;
  }
  if (regSeasonOver && metricField === "score") {
    bannerMessage = `Season is over and winners have been declared.`;
  }
  if (!playoffSeasonOver && metricField === "scorePlayoff") {
    bannerMessage = `If name is blue, you have picked a team for week ${currentWeek}`;
  }
  if (playoffSeasonOver && metricField === "scorePlayoff") {
    bannerMessage = `Season is over and winners have been declared.`;
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
    { title: "score", field: metricField },
    { title: "name" },
  ];

  if (metricField === "score") {
    // show up to week 17
    let visibleRegSeason = 17;
    if (!regSeasonOver) {
      if (showPremptively) {
        visibleRegSeason = currentWeek;
      } else {
        visibleRegSeason = currentWeek - 1;
      }
    }

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
    if (currentWeek > 21 || (currentWeek === 21 && showPremptively)) {
      columnLabels.push({
        title: `21A`,
        field: `wk21A`,
      });
    }
    if (currentWeek > 20 || (currentWeek === 20 && showPremptively)) {
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
    if (currentWeek > 19 || (currentWeek === 19 && showPremptively)) {
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
    if (currentWeek > 18 || (currentWeek === 18 && showPremptively)) {
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
    (regSeasonOver && metricField === "score") ||
    (playoffSeasonOver && metricField === "scorePlayoff")
  ) {
    winningScores = getWinningScores(users, metricField);
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
                  (!regSeasonOver &&
                    metricField === "score" &&
                    rowData[`wk${currentWeek}A`] &&
                    rowData[`wk${currentWeek}B`]) ||
                  (regSeasonOver &&
                    metricField === "scorePlayoff" &&
                    (rowData[`wk${currentWeek}A`] ||
                      rowData[`wk${currentWeek}B`] ||
                      rowData[`wk${currentWeek}C`] ||
                      rowData[`wk${currentWeek}D`] ||
                      rowData[`wk${currentWeek}E`] ||
                      rowData[`wk${currentWeek}F`]))
                ) {
                  color = "blue";
                }
                if (
                  (regSeasonOver && metricField === "score") ||
                  (playoffSeasonOver && metricField === "scorePlayoff")
                ) {
                  if (rowData[metricField] === winningScores[2]) {
                    color = goldColor;
                  } else if (rowData[metricField] === winningScores[1]) {
                    color = silverColor;
                  } else if (rowData[metricField] === winningScores[0]) {
                    color = bronzeColor;
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
                if (startsWith(team, "BYE")) {
                  textColor = theme.palette.grey[100];
                  bgcolor = theme.palette.info.dark;
                }
                if (status === "win") {
                  textColor = theme.palette.grey[100];
                  bgcolor = theme.palette.success.dark;
                } else if (status === "loss") {
                  textColor = theme.palette.grey[100];
                  bgcolor = theme.palette.error.dark;
                } else if (status === "tie") {
                  textColor = theme.palette.grey.A700;
                  bgcolor = theme.palette.warning.light;
                }
                return (
                  <Box
                    fontWeight="fontWeightMedium"
                    color={textColor}
                    bgcolor={bgcolor}
                    textAlign="center"
                    ml="1px"
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
