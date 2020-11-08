import React, { ReactNode } from "react";

import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";

import TileTag from "../tile-tag";

import TeamType from "../../types/TeamType";
import { TeamDisplayWrapperProps } from "./TeamDisplayWrapperProps";

type GameTileViewProps = {
  id: string;
  firstString: string;
  secondString: string;
  team1: TeamType | undefined;
  state1: string;
  setState1: (arg0: string) => void;
  team2: TeamType | undefined;
  state2: string;
  setState2: (arg0: string) => void;
  isBye: boolean;
  render: (props: TeamDisplayWrapperProps) => ReactNode;
};

const GameTileView = ({
  id,
  firstString,
  secondString,
  team1,
  state1,
  setState1,
  team2,
  state2,
  setState2,
  isBye,
  render,
}: GameTileViewProps) => {
  if (team1 === undefined || team2 === undefined) {
    return (
      <ListItem key={id}>
        <TileTag
          firstString={`Team ${team1} or ${team2} is undefined`}
          secondString=""
        />
      </ListItem>
    );
  }

  return (
    <ListItem key={id}>
      <Box flexDirection="row" width="100%">
        <TileTag firstString={firstString} secondString={secondString} />
        <Box display="flex" flexDirection="row">
          <Box my={1} width="100%">
            {render({
              team: team1,
              state: state1,
              setState: setState1,
              setStateOpp: setState2,
            })}
          </Box>
          <Box m="auto" p={1}>
            {isBye ? "" : "@"}
          </Box>
          <Box my={1} width="100%">
            {render({
              team: team2,
              state: state2,
              setState: setState2,
              setStateOpp: setState1,
            })}
          </Box>
        </Box>
      </Box>
    </ListItem>
  );
};

export default GameTileView;
