import React from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

import PickByeSectionRow from "./PickByeSectionRow";

interface PickByeProps {
  disabled1: boolean;
  disabled2: boolean;
  loading: boolean;
  savedSelections: any;
  handleTeamSelect: (team: string) => void;
  isTeamSelected: (team: string) => boolean;
  isTwoTeamSelected: () => boolean;
}

const PickBye = (props: PickByeProps) => {
  // Show loading message
  if (props.loading) return <p>Game table is loading...</p>;
  return (
    <GridList cellHeight="auto" cols={1}>
      <GridListTile key="bye">
        <PickByeSectionRow
          week={1}
          disabled1={props.disabled1}
          disabled2={props.disabled2}
          key="BYE"
          savedSelections={props.savedSelections}
          handleTeamSelect={props.handleTeamSelect}
          isTeamSelected={props.isTeamSelected}
          isTwoTeamSelected={props.isTwoTeamSelected}
        />
      </GridListTile>
    </GridList>
  );
};

export default PickBye;
