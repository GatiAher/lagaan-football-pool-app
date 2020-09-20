import React from "react";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import Typography from "@material-ui/core/Typography";

import GameType from "../../utils/types/GameType";
import DateDisplay from "../General/DateDisplay";
import TeamLogo from "../General/TeamLogo";

const TeamListStatusIndicatorIcon = ({ status }: { status: number }) => {
  const theme = useTheme();
  const colorArrow =
    status !== 2
      ? theme.palette.background.default
      : theme.palette.common.black;
  return <ArrowLeftIcon style={{ color: colorArrow }} />;
};

const TeamListItem = ({
  team,
  points,
  status,
}: {
  team: string;
  points: number;
  status: number;
}) => {
  const colorText =
    status === 2 || status === -1 ? "textPrimary" : "textSecondary";
  return (
    <ListItem color={colorText} button={false} style={{ padding: 0 }}>
      <ListItemAvatar>
        <TeamLogo team={team} />
      </ListItemAvatar>
      <ListItemText>
        <Typography color={colorText}>{team}</Typography>
      </ListItemText>
      {status !== -1 && (
        <ListItemSecondaryAction
          style={{
            right: 0,
            display: "flex",
            flexDirection: "row",
            margin: 0,
            padding: 0,
          }}
        >
          <Typography color={colorText}>{points}</Typography>
          <TeamListStatusIndicatorIcon status={status} />
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

const SeasonGameListRow = ({ game }: { game: GameType }) => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      bgcolor={theme.palette.background.default}
      py={4}
      pl={3}
    >
      <Box borderRight={1} color={theme.palette.grey.A200} width="60%" p={0}>
        <List dense={true} style={{ padding: 0, margin: 0 }}>
          <TeamListItem
            team={game.visTeam}
            points={game.visPts}
            status={game.visStatus}
          />
          <TeamListItem
            team={game.homeTeam}
            points={game.homePts}
            status={game.homeStatus}
          />
        </List>
      </Box>
      <Box m="auto">
        <DateDisplay miliseconds={game.startTime} />
      </Box>
    </Box>
  );
};

export default SeasonGameListRow;
