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
  isPickWindowOpen: boolean;
  team1: TeamType | undefined;
  team2: TeamType | undefined;
  isBye: boolean;
  render: (props: TeamDisplayWrapperProps) => ReactNode;
};

const GameTileView = ({
  id,
  firstString,
  secondString,
  isPickWindowOpen,
  team1,
  team2,
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
              isPickWindowOpen: isPickWindowOpen,
            })}
          </Box>
          <Box m="auto" p={1}>
            {isBye ? "" : "@"}
          </Box>
          <Box my={1} width="100%">
            {render({
              team: team2,
              isPickWindowOpen: isPickWindowOpen,
            })}
          </Box>
        </Box>
      </Box>
    </ListItem>
  );
};

export default GameTileView;
