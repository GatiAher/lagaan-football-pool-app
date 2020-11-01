import React from "react";

import TeamDisplayWithDropdownStatusView from "./TeamDisplayWithDropdownStatusView";

import TeamType from "../../types/TeamType";

import api from "../../api";

export default ({ team, week }: { team: TeamType; week: number }) => {
  // @ts-ignore
  const [state, setState] = React.useState(team[`wk${week}`]);

  // @ts-ignore
  const handleChange = (event) => {
    setState(event.target.value);
    const body = {};
    // @ts-ignore
    body[`wk${week}`] = event.target.value;
    api.team
      .putTeamScore(event.target.name, body)
      .then(() => console.log("PUT SCORE"))
      .catch((error) => console.error(`FAILED TO PUT SCORE: ${error}`));
  };

  return (
    <TeamDisplayWithDropdownStatusView
      teamId={team.id}
      initialValue={state}
      handleChange={handleChange}
    />
  );
};
