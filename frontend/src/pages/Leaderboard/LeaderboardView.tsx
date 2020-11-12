import React from "react";

import withWidth from "@material-ui/core/withWidth";
import { useTheme } from "@material-ui/core";

import MaterialTable from "material-table";

import LinearProgress from "@material-ui/core/LinearProgress";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import RemainingTeams from "./RemainingTeams";

import UserType from "../../types/UserType";

const highlightColor = "#ffed46";

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

  const bannerMessage = `If name is blue, you have picked 2 teams for week ${currentWeek}`;

  if (!isLoadedUsers) {
    return (
      <Box>
        <Typography gutterBottom>{bannerMessage}</Typography>
        <LinearProgress />
      </Box>
    );
  }

  const columnLabels = [
    { title: "rank", field: "rank" },
    { title: "name" },
    { title: "score", field: "score" },
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
                width={width}
                currentWeek={currentWeek}
                userSub={userSub}
              />
            </Box>
          );
        }}
      />
    </div>
  );
};

export default withWidth()(LeaderboardView);
