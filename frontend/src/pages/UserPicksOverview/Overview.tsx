import React from "react";
import UserPickOverview from "./UserPicksOverview";

export const RegularPickOverview = () => (
  <UserPickOverview metricField="score" />
);

export const PlayoffPickOverview = () => (
  <UserPickOverview metricField="scorePlayoff" />
);
