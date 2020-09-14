import React from "react";
import { Leaderboard } from "../Leaderboard/Leaderboard";
import { PickTeam } from "../PickTeam/PickTeam";
import { SeasonGame } from "../SeasonGame/SeasonGame";
import Admin from "../Admin/Admin";
import Profile from "../Profile/Profile";

const HomePage: React.FC = () => {
  return <h1>Home</h1>;
};

const LeaderboardPage: React.FC = () => {
  return (
    <div>
      <h1>Leaderboard</h1>
      <Leaderboard />
    </div>
  );
};

const SelectPage: React.FC = () => {
  return (
    <div>
      <h2>Select</h2>
      <PickTeam />
    </div>
  );
};

const GamePage: React.FC = () => {
  return (
    <div>
      <h2>Game</h2>
      <SeasonGame />
    </div>
  );
};

const AdminPage: React.FC = () => {
  return (
    <div>
      <h1>Admin</h1>
      <Admin />
    </div>
  );
};

const ProfilePage: React.FC = () => {
  return (
    <div>
      <h1>Profile</h1>
      <Profile />
    </div>
  );
};

export interface IRoute {
  path: string;
  sidebarName: string;
  component: React.ComponentType;
  private: boolean;
}

const Routes: IRoute[] = [
  {
    path: "/",
    sidebarName: "Home",
    component: HomePage,
    private: false,
  },
  {
    path: "/leaderboard",
    sidebarName: "Leaderboard",
    component: LeaderboardPage,
    private: false,
  },
  {
    path: "/select",
    sidebarName: "Select",
    component: SelectPage,
    private: false,
  },
  {
    path: "/game",
    sidebarName: "Game",
    component: GamePage,
    private: false,
  },
  {
    path: "/admin",
    sidebarName: "Admin",
    component: AdminPage,
    private: false,
  },
  {
    path: "/profile",
    sidebarName: "Profile",
    component: ProfilePage,
    private: true,
  },
];

export default Routes;
