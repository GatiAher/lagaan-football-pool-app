import List from "@material-ui/core/List";
import React from "react";

import { TeamToWinLossMap } from "../../utils/types/TeamType";
import DateBox from "../General/DateBox";

interface TeamButtonProps {
  disabled: boolean;
  name: string;
  savedSelections: any;
  handleTeamSelect: (team: string) => void;
  isTeamSelected: (team: string) => boolean;
  isTwoTeamSelected: () => boolean;
}

const TeamButton = (props: TeamButtonProps) => {
  let disabled = props.disabled;
  let className = "btn btn-add";
  if (props.isTeamSelected(props.name)) {
    className += " btn-selected";
  } else if (props.savedSelections.includes(props.name)) {
    className += " btn-forbidden";
    disabled = true;
  } else if (props.isTwoTeamSelected()) {
    disabled = true;
  }
  return (
    <button
      className={className}
      onClick={() => {
        props.handleTeamSelect(props.name);
      }}
      disabled={disabled}
    >
      {props.name}
    </button>
  );
};

interface PickTeamListRowProps {
  week: number;
  disabled1?: boolean;
  disabled2?: boolean;
  teamWinLossMap?: TeamToWinLossMap;
  savedSelections: any;
  handleTeamSelect: (team: string) => void;
  isTeamSelected: (team: string) => boolean;
  isTwoTeamSelected: () => boolean;
}

const PickByeListRow = (props: PickTeamListRowProps) => {
  return (
    <DateBox week={props.week}>
      <List dense={true} style={{ padding: 0, margin: 0 }}>
        <TeamButton
          name="BYE1"
          disabled={props.disabled1 ? props.disabled1 : false}
          savedSelections={props.savedSelections}
          handleTeamSelect={props.handleTeamSelect}
          isTeamSelected={props.isTeamSelected}
          isTwoTeamSelected={props.isTwoTeamSelected}
        />
        <TeamButton
          name="BYE2"
          disabled={props.disabled2 ? props.disabled2 : false}
          savedSelections={props.savedSelections}
          handleTeamSelect={props.handleTeamSelect}
          isTeamSelected={props.isTeamSelected}
          isTwoTeamSelected={props.isTwoTeamSelected}
        />
      </List>
    </DateBox>
  );
};

export default PickByeListRow;
