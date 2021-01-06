import React from "react";
import Rules from "../pages/Home/Rules";
import Leaderboard from "../pages/Leaderboard";
import PickTeam from "../pages/PickTeam";
import GameSchedule from "../pages/GameSchedule";
import {
  RegularPickOverview,
  PlayoffPickOverview,
} from "../pages/UserPicksOverview";

export interface IRoute {
  path: string;
  sidebarName: string;
  component: React.ComponentType;
  private: boolean;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
}

const Routes: IRoute[] = [
  {
    path: "/",
    sidebarName: "Home",
    component: Rules,
    private: false,
  },
  {
    path: "/games",
    sidebarName: "Games Schedule",
    component: GameSchedule,
    private: false,
  },
  {
    path: "/pick_sheet",
    sidebarName: "Pick Sheet",
    component: PickTeam,
    private: true,
  },
  {
    path: "/standings",
    sidebarName: "Standings",
    component: Leaderboard,
    private: true,
  },
  {
    path: "/regular_pick_overview",
    sidebarName: "Regular Picks Overview",
    component: RegularPickOverview,
    private: true,
    maxWidth: "xl",
  },
  {
    path: "/playoff_pick_overview",
    sidebarName: "Playoff Picks Overview",
    component: PlayoffPickOverview,
    private: true,
    maxWidth: "xl",
  },
];

export default Routes;
