import React from "react";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import "./styles/App.css";
import Game from "./routes/game";
import Select from "./routes/select";
import Leaderboard from "./routes/leaderboard";

const App = () => (
  <BrowserRouter>
    <div>
      <h1>Simple SPA</h1>
      <nav>
        <ul className="header">
          <li>
            <NavLink exact to="/">
              Leaderboard
            </NavLink>
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
          <Route path="/select">
            <Select />
          </Route>
          <Route path="/game">
            <Game />
          </Route>
          <Route path="/">
            <Leaderboard />
          </Route>
        </Switch>
      </div>
    </div>
  </BrowserRouter>
);

export default App;
