import React from "react";
import { AllGameListRow } from "./all-game-list-row";
import { GameType } from "../types/game-type";
import "./../styles/all-game-list.css";

interface AllGameListProps {
  games: GameType[];
  loading: boolean;
}
// Create BookshelfList component
export const AllGameList = (props: AllGameListProps) => {
  // Show loading message
  if (props.loading) return <p>Game table is loading...</p>;
  return (
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
            <AllGameListRow key={game.id} game={game} />
          ))
        ) : (
          <tr className="table-row">
            <td
              className="table-item"
              style={{ textAlign: "center" }}
              colSpan={6}
            >
              There are no games to show.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
