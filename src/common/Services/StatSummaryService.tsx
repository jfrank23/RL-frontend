import { Game } from "../models/Game";
import { Stat } from "../models/Stat";
import { StatSummary } from "../models/StatSummary";

export default class StatSummaryService {
  static generateSummary(
    stats: Stat[],
    games: Game[],
    playerOrTeamId: number
  ): StatSummary {
    const numberOfGames = games.length;
    const winsAndLosses = getWinsAndLosses(games, playerOrTeamId);

    let statSummary: StatSummary = {
      total: {
        gamesPlayed: numberOfGames,
        saves: stats.reduce((a, b) => a + b.saves, 0),
        assists: stats.reduce((a, b) => a + b.assists, 0),
        goals: stats.reduce((a, b) => a + b.goals, 0),
        shots: stats.reduce((a, b) => a + b.shots, 0),
        points: stats.reduce((a, b) => a + b.goals + b.assists, 0),
        wins: winsAndLosses[0],
        losses: winsAndLosses[1],
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
function getWinsAndLosses(games: Game[], playerOrTeamId: number) {
  let wins = 0;
  let losses = 0;
  for (let game of games) {
    const redTeamIds = game.redTeam.team.map((player) => player.id);
    const onRedTeam =
      game.redTeam.id === playerOrTeamId || redTeamIds.includes(playerOrTeamId);
    const redWon = game.redScore > game.blueScore;
    if (onRedTeam && redWon) {
      wins += 1;
    } else if (!onRedTeam && !redWon) {
      wins += 1;
    } else {
      losses += 1;
    }
  }
  return [wins, losses];
}
