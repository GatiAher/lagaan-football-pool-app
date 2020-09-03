import React, { useState } from "react";
import Main from "./Main";
import { AuthContext } from "./context/auth";

const App = () => {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={false}>
      <Main />
    </AuthContext.Provider>
  );
};

export default App;
