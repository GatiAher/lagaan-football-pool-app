import React from "react";
import PageHeader from "../front-end-specific-components/PageHeader";
import Leaderboard from "../pages/Leaderboard/Leaderboard";
import PickTeam from "../pages/PickTeam/PickTeam";
import GameSchedule from "../pages/GameSchedule/GameSchedule";
import PickOverview from "../pages/UserPicksOverview/UserPicksOverview";

import Rules from "../pages/Home/Rules";

// TODO: clean up, stop using page header

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

const PickOverviewPage: React.FC = () => {
  return (
    <div>
      <PageHeader>Weekly Grid</PageHeader>
      <PickOverview />
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
      <GameSchedule />
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
    path: "/pick_grid",
    sidebarName: "Weekly Grid",
    component: PickOverviewPage,
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
