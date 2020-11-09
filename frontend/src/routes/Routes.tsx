import React from "react";
import Rules from "../pages/Home/Rules";
import Leaderboard from "../pages/Leaderboard/Leaderboard";
import PickTeam from "../pages/PickTeam/PickTeam";
import GameSchedule from "../pages/GameSchedule/GameSchedule";
import PickOverview from "../pages/UserPicksOverview";

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
    component: Rules,
    private: false,
  },
  {
    path: "/rankings",
    sidebarName: "Rankings",
    component: Leaderboard,
    private: true,
  },
  {
    path: "/pick_grid",
    sidebarName: "Weekly Grid",
    component: PickOverview,
    private: true,
  },
  {
    path: "/pick_sheet",
    sidebarName: "Pick Sheet",
    component: PickTeam,
    private: true,
  },
  {
    path: "/nfl_games",
    sidebarName: "NFL Games",
    component: GameSchedule,
    private: false,
  },
];

export default Routes;
