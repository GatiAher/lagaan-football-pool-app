import React from "react";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
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
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/leaderboard">
            <Leaderboard />
          </Route>
          <Route path="/select">
            <Select />
          </Route>
          <Route path="/game">
            <Game />
          </Route>
        </Switch>
      </div>
    </div>
  </BrowserRouter>
);

export default App;
