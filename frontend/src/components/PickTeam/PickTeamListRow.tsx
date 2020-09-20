import React from "react";
import GameType from "../../utils/types/GameType";
import dateParser from "../../utils/dateParser";
import { TeamToWinLossMap } from "../../utils/types/TeamType";

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
  disabled1?: boolean;
  disabled2?: boolean;
  isByeRow?: boolean;
  teamWinLossMap?: TeamToWinLossMap;
  game: GameType;
  savedSelections: any;
  handleTeamSelect: (team: string) => void;
  isTeamSelected: (team: string) => boolean;
  isTwoTeamSelected: () => boolean;
}

const PickTeamListRow = (props: PickTeamListRowProps) => {
  let dateDisplay = "";
  let visTeamScoreTally = "";
  let homeTeamScoreTally = "";
  if (props.isByeRow) {
    dateDisplay = "Week 10";
  } else {
    const dateObj = dateParser(props.game.startTime);
    dateDisplay = `${dateObj.day} ${dateObj.date} ${dateObj.time}`;
    if (props.teamWinLossMap) {
      // TODO: fix rendering before teamWinLossMap is loaded
      if (props.teamWinLossMap[props.game.visTeam]) {
        visTeamScoreTally = `${
          props.teamWinLossMap[props.game.visTeam].numOfWin
        }-${props.teamWinLossMap[props.game.visTeam].numOfLoss}`;
      }
      if (props.teamWinLossMap[props.game.homeTeam]) {
        homeTeamScoreTally = `${
          props.teamWinLossMap[props.game.homeTeam].numOfWin
        }-${props.teamWinLossMap[props.game.homeTeam].numOfLoss}`;
      }
    }
  }
  return (
    <tr className="table-row">
      <td className="table-item">{dateDisplay}</td>
      <td className="table-item">{visTeamScoreTally}</td>
      <td className="table-item">
        <TeamButton
          disabled={props.disabled1 ? props.disabled1 : false}
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
          disabled={props.disabled2 ? props.disabled2 : false}
          team={props.game.homeTeam}
          startTime={props.game.startTime}
          savedSelections={props.savedSelections}
          handleTeamSelect={props.handleTeamSelect}
          isTeamSelected={props.isTeamSelected}
          isTwoTeamSelected={props.isTwoTeamSelected}
        />
      </td>
      <td className="table-item">{homeTeamScoreTally}</td>
    </tr>
  );
};

export default PickTeamListRow;
