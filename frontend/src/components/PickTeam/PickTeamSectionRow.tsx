import React from "react";
import Box from "@material-ui/core/Box";

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
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-evenly"
        style={{ padding: 0, margin: 0 }}
      >
        <SelectionButton
          team={props.game.visTeam}
          disabled={isOver}
          savedSelections={props.savedSelections}
          handleTeamSelect={props.handleTeamSelect}
          isTeamSelected={props.isTeamSelected}
          isTwoTeamSelected={props.isTwoTeamSelected}
        >
          {`${props.game.visTeam} visteam`}
        </SelectionButton>
        <SelectionButton
          team={props.game.homeTeam}
          disabled={isOver}
          savedSelections={props.savedSelections}
          handleTeamSelect={props.handleTeamSelect}
          isTeamSelected={props.isTeamSelected}
          isTwoTeamSelected={props.isTwoTeamSelected}
        >
          {`${props.game.homeTeam} homeTeam`}
        </SelectionButton>
      </Box>
    </DateBox>
  );
};

export default PickTeamSectionRow;
