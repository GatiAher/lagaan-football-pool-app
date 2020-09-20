import List from "@material-ui/core/List";
import React from "react";

import GameType from "../../utils/types/GameType";
import { TeamToWinLossMap } from "../../utils/types/TeamType";
import DateBox from "../General/DateBox";

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
  teamWinLossMap?: TeamToWinLossMap;
  savedSelections: any;
  handleTeamSelect: (team: string) => void;
  isTeamSelected: (team: string) => boolean;
  isTwoTeamSelected: () => boolean;
}

const PickTeamListRow = (props: PickTeamListRowProps) => {
  return (
    <DateBox startTime={props.game.startTime}>
      <List dense={true} style={{ padding: 0, margin: 0 }}>
        <TeamButton
          team={props.game.visTeam}
          startTime={props.game.startTime}
          savedSelections={props.savedSelections}
          handleTeamSelect={props.handleTeamSelect}
          isTeamSelected={props.isTeamSelected}
          isTwoTeamSelected={props.isTwoTeamSelected}
        />
        <TeamButton
          team={props.game.homeTeam}
          startTime={props.game.startTime}
          savedSelections={props.savedSelections}
          handleTeamSelect={props.handleTeamSelect}
          isTeamSelected={props.isTeamSelected}
          isTwoTeamSelected={props.isTwoTeamSelected}
        />
      </List>
    </DateBox>
  );
};

export default PickTeamListRow;
