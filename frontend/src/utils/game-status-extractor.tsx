import { GameType } from "./types/game-type";

// give games, team name, season, week -> game status (2: win, 1: tie, 0: loss, -1: not started)
export const gameStatusExtractor = (
  games: GameType[],
  team: string,
  season: number,
  week: number
): number => {
  const gamesInContext = games.filter(
    (game) => game.season === season && game.week === week
  );
  const homeTeamGame = gamesInContext.filter((game) => game.homeTeam == team);
  if (homeTeamGame.length == 1) {
    return homeTeamGame[0].homeStatus;
  }
  const visTeamGame = gamesInContext.filter((game) => game.visTeam == team);
  if (visTeamGame.length == 1) {
    return visTeamGame[0].visStatus;
  }

  throw new Error(
    `team ${team} not found in any of the games for season ${season}, week ${week}`
  );
};
