import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { BrowserRouter } from "react-router-dom";

import Main from "./components/Main/MainPanel";
import Auth0ProviderWithHistory from "./utils/auth0-provider-with-history";
import { UserProvider } from "./context/TempUserContext";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
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
      <UserProvider>
        <BrowserRouter>
          <Auth0ProviderWithHistory>
            <Main />
          </Auth0ProviderWithHistory>
        </BrowserRouter>
      </UserProvider>
    </MuiThemeProvider>
  );
};

export default App;
