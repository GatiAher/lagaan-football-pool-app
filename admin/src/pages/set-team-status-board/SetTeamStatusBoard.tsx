import React, { useState } from "react";

import SetTeamStatusBoardView from "./SetTeamStatusBoardView";

import getCurrentWeek from "../../utils/getCurrentWeek";

const SetTeamStatusBoard = () => {
  const [week, setWeek] = useState(getCurrentWeek());

  return <SetTeamStatusBoardView week={week} setWeek={setWeek} />;
};

export default SetTeamStatusBoard;
