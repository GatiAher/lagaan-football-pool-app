import React from "react";
import { BrowserRouter, Switch, NavLink } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import "./styles/App.css";
import Home from "./routes/home";
import Admin from "./routes/admin";
import Game from "./routes/game";
import Select from "./routes/select";
import Leaderboard from "./routes/leaderboard";

const App = () => (
  <BrowserRouter>
    <div>
      <h1>Lagaan Football Pool</h1>
      <nav>
        <ul className="header">
          <li>
            <NavLink exact to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/admin">
              Admin
            </NavLink>
          </li>
          <li>
            <NavLink to="/leaderboard">Leaderboard</NavLink>
          </li>
          <li>
            <NavLink to="/select">Select</NavLink>
          </li>
          <li>
            <NavLink to="/game">Game</NavLink>
          </li>
        </ul>
      </nav>
      <div className="content">
        <Switch>
          <PublicRoute component={Home} restricted={false} exact path="/" />
          <PrivateRoute component={Admin} exact path="/admin" />
          <PrivateRoute component={Leaderboard} exact path="/leaderboard" />
          <PrivateRoute component={Select} exact path="/select" />
          <PublicRoute component={Game} restricted={false} exact path="/game" />
        </Switch>
      </div>
    </div>
  </BrowserRouter>
);

export default App;
