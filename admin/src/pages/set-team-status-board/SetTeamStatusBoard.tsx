import React, { useState } from "react";

import SetTeamStatusBoardView from "./SetTeamStatusBoardView";

import { useCurrentWeek } from "../../contexts/CurrentWeekContext";

const SetTeamStatusBoard = () => {
  const { currentWeek } = useCurrentWeek();
  const [week, setWeek] = useState(currentWeek);

  return <SetTeamStatusBoardView week={week} setWeek={setWeek} />;
};

export default SetTeamStatusBoard;
