import React, { ReactNode, useState } from "react";

import GameTileView from "./GameTileView";

import TeamType from "../../types/TeamType";
import GameType from "../../types/GameType";
import { TeamDisplayWrapperProps } from "./TeamDisplayWrapperProps";

import processGameStartTime from "./processGameStartTime";

type IsFunction<T> = T extends (...args: any[]) => any ? T : never;

const isFunction = <T extends {}>(value: T): value is IsFunction<T> =>
  typeof value === "function";

type GameTileProps = {
  game?: GameType;
  game_idx?: number;
  isPickWindowOpenDefault?: boolean;
  team1: TeamType | undefined;
  team2: TeamType | undefined;
  render: (props: TeamDisplayWrapperProps) => ReactNode;
};

const GameTile = ({
  game,
  game_idx,
  team1,
  team2,
  ...props
}: GameTileProps) => {
  if (!isFunction(props.render)) {
    throw new Error("render prop is mandatory and needs to be a function!");
  }

  const [state1, setState1] = useState("");
  const [state2, setState2] = useState("");

  let id: string;
  let isPickWindowOpen: boolean;
  let firstString: string;
  let secondString: string;
  let isBye: boolean;
  let render: (props: TeamDisplayWrapperProps) => ReactNode;

  if (game) {
    id = game.id;
    const {
      gameStartTimeString,
      gamePickWindowString,
      gameIsPickWindowOpen,
    } = processGameStartTime(
      game.startTime,
      game.pickWindowDay,
      game.pickWindowHour
    );
    isPickWindowOpen = gameIsPickWindowOpen;
    firstString = gameStartTimeString;
    secondString = gamePickWindowString;
    isBye = false;
    render = (arg0: TeamDisplayWrapperProps) =>
      props.render({ game, game_idx, isPickWindowOpen, ...arg0 });
  } else {
    id = "BYE";
    isPickWindowOpen = props.isPickWindowOpenDefault || false;
    firstString = "Bye Choice";
    secondString = isPickWindowOpen ? "open until Sun, 1pm" : "CLOSED";
    isBye = true;
    render = (arg0: TeamDisplayWrapperProps) =>
      props.render({ isPickWindowOpen, ...arg0 });
  }

  return (
    <GameTileView
      id={id}
      firstString={firstString}
      secondString={secondString}
      team1={team1}
      state1={state1}
      setState1={setState1}
      team2={team2}
      state2={state2}
      setState2={setState2}
      isBye={isBye}
      render={render}
    />
  );
};

export default GameTile;
