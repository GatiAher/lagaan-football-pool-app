import React from "react";
import { GameType } from "../../utils/types/game-type";

interface SeasonGameListRowProps {
  game: GameType;
}

const getTableItemClassName = (status: number) => {
  let className = "table-item";
  switch (status) {
    case 1:
      className = "table-item tie";
      break;
    case 2:
      className = "table-item win";
      break;
    case 0:
      className = "table-item lose";
      break;
  }
  return className;
};

export const SeasonGameListRow = (props: SeasonGameListRowProps) => {
  let visTeamBadge = props.game.visTeam;
  if (props.game.visPts !== -1) visTeamBadge += ` ${props.game.visPts}`;

  let homeTeamBadge = props.game.homeTeam;
  if (props.game.homePts !== -1) homeTeamBadge += ` ${props.game.homePts}`;

  return (
    <tr className="table-row">
      <td className="table-item">{props.game.week}</td>
      <td className="table-item">{props.game.startTime}</td>
      <td className={getTableItemClassName(props.game.visStatus)}>
        {visTeamBadge}
      </td>
      <td className={getTableItemClassName(props.game.homeStatus)}>
        {homeTeamBadge}
      </td>
      <td className="table-item">{props.game.updated_at}</td>
    </tr>
  );
};
