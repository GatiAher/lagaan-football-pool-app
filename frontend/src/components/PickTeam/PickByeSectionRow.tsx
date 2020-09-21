import React from "react";
import List from "@material-ui/core/List";

import DateBox from "../General/DateBox";
import SelectionButton from "./SelectionButton";

const PickByeSectionRow = (props: {
  week: number;
  savedSelections: any;
  setSelectionA: (team: string) => void;
  setSelectionB: (team: string) => void;
  handleTeamSelect: (team: string) => void;
  isTeamSelected: (team: string) => boolean;
  isTwoTeamSelected: () => boolean;
}) => {
  let disableBye1 = false;
  let disableBye2 = false;
  if (props.week === 10) {
    if (!props.savedSelections.includes("BYE1")) {
      props.setSelectionA("BYE1");
      disableBye1 = true;
    }
    if (!props.savedSelections.includes("BYE2")) {
      props.setSelectionB("BYE2");
      disableBye2 = true;
    }
  } else if (props.week > 10) {
    disableBye1 = true;
    disableBye2 = true;
  }
  return (
    <DateBox week={props.week}>
      <List dense={true} style={{ padding: 0, margin: 0 }}>
        <SelectionButton
          team="BYE1"
          disabled={disableBye1}
          savedSelections={props.savedSelections}
          handleTeamSelect={props.handleTeamSelect}
          isTeamSelected={props.isTeamSelected}
          isTwoTeamSelected={props.isTwoTeamSelected}
        />
        <SelectionButton
          team="BYE2"
          disabled={disableBye1}
          savedSelections={props.savedSelections}
          handleTeamSelect={props.handleTeamSelect}
          isTeamSelected={props.isTeamSelected}
          isTwoTeamSelected={props.isTwoTeamSelected}
        />
      </List>
    </DateBox>
  );
};

export default PickByeSectionRow;
