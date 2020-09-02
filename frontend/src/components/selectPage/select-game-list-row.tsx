import React from "react";
import { GameType } from "../../types/game-type";
import "./select-game-list.css";

interface TeamButtonProps {
  team: string;
  handleTeamSelect: (team: string) => void;
  isTeamSelected: (team: string) => boolean;
}

const TeamButton = (props: TeamButtonProps) => {
  let className = "btn btn-add";
  if (props.isTeamSelected(props.team)) {
    className += " btn-selected";
  }
  return (
    <button
      className={className}
      onClick={() => {
        props.handleTeamSelect(props.team);
      }}
    >
      {props.team}
    </button>
  );
};

interface SelectGameListRowProps {
  game: GameType;
  handleTeamSelect: (team: string) => void;
  isTeamSelected: (team: string) => boolean;
}

export const SelectGameListRow = (props: SelectGameListRowProps) => (
  <tr className="table-row">
    <td className="table-item">{props.game.startTime}</td>
    <td className="table-item">
      <TeamButton
        team={props.game.visTeam}
        handleTeamSelect={props.handleTeamSelect}
        isTeamSelected={props.isTeamSelected}
      />
    </td>
    <td className="table-item">
      <TeamButton
        team={props.game.homeTeam}
        handleTeamSelect={props.handleTeamSelect}
        isTeamSelected={props.isTeamSelected}
      />
    </td>
  </tr>
);
