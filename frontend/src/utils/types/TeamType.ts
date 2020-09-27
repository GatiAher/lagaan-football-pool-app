interface WinLoss {
  numOfWin: number;
  numOfLoss: number;
  numOfTie: number;
}

export interface TeamToWinLossMap {
  [team: string]: WinLoss;
}
