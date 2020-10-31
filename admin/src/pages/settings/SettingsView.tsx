import * as React from "react";

import Box from "@material-ui/core/Box";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

import Typography from "@material-ui/core/Typography";

import SettingsOptionView from "./SettingOptionView";

interface SettingsViewI {
  scoreUser: () => void;
  scoreTeam: () => void;
  clearUser: () => void;
  clearTeam: () => void;
  clearGame: () => void;
  resetUser: () => void;
  resetTeam: () => void;
  resetGame: () => void;
}

const dangerColor = "#cb2431";

const SettingsView = (props: SettingsViewI) => {
  return (
    <Card>
      <CardHeader title="Settings" />
      <CardContent>
        <Typography variant="h6">Score Calculation</Typography>
        <Divider />
        <List>
          <SettingsOptionView
            primaryText="Score Users"
            secondaryText="Re-calculate user scores"
            onClick={props.scoreUser}
          />
          <SettingsOptionView
            primaryText="Score Teams"
            secondaryText="Re-calculate team scores"
            onClick={props.scoreTeam}
          />
        </List>
        <Typography variant="h6">Danger Zone</Typography>
        <Box border={1} color={dangerColor} borderRadius={4}>
          <List>
            <SettingsOptionView
              primaryText="Clear Users"
              secondaryText="Remove all users"
              type="danger"
              onClick={props.clearUser}
            />
            <SettingsOptionView
              primaryText="Clear Team"
              secondaryText="Remove all teams"
              type="danger"
              onClick={props.clearTeam}
            />
            <SettingsOptionView
              primaryText="Clear Games"
              secondaryText="Remove all games"
              type="danger"
              onClick={props.clearGame}
            />
            <Divider />
            <SettingsOptionView
              primaryText="Reset Users"
              secondaryText="Clear user season info"
              type="danger"
              onClick={props.resetUser}
            />
            <SettingsOptionView
              primaryText="Reset Teams"
              secondaryText="Clear team season info"
              type="danger"
              onClick={props.resetTeam}
            />
            <SettingsOptionView
              primaryText="Reset Games"
              secondaryText="! Replace with dumb data"
              type="danger"
              onClick={props.resetGame}
            />
          </List>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SettingsView;
