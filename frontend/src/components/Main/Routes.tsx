import React from "react";
import { Leaderboard } from "../Leaderboard/Leaderboard";
import { PickTeam } from "../PickTeam/PickTeam";
import { SeasonGame } from "../SeasonGame/SeasonGame";
import Admin from "../Admin/Admin";
import Profile from "../Profile/Profile";
import Typography from "@material-ui/core/Typography";

const HomePage: React.FC = () => {
  return <Typography variant="h4">Home</Typography>;
};

const RankingsPage: React.FC = () => {
  return (
    <div>
      <Typography variant="h4">Rankings</Typography>
      <Leaderboard />
    </div>
  );
};

const PickSheetPage: React.FC = () => {
  return (
    <div>
      <Typography variant="h4">Pick Sheet</Typography>
      <PickTeam />
    </div>
  );
};

const NFLGamesPage: React.FC = () => {
  return (
    <div>
      <Typography variant="h4">NFL Games</Typography>
      <SeasonGame />
    </div>
  );
};

const AdminPage: React.FC = () => {
  return (
    <div>
      <Typography variant="h4">Admin</Typography>
      <Admin />
    </div>
  );
};

const ProfilePage: React.FC = () => {
  return (
    <div>
      <Typography variant="h4">Profile</Typography>
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
