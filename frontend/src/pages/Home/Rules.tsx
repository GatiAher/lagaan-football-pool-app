import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import ImageEnlarger from "react-image-enlarger";

import backgroundImage from "../../assets/football_stadium_background.jpg";

import gameScheduleImage from "../../assets/games_schedule.png";
import pickSheetImage from "../../assets/pick_sheet.png";
import standingsImage from "../../assets/standings.png";
import fullPicksOverviewImage from "../../assets/full_pick_overview.png";

const useStyles = makeStyles({
  table: {
    maxWidth: "300",
    padding: 10,
    paddingBottom: 20,
  },
  appHeader: {
    minHeight: "100vh",
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  appHeaderInner: {
    minHeight: "100vh",
    width: "100%",
    backgroundColor: `rgba(6, 3, 6, 0.75)`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)",
    color: "white",
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const AppHeader = () => {
  const classes = useStyles();

  return (
    <div className={classes.appHeader}>
      <div className={classes.appHeaderInner}>
        <Typography variant="h1" align="center" gutterBottom>
          Lagaan
        </Typography>
        <Typography variant="h3" align="center" gutterBottom>
          Run your football pool with ease!
        </Typography>
        <ul>
          <li>Replace the complex spreadsheets</li>
          <li>Automatically calculate wins, losses, and point spreads</li>
          <li>Keep track of who has already picked which teams</li>
        </ul>
      </div>
    </div>
  );
};

const pointBreakdown = {
  regular: {
    columns: ["POINTS BREAKDOWN", "win", "loss", "tie"],
    items: [["Weeks 1-18", "+2", "-1", "+1"]],
  },
  post: {
    columns: ["POINTS BREAKDOWN", "win", "loss"],
    items: [
      ["Wildcard", "+2", "-2"],
      ["Divisionals", "+4", "-4"],
      ["Championships", "+6", "-6"],
      ["Superbowl", "+8", "-8"],
    ],
  },
};

const PointsBreakdownTable = ({ type }: { type: "regular" | "post" }) => {
  const classes = useStyles();
  const pointBreakdownSection = pointBreakdown[type];
  return (
    <TableContainer className={classes.table}>
      <Table aria-label="point breakdown table">
        <TableHead>
          <TableRow>
            {pointBreakdownSection.columns.map((column) => (
              <StyledTableCell>{column}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {pointBreakdownSection.items.map((item: string[]) => (
            <TableRow key={item[0]}>
              {item.map((itemVal) => (
                <StyledTableCell>{itemVal}</StyledTableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Rules = () => {
  return (
    <Box pt={4}>
      <Typography variant="h4" align="left" gutterBottom>
        Regular Season
      </Typography>
      <ul>
        <li>Must pick two teams every week</li>
        <li>During weeks 4-12, can choose BYE option four times</li>
      </ul>
      <PointsBreakdownTable type="regular" />
      <Typography variant="h4" align="left" gutterBottom>
        Playoffs
      </Typography>
      <ul>
        <li>Can pick one team per game</li>
      </ul>
      <PointsBreakdownTable type="post" />
    </Box>
  );
};

const pages = [
  { title: "Games Schedule", src: gameScheduleImage },
  { title: "Pick Sheet", src: pickSheetImage },
  { title: "Standings", src: standingsImage },
  { title: "Full Picks Overview", src: fullPicksOverviewImage },
];

const SingleSource = ({ title, src }: { title: string; src: string }) => {
  const [zoomed, setZoomed] = React.useState(false);

  return (
    <ImageEnlarger
      style={{ width: "200px", height: "200px" }}
      zoomed={zoomed}
      src={src}
      aria-label={title}
      onClick={() => setZoomed(true)}
      onRequestClose={() => setZoomed(false)}
    />
  );
};

const PagesOverview = () => {
  return (
    <div>
      <Typography variant="h4" align="left" gutterBottom>
        Pages Sample
      </Typography>
      <Box
        pt={2}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        {pages.map((image) => (
          <SingleSource title={image.title} src={image.src} />
        ))}
      </Box>
    </div>
  );
};

const Main = () => {
  return (
    <div>
      <AppHeader />
      <Container maxWidth="md">
        <Rules />
        <PagesOverview />
      </Container>
    </div>
  );
};

export default Main;
