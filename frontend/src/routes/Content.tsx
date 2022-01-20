import React from "react";
import { Switch, Route } from "react-router-dom";

import { Routes, RoutesPlayoffs, IRoute } from "./Routes";
import PrivateRoute from "./PrivateRoute";
import PageWrapper from "./PageWrapper";

import { useCurrentWeek } from "../contexts/CurrentWeekContext";

const Content = () => {
  const { currentWeek } = useCurrentWeek();
  const UseRoutes: IRoute[] = currentWeek > 18 ? RoutesPlayoffs : Routes;

  return (
    <Switch>
      {UseRoutes.map((route: IRoute) => {
        if (route.private) {
          return (
            <PrivateRoute
              exact
              path={route.path}
              key={route.path}
              component={() => (
                <PageWrapper
                  heading={route.sidebarName}
                  maxWidth={route.maxWidth}
                  isPrivate
                >
                  <route.component />
                </PageWrapper>
              )}
            />
          );
        } else {
          return (
            <Route exact path={route.path} key={route.path}>
              <PageWrapper
                heading={route.sidebarName}
                maxWidth={route.maxWidth}
              >
                <route.component />
              </PageWrapper>
            </Route>
          );
        }
      })}
    </Switch>
  );
};

export default Content;
