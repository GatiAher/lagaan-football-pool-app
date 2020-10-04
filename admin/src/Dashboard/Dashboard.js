import * as React from "react";

import axios from "axios";

import { styled } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from "@material-ui/core";

const callTable = (resource, endpoint) => {
  axios
    .delete(`http://localhost:3001/${resource}/${endpoint}`)
    .then((response) => console.log(response))
    .catch((error) => {
      throw console.error(error);
    });
};

const DangerButton = styled(Button)({
  background: "white",
  borderRadius: 4,
  color: "#cb2431",
  "&:hover": {
    backgroundColor: "#cb2431",
    color: "white",
  },
});

const ClearOption = ({ resource }) => (
  <ListItem>
    <ListItemText
      primary={`Clear ${resource}`}
      secondary={`This will remove all items in the ${resource} table.`}
    />
    <ListItemSecondaryAction>
      <DangerButton
        variant="outlined"
        onClick={() => {
          callTable(resource, "clear");
        }}
      >{`Clear ${resource}`}</DangerButton>
    </ListItemSecondaryAction>
  </ListItem>
);

const ResetOption = ({ resource }) => (
  <ListItem>
    <ListItemText
      primary={`Reset ${resource}`}
      secondary={`This will remove all season data from ${resource} table, replacing items if appropriate.`}
    />
    <ListItemSecondaryAction>
      <DangerButton
        variant="outlined"
        onClick={() => {
          callTable(resource, "reset");
        }}
      >{`Reset ${resource}`}</DangerButton>
    </ListItemSecondaryAction>
  </ListItem>
);

export default () => (
  <Card>
    <CardHeader title="Welcome to the Admin Site" />
    <CardContent>
      You can create, read, update, and delete table data from here!
      <Box py={2}>
        <Typography variant="h6">Danger Zone</Typography>
        <Box py={2} border={1} color="#cb2431" borderRadius={4}>
          <List>
            <ResetOption resource="game" />
            <ResetOption resource="team" />
            <ResetOption resource="user" />
            <Divider />
            <ClearOption resource="game" />
            <ClearOption resource="team" />
            <ClearOption resource="user" />
          </List>
        </Box>
      </Box>
    </CardContent>
  </Card>
);
