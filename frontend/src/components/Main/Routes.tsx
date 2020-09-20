import React from "react";
import PageHeader from "../General/PageHeader";
import Leaderboard from "../Leaderboard/Leaderboard";
import PickTeam from "../PickTeam/PickTeam";
import SeasonGame from "../SeasonGame/SeasonGame";
import Admin from "../Admin/Admin";
import Profile from "../Profile/Profile";

const HomePage: React.FC = () => {
  return <PageHeader>Home</PageHeader>;
};

const RankingsPage: React.FC = () => {
  return (
    <div>
      <PageHeader>Rankings</PageHeader>
      <Leaderboard />
    </div>
  );
};

const PickSheetPage: React.FC = () => {
  return (
    <div>
      <PageHeader>Pick Sheet</PageHeader>
      <PickTeam />
    </div>
  );
};

const NFLGamesPage: React.FC = () => {
  return (
    <div>
      <PageHeader>NFL Games</PageHeader>
      <SeasonGame />
    </div>
  );
};

const AdminPage: React.FC = () => {
  return (
    <div>
      <PageHeader>Admin</PageHeader>
      <Admin />
    </div>
  );
};

const ProfilePage: React.FC = () => {
  return (
    <div>
      <PageHeader>Profile</PageHeader>
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
    path: "/rankings",
    sidebarName: "Rankings",
    component: RankingsPage,
    private: false,
  },
  {
    path: "/pick_sheet",
    sidebarName: "Pick Sheet",
    component: PickSheetPage,
    private: false,
  },
  {
    path: "/nfl_games",
    sidebarName: "NFL Games",
    component: NFLGamesPage,
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
