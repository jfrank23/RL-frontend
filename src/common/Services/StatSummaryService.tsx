import { Stat } from "../models/Stat";
import { StatSummary } from "../models/StatSummary";

export default class StatSummaryService {
  static generateSummary(stats: Stat[]): StatSummary {
    const numberOfGames = stats.length;
    let statSummary: StatSummary = {
      total: {
        gamesPlayed: numberOfGames,
        saves: stats.reduce((a, b) => a + b.saves, 0),
        assists: stats.reduce((a, b) => a + b.assists, 0),
        goals: stats.reduce((a, b) => a + b.goals, 0),
        shots: stats.reduce((a, b) => a + b.shots, 0),
        points: stats.reduce((a, b) => a + b.goals + b.assists, 0),
      },
      average: {
        assists: 0,
        goals: 0,
        points: 0,
        shots: 0,
        saves: 0,
      },
    };
    if (numberOfGames > 0) {
      statSummary.average.goals = statSummary.total.goals / numberOfGames;
      statSummary.average.assists = statSummary.total.assists / numberOfGames;
      statSummary.average.points = statSummary.total.points / numberOfGames;
      statSummary.average.shots = statSummary.total.shots / numberOfGames;
      statSummary.average.saves = statSummary.total.saves / numberOfGames;
    }
    return statSummary;
  }
}
