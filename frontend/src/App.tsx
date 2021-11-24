import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { BrowserRouter } from "react-router-dom";

import Auth0ProviderWithHistory from "./auth0-provider-with-history";

import Layout from "./layout";

import { CurrentWeekProvider } from "./contexts/CurrentWeekContext";

import Content from "./routes";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3d405b",
    },
    secondary: {
      main: "#f50057",
    },
    info: {
      main: "#0b0d23",
    },
    background: {
      default: "#eeeeee",
    },
  },
});

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CurrentWeekProvider>
        <CssBaseline />
        <BrowserRouter>
          <Auth0ProviderWithHistory>
            <Layout>
              <Content />
            </Layout>
          </Auth0ProviderWithHistory>
        </BrowserRouter>
      </CurrentWeekProvider>
    </MuiThemeProvider>
  );
};

export default App;
