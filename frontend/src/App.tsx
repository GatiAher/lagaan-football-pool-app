import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { BrowserRouter } from "react-router-dom";

import Auth0ProviderWithHistory from "./utils/auth0-provider-with-history";

import Layout from "./layout";

import { Switch, Route } from "react-router-dom";
import Routes, { IRoute } from "./routes/Routes";
import PrivateRoute from "./routes/PrivateRoute";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3d405b",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#eeeeee",
    },
  },
});

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Auth0ProviderWithHistory>
          <Layout>
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
          </Layout>
        </Auth0ProviderWithHistory>
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;
