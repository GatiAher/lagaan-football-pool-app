import React from "react";

import withWidth from "@material-ui/core/withWidth";
import { useTheme } from "@material-ui/core";

import MaterialTable from "material-table";

import LinearProgress from "@material-ui/core/LinearProgress";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import RemainingTeams from "./RemainingTeams";

import UserType from "../../types/UserType";

const highlightColor = "#ebe76c";

type LeaderboardViewProps = {
  width: "xs" | "sm" | "md" | "lg" | "xl";
  userSub: string;
  users: UserType[];
  isLoadedUsers: boolean;
  currentWeek: number;
};

const LeaderboardView = ({
  width,
  userSub,
  users,
  isLoadedUsers,
  currentWeek,
}: LeaderboardViewProps) => {
  const theme = useTheme();

  const metricField = currentWeek > 17 ? "scorePlayoff" : "score";

  const DetailPanel = () => {
    if (currentWeek < 17) {
      return (rowData: UserType) => (
        <Box p={2} bgcolor={theme.palette.background.default}>
          <RemainingTeams
            rowData={rowData}
            width={width}
            currentWeek={currentWeek}
            userSub={userSub}
          />
        </Box>
      );
    }
    return undefined;
  };

  let bannerMessage = `Regular Season: If name is blue, you have picked 2 teams for week ${currentWeek}`;
  if (currentWeek > 17) {
    bannerMessage = `Post-Season: If name is blue, you have picked a team for week ${currentWeek}`;
  }
  if (currentWeek > 21) {
    bannerMessage = `Season is over.`;
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
    { title: "name" },
    { title: "score", field: metricField },
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
              userSub === rowData.id
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
                let color = "black";
                if (
                  currentWeek <= 17 &&
                  rowData[`wk${currentWeek}A`] &&
                  rowData[`wk${currentWeek}B`]
                ) {
                  color = "blue";
                } else if (
                  currentWeek > 17 &&
                  (rowData[`wk${currentWeek}A`] ||
                    rowData[`wk${currentWeek}B`] ||
                    rowData[`wk${currentWeek}C`] ||
                    rowData[`wk${currentWeek}D`] ||
                    rowData[`wk${currentWeek}E`] ||
                    rowData[`wk${currentWeek}F`])
                ) {
                  color = "blue";
                }
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
                if (metricField === "score") {
                  return `${rowData.numOfWin}-${rowData.numOfLoss}-${rowData.numOfTie}`;
                }
                return `${rowData.numOfWinPlayoff}-${rowData.numOfLossPlayoff}-${rowData.numOfTiePlayoff}`;
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
        detailPanel={DetailPanel()}
      />
    </div>
  );
};

export default withWidth()(LeaderboardView);
