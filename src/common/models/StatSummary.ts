export interface TotalSummary {
  goals: number;
  assists: number;
  points: number;
  gamesPlayed: number;
  saves: number;
  shots: number;
}

export interface AverageSummary {
  goals: number;
  assists: number;
  points: number;
  saves: number;
  shots: number;
}

export interface StatSummary {
  total: TotalSummary;
  average: AverageSummary;
}

export interface OfficeRanking {
  id: number;
  summary: StatSummary;
}
