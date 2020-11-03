import GameType from "../../types/GameType";
import TeamType from "../../types/TeamType";

export interface TeamDisplayWrapperProps {
  game?: GameType;
  team: TeamType;
  isPickWindowOpen: boolean;
}
