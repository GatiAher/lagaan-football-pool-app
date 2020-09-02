import React from "react";
import { SelectGameListRow } from "./select-game-list-row";
import { GameType } from "../../types/game-type";
import "./select-game-list.css";

interface SelectGameListProps {
  games: GameType[];
  loading: boolean;
}

export const SelectGameList = (props: SelectGameListProps) => {
  // Show loading message
  if (props.loading) return <p>Game table is loading...</p>;
  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th className="table-head-item">Start Time</th>
            <th className="table-head-item">Vis. Team</th>
            <th className="table-head-item">Home Team</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {props.games.length > 0 ? (
            props.games.map((game: GameType, idx) => (
              <SelectGameListRow key={game.id} game={game} />
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
