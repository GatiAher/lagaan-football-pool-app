import React, { useState } from "react";

import GameScheduleView from "./GameScheduleView";

import getCurrentWeek from "../../utils/getCurrentWeek";

const GameSchedule = () => {
  const [week, setWeek] = useState(getCurrentWeek());

  return <GameScheduleView week={week} setWeek={setWeek} />;
};

export default GameSchedule;
