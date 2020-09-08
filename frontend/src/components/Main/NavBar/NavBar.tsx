import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";

const AuthNav = () => {
  const { isAuthenticated } = useAuth0();
  if (isAuthenticated) {
    return <LogoutButton />;
  } else return <LoginButton />;
};

const NavBar = () => (
  <nav>
    <ul className="header">
      <li>
        <NavLink exact to="/">
          Home
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
      <li>
        <NavLink exact to="/profile">
          Profile
        </NavLink>
      </li>
      <li>
        <AuthNav />
      </li>
    </ul>
  </nav>
);

export default NavBar;
