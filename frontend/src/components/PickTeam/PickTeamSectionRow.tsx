import List from "@material-ui/core/List";
import React from "react";

import GameType from "../../utils/types/GameType";
import { TeamToWinLossMap } from "../../utils/types/TeamType";
import DateBox from "../General/DateBox";
import SelectionButton from "./SelectionButton";

const PickTeamSectionRow = (props: {
  game: GameType;
  savedSelections: any;
  teamWinLossMap: TeamToWinLossMap;
  handleTeamSelect: (team: string) => void;
  isTeamSelected: (team: string) => boolean;
  isTwoTeamSelected: () => boolean;
}) => {
  const isOver = Date.now().valueOf() > props.game.startTime;
  return (
    <DateBox startTime={props.game.startTime}>
      <List dense={true} style={{ padding: 0, margin: 0 }}>
        <SelectionButton
          team={props.game.visTeam}
          disabled={isOver}
          savedSelections={props.savedSelections}
          handleTeamSelect={props.handleTeamSelect}
          isTeamSelected={props.isTeamSelected}
          isTwoTeamSelected={props.isTwoTeamSelected}
        />
        <SelectionButton
          team={props.game.homeTeam}
          disabled={isOver}
          savedSelections={props.savedSelections}
          handleTeamSelect={props.handleTeamSelect}
          isTeamSelected={props.isTeamSelected}
          isTwoTeamSelected={props.isTwoTeamSelected}
        />
      </List>
    </DateBox>
  );
};

export default PickTeamSectionRow;
