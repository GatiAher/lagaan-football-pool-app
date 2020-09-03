import React from "react";
import { GameType } from "../../utils/types/game-type";
import "./SeasonGameList.css";

interface SeasonGameListRowProps {
  game: GameType;
}
export const SeasonGameListRow = (props: SeasonGameListRowProps) => (
  <tr className="table-row">
    <td className="table-item">{props.game.week}</td>
    <td className="table-item">{props.game.startTime}</td>
    <td className="table-item">{props.game.visTeam}</td>
    <td className="table-item">{props.game.visPts}</td>
    <td className="table-item">{props.game.visStatus}</td>
    <td className="table-item">{props.game.homeTeam}</td>
    <td className="table-item">{props.game.homePts}</td>
    <td className="table-item">{props.game.homeStatus}</td>
    <td className="table-item">{props.game.updated_at}</td>
  </tr>
);
