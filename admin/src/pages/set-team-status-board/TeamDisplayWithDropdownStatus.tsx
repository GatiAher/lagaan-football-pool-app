import React, { useEffect } from "react";

import TeamDisplayWithDropdownStatusView from "./TeamDisplayWithDropdownStatusView";

import TeamType from "../../types/TeamType";
import GameType from "../../types/GameType";

import SnackBar, { SnackBarProps } from "../../components/snackbar";

import api from "../../api";

const TeamDisplayWithDropdownStatus = ({
  game,
  team,
  week,
  state,
  setState,
  setStateOpp,
}: {
  game?: GameType;
  team: TeamType;
  week: number;
  state: string;
  setState: (arg0: string) => void;
  setStateOpp: (arg0: string) => void;
}) => {
  useEffect(() => {
    // @ts-ignore
    setState(team[`wk${week}`]);
  }, [team, setState, week]);

  const [snackBarMessage, setSnackBarMessage] = React.useState<
    (SnackBarProps & { date: Date }) | null
  >(null);

  const setSnackBarMessageUnique = (props: SnackBarProps) =>
    setSnackBarMessage({ ...props, date: new Date() });

  const handleChange = (event: any) => {
    // get team status
    const teamId = event.target.name;
    const teamValue = event.target.value;
    const teamBody = {
      [`wk${week}`]: teamValue,
    };
    // set state of dropdown
    setState(teamValue);
    // get opponent team status
    let opponentId = "";
    let opponentBody = {};
    if (game) {
      opponentId = game.homeTeam !== teamId ? game.homeTeam : game.visTeam;
      let opponentValue = "default";
      if (teamValue === "win") {
        opponentValue = "loss";
      } else if (teamValue === "loss") {
        opponentValue = "win";
      } else if (teamValue === "tie") {
        opponentValue = "tie";
      }
      // set state of opponent dropdown
      setStateOpp(opponentValue);
      opponentBody = {
        [`wk${week}`]: opponentValue,
      };
    }
    // update through API
    const teamPromise = api.team.putTeamScore(teamId, teamBody);
    const opponentPromise = api.team.putTeamScore(opponentId, opponentBody);
    const scoreTeamPromise = api.score.recalculateTeamScore();
    const scoreUserPromise = api.score.recalculateUserScore();
    // set snackbar message
    Promise.all([
      teamPromise,
      opponentPromise,
      scoreTeamPromise,
      scoreUserPromise,
    ])
      .then(() => {
        setSnackBarMessageUnique({
          message: `Updated ${teamId} and ${opponentId} and scored users`,
          status: "success",
        });
      })
      .catch((err) => {
        setSnackBarMessageUnique({
          message: JSON.stringify(err),
          status: "fail",
        });
      });
  };

  return (
    <div>
      <TeamDisplayWithDropdownStatusView
        teamId={team.id}
        initialValue={state}
        handleChange={handleChange}
      />
      {snackBarMessage !== null && (
        <SnackBar
          key={snackBarMessage.date.valueOf()}
          message={snackBarMessage.message}
          status={snackBarMessage.status}
        />
      )}
    </div>
  );
};

export default TeamDisplayWithDropdownStatus;
