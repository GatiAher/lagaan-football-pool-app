import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "../styles/router.css";
import Game from "./game";
import Select from "./select";
import Leaderboard from "./leaderboard";

const Router = () => (
  <BrowserRouter>
    <div>
      <h1>Simple SPA</h1>
      <nav>
        <ul className="header">
          <li>
            <Link to="/">Leaderboard</Link>
          </li>
          <li>
            <Link to="/select">Select</Link>
          </li>
          <li>
            <Link to="/game">Game</Link>
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

export default Router;
