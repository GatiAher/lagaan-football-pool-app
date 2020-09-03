import React from "react";
import { GameType } from "../../utils/types/game-type";
import { DAYS } from "../../utils/maps/date-format";
import "./PickTeamList.css";

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

interface PickTeamListRowProps {
  game: GameType;
  handleTeamSelect: (team: string) => void;
  isTeamSelected: (team: string) => boolean;
}

export const PickTeamListRow = (props: PickTeamListRowProps) => {
  const dateObj = new Date(props.game.startTime);
  const day = DAYS.get(dateObj.getDay());
  const yearRegex = /(\/[^/]+$)/;
  const date = dateObj.toLocaleDateString().replace(yearRegex, "");
  const secondsRegex = /(:[\d]+ )/;
  const time = dateObj.toLocaleTimeString().replace(secondsRegex, " ");

  return (
    <tr className="table-row">
      <td className="table-item">{`${day} ${date} ${time}`}</td>
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
};
