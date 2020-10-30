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

const errorSnackbarErrorColor = "#e57373";
const callTable = (method, resource, endpoint, handleClick) => {
  axios({
    method,
    url: `${process.env.REACT_APP_API}/${resource}/${endpoint}`,
  })
    .then((response) => {
      handleClick(response.data.message, false);
    })
    .catch((error) => {
      handleClick(JSON.stringify(error), true);
    });
};

const scoreColor = "#00BFFF";
const NormalButton = styled(Button)({
  background: "white",
  borderRadius: 4,
  color: scoreColor,
  "&:hover": {
    backgroundColor: scoreColor,
    color: "white",
  },
});

const dangerColor = "#cb2431";
const DangerButton = styled(Button)({
  background: "white",
  borderRadius: 4,
  color: dangerColor,
  "&:hover": {
    backgroundColor: dangerColor,
    color: "white",
  },
});

const ScoreOption = ({ resource, handleClick }) => (
  <ListItem>
    <ListItemText
      primary={`Score ${resource}`}
      secondary={`Re-calculate ${resource} scores.`}
    />
    <ListItemSecondaryAction>
      <NormalButton
        variant="outlined"
        onClick={() => {
          callTable("get", "score", resource, handleClick);
        }}
      >{`Score ${resource}`}</NormalButton>
    </ListItemSecondaryAction>
  </ListItem>
);

const ClearOption = ({ resource, handleClick }) => (
  <ListItem>
    <ListItemText
      primary={`Clear ${resource}`}
      secondary={`Remove all ${resource}s.`}
    />
    <ListItemSecondaryAction>
      <DangerButton
        variant="outlined"
        onClick={() => {
          callTable("delete", resource, "clear", handleClick);
        }}
      >{`Clear ${resource}`}</DangerButton>
    </ListItemSecondaryAction>
  </ListItem>
);

const ResetOption = ({ resource, handleClick }) => (
  <ListItem>
    <ListItemText
      primary={`Reset ${resource}`}
      secondary={`Remove ${resource} season info.`}
    />
    <ListItemSecondaryAction>
      <DangerButton
        variant="outlined"
        onClick={() => {
          callTable("delete", resource, "reset", handleClick);
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
          <Typography variant="h6">Score Calculation</Typography>
          <Divider />
          <List>
            <ScoreOption resource="user" handleClick={handleClick} />
            <ScoreOption resource="team" handleClick={handleClick} />
          </List>
          <Typography variant="h6">Danger Zone</Typography>
          <Box border={1} color={dangerColor} borderRadius={4}>
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
              background: errorSnackbarErrorColor,
            },
          }
        }
      />
    </Card>
  );
};
