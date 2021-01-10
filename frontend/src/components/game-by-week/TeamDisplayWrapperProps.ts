import GameType from "../../types/GameType";
import TeamType from "../../types/TeamType";

export interface TeamDisplayWrapperProps {
  game?: GameType;
  game_idx?: number;
  team: TeamType;
  isPickWindowOpen?: boolean;
  state: string;
  setState: (arg0: string) => void;
  setStateOpp: (arg0: string) => void;
}
