import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
  table: {
    maxWidth: "50%",
    padding: 10,
    paddingBottom: 20,
  },
  appHeader: {
    backgroundColor: "#282c34",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)",
    color: "white",
  },
});

const AppHeader = () => {
  const classes = useStyles();

  return <div className={classes.appHeader}>Demo Text</div>;
};

const Rules = () => {
  const classes = useStyles();

  return (
    <Box>
      <AppHeader />
      <Typography variant="h5" gutterBottom>
        How To Play
      </Typography>
      <Typography variant="h6" gutterBottom>
        Normal Season:
      </Typography>
      <ul>
        <li>Pick two teams every week</li>
        <li>Have two BYE options that can be used from weeks 4-12 only</li>
      </ul>
      <Typography variant="body1"> Point Breakdown</Typography>
      <TableContainer className={classes.table}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Win</TableCell>
              <TableCell>Loss</TableCell>
              <TableCell>Tie</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key="1">
              <TableCell component="th" scope="row">
                +2
              </TableCell>
              <TableCell component="th" scope="row">
                -1
              </TableCell>
              <TableCell component="th" scope="row">
                1
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h6" gutterBottom>
        Playoff Season:
      </Typography>
      <Typography variant="body1" gutterBottom>
        Feature Coming Soon
      </Typography>
    </Box>
  );
};

export default Rules;
