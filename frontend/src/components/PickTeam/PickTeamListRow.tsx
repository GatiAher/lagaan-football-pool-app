import React from "react";
import { GameType } from "../../utils/types/game-type";
import { DAYS } from "../../utils/maps/date-format";

interface TeamButtonProps {
  team: string;
  startTime: number;
  savedSelections: any;
  handleTeamSelect: (team: string) => void;
  isTeamSelected: (team: string) => boolean;
  isTwoTeamSelected: () => boolean;
}

const TeamButton = (props: TeamButtonProps) => {
  let disabled = false;
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
  game: GameType;
  savedSelections: any;
  handleTeamSelect: (team: string) => void;
  isTeamSelected: (team: string) => boolean;
  isTwoTeamSelected: () => boolean;
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
          startTime={props.game.startTime}
          savedSelections={props.savedSelections}
          handleTeamSelect={props.handleTeamSelect}
          isTeamSelected={props.isTeamSelected}
          isTwoTeamSelected={props.isTwoTeamSelected}
        />
      </td>
      <td className="table-item">
        <TeamButton
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
