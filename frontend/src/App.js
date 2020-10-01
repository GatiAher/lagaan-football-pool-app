import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Main from "./components/Main/MainPanel";
import Auth0ProviderWithHistory from "./utils/auth0-provider-with-history";
import { UserProvider } from "./context/TempUserContext";

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Auth0ProviderWithHistory>
          <Main />
        </Auth0ProviderWithHistory>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
