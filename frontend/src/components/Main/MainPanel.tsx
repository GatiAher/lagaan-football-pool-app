import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

import { Switch, Route } from "react-router-dom";
import Routes, { IRoute } from "./Routes";
import PrivateRoute from "./PrivateRoute";

import NavigationBar from "./NavigationBar/NavigationBar";
import { useAuth0 } from "@auth0/auth0-react";

// import TempUserDisplay from "./TempUserDisplay";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      margin: theme.spacing(3),
    },
  })
);

const Main: React.FC = () => {
  const classes = useStyles();
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <NavigationBar />
      {/* <TempUserDisplay /> */}
      <Container maxWidth="md">
        <Box className={classes.mainContainer}>
          <Switch>
            {Routes.map((route: IRoute) => {
              if (route.private) {
                return (
                  <PrivateRoute
                    exact
                    path={route.path}
                    key={route.path}
                    component={route.component}
                  />
                );
              } else {
                return (
                  <Route exact path={route.path} key={route.path}>
                    <route.component />
                  </Route>
                );
              }
            })}
          </Switch>
        </Box>
      </Container>
    </div>
  );
};

export default Main;
