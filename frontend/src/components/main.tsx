import React from "react";
import { Route, NavLink, HashRouter } from "react-router-dom";
import "../styles/main.css";
import Game from "./game";
import Select from "./select";
import Leaderboard from "./leaderboard";

const Main = () => (
  <HashRouter>
    <div>
      <h1>Simple SPA</h1>
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
      <div className="content">
        <Route exact path="/" component={Leaderboard} />
        <Route path="/select" component={Select} />
        <Route path="/game" component={Game} />
      </div>
    </div>
  </HashRouter>
);

export default Main;
