import React from "react";
import { GameType } from "../../types/game-type";
import "./select-game-list.css";

interface SelectGameListRowProps {
  game: GameType;
}
export const SelectGameListRow = (props: SelectGameListRowProps) => (
  <tr className="table-row">
    <td className="table-item">{props.game.startTime}</td>
    <td className="table-item">{props.game.visTeam}</td>
    <td className="table-item">{props.game.homeTeam}</td>
  </tr>
);
