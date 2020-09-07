import React from "react";
import { Switch, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "./NavBar/NavBar";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import "./MainPanel.css";
import Home from "../../routes/home";
import Game from "../../routes/game";
import Select from "../../routes/select";
import Leaderboard from "../../routes/leaderboard";
import Profile from "../../routes/profile";
import Loading from "../Loading";

const Main = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <NavBar />
      <div className="content">
        <Switch>
          <Route component={Home} exact path="/" />
          <PrivateRoute component={Profile} path="/profile" />
          <Route component={Leaderboard} path="/leaderboard" />
          <Route component={Select} path="/select" />
          <Route component={Game} path="/game" />
        </Switch>
      </div>
    </div>
  );
};

export default Main;
