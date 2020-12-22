export default interface GameType {
  id: string;
  startTime: string;
  week: number;
  visTeam: string;
  homeTeam: string;
  created_at: string;
  updated_at: string;
  pickWindowDay?: string;
  pickWindowHour?: number;
}
