import React from "react";

import TeamDisplayWithDropdownStatusView from "./TeamDisplayWithDropdownStatusView";

import TeamType from "../../types/TeamType";
import GameType from "../../types/GameType";

import SnackBar, { SnackBarProps } from "../../components/snackbar";

import api from "../../api";

const TeamDisplayWithDropdownStatus = ({
  game,
  team,
  week,
}: {
  game?: GameType;
  team: TeamType;
  week: number;
}) => {
  // @ts-ignore
  const [state, setState] = React.useState(team[`wk${week}`]);

  const [snackBarMessage, setSnackBarMessage] = React.useState<
    (SnackBarProps & { date: Date }) | null
  >(null);

  const setSnackBarMessageUnique = (props: SnackBarProps) =>
    setSnackBarMessage({ ...props, date: new Date() });

  const handleChange = (event: any) => {
    // set state of dropdown
    setState(event.target.value);
    // set team status
    const teamId = event.target.name;
    const teamValue = event.target.value;
    const teamBody = {
      [`wk${week}`]: teamValue,
    };
    // set opponent team status
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
      opponentBody = {
        [`wk${week}`]: opponentValue,
      };
    }
    // set team status
    const teamPromise = api.team.putTeamScore(teamId, teamBody);
    // set opponent team status
    const opponentPromise = api.team.putTeamScore(opponentId, opponentBody);
    // score all
    const scoreTeamPromise = api.score.recalculateTeamScore();
    const scoreUserPromise = api.score.recalculateUserScore();
    // set snackbar message: updated and scored team and opponent team
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
        setTimeout(() => {
          window.location.reload();
        }, 500);
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
