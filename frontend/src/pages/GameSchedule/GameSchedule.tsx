import React, { useState } from "react";

import GameScheduleView from "./GameScheduleView";

import { useCurrentWeek } from "../../contexts/CurrentWeekContext";

const GameSchedule = () => {
  const { currentWeek } = useCurrentWeek();
  const [week, setWeek] = useState(currentWeek);

  return <GameScheduleView week={week} setWeek={setWeek} />;
};

export default GameSchedule;
