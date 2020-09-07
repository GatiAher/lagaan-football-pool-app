import React from "react";
import { BrowserRouter } from "react-router-dom";
import Main from "./components/Main/MainPanel";
import Auth0ProviderWithHistory from "./utils/auth0-provider-with-history";

const App = () => {
  return (
    <BrowserRouter>
      <Auth0ProviderWithHistory>
        <Main />
      </Auth0ProviderWithHistory>
    </BrowserRouter>
  );
};

export default App;
