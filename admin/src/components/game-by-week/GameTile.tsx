import React, { ReactNode } from "react";

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
  isPickWindowOpenDefault?: boolean;
  team1: TeamType | undefined;
  team2: TeamType | undefined;
  render: (props: TeamDisplayWrapperProps) => ReactNode;
};

const GameTile = ({ game, team1, team2, ...props }: GameTileProps) => {
  if (!isFunction(props.render)) {
    throw new Error("render prop is mandatory and needs to be a function!");
  }

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
    } = processGameStartTime(game.startTime);
    isPickWindowOpen = gameIsPickWindowOpen;
    firstString = gameStartTimeString;
    secondString = gamePickWindowString;
    isBye = false;
    render = (arg0: TeamDisplayWrapperProps) =>
      props.render({ game: game, ...arg0 });
  } else {
    id = "BYE";
    isPickWindowOpen = props.isPickWindowOpenDefault
      ? props.isPickWindowOpenDefault
      : false;
    firstString = "Bye Choice";
    secondString = isPickWindowOpen ? "open until Mon, midnight" : "CLOSED";
    isBye = true;
    render = props.render;
  }

  return (
    <GameTileView
      id={id}
      firstString={firstString}
      secondString={secondString}
      isPickWindowOpen={isPickWindowOpen}
      team1={team1}
      team2={team2}
      isBye={isBye}
      render={render}
    />
  );
};

export default GameTile;
