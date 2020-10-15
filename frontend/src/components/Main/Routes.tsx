import React from "react";
import PageHeader from "../General/PageHeader";
import Leaderboard from "../Leaderboard/Leaderboard";
import PickTeam from "../PickTeam/PickTeam";
import GameDisplay from "../GameDisplay/GameDisplay";
import Rules from "../Home/Rules";

const HomePage: React.FC = () => {
  return (
    <div>
      <PageHeader>Home</PageHeader>
      <Rules />{" "}
    </div>
  );
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
      <GameDisplay />
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
    private: true,
  },
  {
    path: "/pick_sheet",
    sidebarName: "Pick Sheet",
    component: PickSheetPage,
    private: true,
  },
  {
    path: "/nfl_games",
    sidebarName: "NFL Games",
    component: NFLGamesPage,
    private: false,
  },
];

export default Routes;
