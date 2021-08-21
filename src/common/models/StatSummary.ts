export interface StatSummary {
  total: {
    goals: number;
    assists: number;
    points: number;
    gamesPlayed: number;
    saves: number;
    shots: number;
  };
  average: {
    goals: number;
    assists: number;
    points: number;
    saves: number;
    shots: number;
  };
}
