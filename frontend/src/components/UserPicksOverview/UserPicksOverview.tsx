import { startsWith } from "lodash";

import { useAuth0 } from "@auth0/auth0-react";

import React, { useEffect, useState } from "react";
import withWidth from "@material-ui/core/withWidth";
import { useTheme } from "@material-ui/core";

import MaterialTable from "material-table";

import LinearProgress from "@material-ui/core/LinearProgress";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import getCurrentWeek from "../../utils/getCurrentWeek";

import fetchUsers from "../../utils/api-handlers/fetchUsers";
import UserType from "../../utils/types/UserType";
import UserNotRegistered from "../General/UserNotRegistered";

import fetchTeamMap from "../../utils/api-handlers/fetchTeamMap";
import TeamType from "../../utils/types/TeamType";

const highlightColor = "#ffed46";

const UserPickOverview = () => {
  const theme = useTheme();

  const { user } = useAuth0();
  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoadedUsers, setIsLoadedUsers] = useState(false);
  const [isRegisteredUser, setIsRegisteredUser] = useState(true);

  const currentWeek = getCurrentWeek();
  const bannerMessage = `If name is red, you have not picked teams for week ${currentWeek}`;

  const [teamMap, setTeamMap] = useState(new Map<string, TeamType>());
  const [isLoadedTeamMap, setIsLoadedTeamMap] = useState(false);

  // Fetch on initial render
  useEffect(() => {
    fetchUsers((data) => {
      const listOfUserIds: string[] = [];
      data.forEach((element: UserType) => {
        listOfUserIds.push(element.id);
      });
      if (listOfUserIds.includes(user.sub)) {
        setUsers(data);
        setIsLoadedUsers(true);
        fetchTeamMap((teamMapData) => {
          setTeamMap(teamMapData);
          setIsLoadedTeamMap(true);
        });
      } else {
        setIsRegisteredUser(false);
      }
    });
  }, [user.sub]);

  if (!isRegisteredUser) {
    return <UserNotRegistered />;
  }

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
              user.sub === rowData.id
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
                    ? "black"
                    : "red";
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
                } catch {
                  console.log("team", team);
                }
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

export default withWidth()(UserPickOverview);
