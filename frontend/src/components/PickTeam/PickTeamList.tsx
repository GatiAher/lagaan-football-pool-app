import React from "react";
import { PickTeamListRow } from "./PickTeamListRow";
import { GameType } from "../../utils/types/game-type";
import { TeamToWinLossMap } from "../../utils/types/team-type";

interface PickTeamListProps {
  games: GameType[];
  teamWinLossMap: TeamToWinLossMap;
  loading: boolean;
  savedSelections: any;
  handleTeamSelect: (team: string) => void;
  isTeamSelected: (team: string) => boolean;
  isTwoTeamSelected: () => boolean;
}

export const PickTeamList = (props: PickTeamListProps) => {
  // Show loading message
  if (props.loading) return <p>Game table is loading...</p>;
  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th className="table-head-item">Start Time</th>
            <th className="table-head-item">Vis. Team</th>
            <th className="table-head-item">Vis. Team</th>
            <th className="table-head-item">Home Team</th>
            <th className="table-head-item">Home Team</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {props.games.length > 0 ? (
            props.games.map((game: GameType, idx) => (
              <PickTeamListRow
                key={game.game_id}
                disabled1={false}
                disabled2={false}
                isByeRow={false}
                game={game}
                teamWinLossMap={props.teamWinLossMap}
                savedSelections={props.savedSelections}
                handleTeamSelect={props.handleTeamSelect}
                isTeamSelected={props.isTeamSelected}
                isTwoTeamSelected={props.isTwoTeamSelected}
              />
            ))
          ) : (
            <tr className="table-row">
              <td
                className="table-item"
                style={{ textAlign: "center" }}
                colSpan={9}
              >
                There are no games to show.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
