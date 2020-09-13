import React from "react";
import { Switch, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "./NavBar/NavBar";
import PrivateRoute from "./PrivateRoute";
import "./MainPanel.css";
import Home from "../../routes/home";
import Game from "../../routes/game";
import Select from "../../routes/select";
import Leaderboard from "../../routes/leaderboard";
import Profile from "../../routes/profile";
import Admin from "../../routes/admin";
import Loading from "../Loading";
import TempUserDisplay from "./TempUserDisplay";

const Main = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <NavBar />
      <TempUserDisplay />
      <div className="content">
        <Switch>
          <Route component={Home} exact path="/" />
          <Route component={Admin} path="/admin" />
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
