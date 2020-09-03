import React from "react";
import { SeasonGameListRow } from "./SeasonGameListRow";
import { GameType } from "../../utils/types/game-type";
import "./SeasonGameList.css";

interface SeasonGameListProps {
  games: GameType[];
  loading: boolean;
}

export const SeasonGameList = (props: SeasonGameListProps) => {
  // Show loading message
  if (props.loading) return <p>Game table is loading...</p>;
  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th className="table-head-item">Week</th>
            <th className="table-head-item">Start Time</th>
            <th className="table-head-item">Vis. Team</th>
            <th className="table-head-item">Vis. Pts.</th>
            <th className="table-head-item">Vis. Status</th>
            <th className="table-head-item">Home Team</th>
            <th className="table-head-item">Home Pts.</th>
            <th className="table-head-item">Home Status</th>
            <th className="table-head-item">Updated At</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {props.games.length > 0 ? (
            props.games.map((game: GameType, idx) => (
              <SeasonGameListRow key={game.id} game={game} />
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
