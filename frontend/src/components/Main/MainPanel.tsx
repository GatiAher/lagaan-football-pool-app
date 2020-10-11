import React from "react";

import LinearProgress from "@material-ui/core/LinearProgress";

import Container from "@material-ui/core/Container";

import { Switch, Route } from "react-router-dom";
import Routes, { IRoute } from "./Routes";
import PrivateRoute from "./PrivateRoute";

import NavigationBar from "./NavigationBar/NavigationBar";
import { useAuth0 } from "@auth0/auth0-react";

import Footer from "./Footer";

// import TempUserDisplay from "./TempUserDisplay";

const Main: React.FC = () => {
  const { isLoading } = useAuth0();

  return (
    <div>
      <NavigationBar />
      {isLoading ? (
        <LinearProgress />
      ) : (
        <div>
          <Container maxWidth="md">
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
          </Container>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Main;
