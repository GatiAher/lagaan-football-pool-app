import React, { useState } from "react";

import { Switch, Route } from "react-router-dom";
import Routes, { IRoute } from "./Routes";
import PrivateRoute from "./PrivateRoute";

import NavigationBar from "./NavigationBar/NavigationBar";

import { useAuth0 } from "@auth0/auth0-react";
import TempUserDisplay from "./TempUserDisplay";

import Loading from "../Loading";

const Main: React.FC = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <NavigationBar />
      <TempUserDisplay />
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
    </div>
  );
};

export default Main;
