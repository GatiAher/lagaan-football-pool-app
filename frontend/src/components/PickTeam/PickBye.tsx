import React from "react";
import { PickTeamListRow } from "./PickTeamListRow";
import { GameType } from "../../utils/types/game-type";

interface PickByeProps {
  disabled1: boolean;
  disabled2: boolean;
  loading: boolean;
  savedSelections: any;
  handleTeamSelect: (team: string) => void;
  isTeamSelected: (team: string) => boolean;
  isTwoTeamSelected: () => boolean;
}

export const PickBye = (props: PickByeProps) => {
  // Show loading message
  if (props.loading) return <p>Game table is loading...</p>;

  const pseudoGame: GameType = {
    game_id: "bye_row",
    startTime: new Date().valueOf(),
    week: 0,
    season: 0,
    visTeam: "BYE1",
    visPts: 0,
    visStatus: -1,
    homeTeam: "BYE2",
    homePts: 0,
    homeStatus: -1,
    created_at: "",
    updated_at: "",
  };

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th className="table-head-item">Pick by</th>
            <th className="table-head-item">BYE 1</th>
            <th className="table-head-item">BYE 2</th>
          </tr>
        </thead>
        <tbody className="table-body">
          <PickTeamListRow
            disabled1={props.disabled1}
            disabled2={props.disabled2}
            key={pseudoGame.game_id}
            game={pseudoGame}
            savedSelections={props.savedSelections}
            handleTeamSelect={props.handleTeamSelect}
            isTeamSelected={props.isTeamSelected}
            isTwoTeamSelected={props.isTwoTeamSelected}
          />
        </tbody>
      </table>
    </div>
  );
};
