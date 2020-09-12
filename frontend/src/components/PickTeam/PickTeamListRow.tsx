import React from "react";
import { GameType } from "../../utils/types/game-type";
import { DAYS } from "../../utils/maps/date-format";

interface TeamButtonProps {
  disabled: boolean;
  team: string;
  startTime: number;
  savedSelections: any;
  handleTeamSelect: (team: string) => void;
  isTeamSelected: (team: string) => boolean;
  isTwoTeamSelected: () => boolean;
}

const TeamButton = (props: TeamButtonProps) => {
  let disabled = props.disabled;
  let className = "btn btn-add";

  if (props.isTeamSelected(props.team)) {
    className += " btn-selected";
  } else if (props.savedSelections.includes(props.team)) {
    className += " btn-forbidden";
    disabled = true;
  } else if (props.isTwoTeamSelected()) {
    disabled = true;
  }

  if (props.startTime < Date.now()) {
    disabled = true;
  }

  return (
    <button
      className={className}
      onClick={() => {
        props.handleTeamSelect(props.team);
      }}
      disabled={disabled}
    >
      {props.team}
    </button>
  );
};

interface PickTeamListRowProps {
  disabled1: boolean;
  disabled2: boolean;
  isByeRow: boolean;
  game: GameType;
  savedSelections: any;
  handleTeamSelect: (team: string) => void;
  isTeamSelected: (team: string) => boolean;
  isTwoTeamSelected: () => boolean;
}

export const PickTeamListRow = (props: PickTeamListRowProps) => {
  let content = "";
  if (props.isByeRow) {
    content = "Week 10";
  } else {
    const dateObj = new Date(props.game.startTime);
    const day = DAYS.get(dateObj.getDay());
    const yearRegex = /(\/[^/]+$)/;
    const date = dateObj.toLocaleDateString().replace(yearRegex, "");
    const secondsRegex = /(:[\d]+ )/;
    const time = dateObj.toLocaleTimeString().replace(secondsRegex, " ");
    content = `${day} ${date} ${time}`;
    content = "Week 10";
  }

  return (
    <tr className="table-row">
      <td className="table-item">{content}</td>
      <td className="table-item">
        <TeamButton
          disabled={props.disabled1}
          team={props.game.visTeam}
          startTime={props.game.startTime}
          savedSelections={props.savedSelections}
          handleTeamSelect={props.handleTeamSelect}
          isTeamSelected={props.isTeamSelected}
          isTwoTeamSelected={props.isTwoTeamSelected}
        />
      </td>
      <td className="table-item">
        <TeamButton
          disabled={props.disabled2}
          team={props.game.homeTeam}
          startTime={props.game.startTime}
          savedSelections={props.savedSelections}
          handleTeamSelect={props.handleTeamSelect}
          isTeamSelected={props.isTeamSelected}
          isTwoTeamSelected={props.isTwoTeamSelected}
        />
      </td>
    </tr>
  );
};
