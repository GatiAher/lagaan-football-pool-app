interface WinLoss {
  numOfWin: number;
  numOfLoss: number;
}

export interface TeamToWinLossMap {
  [team: string]: WinLoss;
}
