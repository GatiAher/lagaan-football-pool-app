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
  Snackbar,
} from "@material-ui/core";

const callTable = (resource, endpoint, handleClick) => {
  axios
    .delete(`http://localhost:3001/${resource}/${endpoint}`)
    .then((response) => {
      handleClick(response.data.message, false);
    })
    .catch((error) => {
      handleClick(JSON.stringify(error), true);
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

const ClearOption = ({ resource, handleClick }) => (
  <ListItem>
    <ListItemText
      primary={`Clear ${resource}`}
      secondary={`This will remove all items in the ${resource} table.`}
    />
    <ListItemSecondaryAction>
      <DangerButton
        variant="outlined"
        onClick={() => {
          callTable(resource, "clear", handleClick);
        }}
      >{`Clear ${resource}`}</DangerButton>
    </ListItemSecondaryAction>
  </ListItem>
);

const ResetOption = ({ resource, handleClick }) => (
  <ListItem>
    <ListItemText
      primary={`Reset ${resource}`}
      secondary={`This will remove all season data from ${resource} table, replacing items if appropriate.`}
    />
    <ListItemSecondaryAction>
      <DangerButton
        variant="outlined"
        onClick={() => {
          callTable(resource, "reset", handleClick);
        }}
      >{`Reset ${resource}`}</DangerButton>
    </ListItemSecondaryAction>
  </ListItem>
);

export default () => {
  const [open, setOpen] = React.useState(false);
  const [isFail, setFail] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = React.useState("");

  const handleClick = (message, failValue) => {
    setSnackBarMessage(message);
    setFail(failValue);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setFail(false);
    setSnackBarMessage("");
  };

  return (
    <Card>
      <CardHeader title="Welcome to the Admin Site" />
      <CardContent>
        You can create, read, update, and delete table data from here!
        <Box py={2}>
          <Typography variant="h6">Danger Zone</Typography>
          <Box py={2} border={1} color="#cb2431" borderRadius={4}>
            <List>
              <ResetOption resource="game" handleClick={handleClick} />
              <ResetOption resource="team" handleClick={handleClick} />
              <ResetOption resource="user" handleClick={handleClick} />
              <Divider />
              <ClearOption resource="game" handleClick={handleClick} />
              <ClearOption resource="team" handleClick={handleClick} />
              <ClearOption resource="user" handleClick={handleClick} />
            </List>
          </Box>
        </Box>
      </CardContent>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={snackBarMessage}
        ContentProps={
          isFail && {
            style: {
              background: "#e57373",
            },
          }
        }
      />
    </Card>
  );
};
