import {
  AverageSummary,
  OfficeRanking,
  StatSummary,
  TotalSummary,
} from "../models/StatSummary";
import GameService from "./GameService";
import PlayerService from "./PlayerService";
import StatService from "./StatService";
import StatSummaryService from "./StatSummaryService";
import TeamService from "./TeamService";

export default class OfficeRankService {
  static async getTeamRanking(teamId: number) {
    const teams = await TeamService.getAllTeams();
    let summaries: OfficeRanking[] = [];
    let rankings: OfficeRanking = {
      id: teamId,
      summary: {
        average: { assists: 0, points: 0, saves: 0, shots: 0, goals: 0 },
        total: {
          assists: 0,
          goals: 0,
          shots: 0,
          saves: 0,
          points: 0,
          gamesPlayed: 0,
          wins: 0,
          losses: 0,
        },
      },
    };
    for (let team of teams) {
      if (!team.id) {
        continue;
      }
      const stats = await StatService.getStatsByTeam(team);
      const games = await GameService.getGamesByTeam(team.id);
      let summary = StatSummaryService.generateSummary(stats, games, team.id);
      summaries.push({ id: team.id || 0, summary: summary });
    }
    for (let field of [
      "assists",
      "points",
      "saves",
      "shots",
      "goals",
      "gamesPlayed",
    ] as (keyof TotalSummary)[]) {
      summaries.sort((a, b) => b.summary.total[field] - a.summary.total[field]);
      const rank = summaries.findIndex((a) => a.id === teamId) + 1;
      rankings.summary.total[field] = rank;
    }
    for (let field of [
      "assists",
      "points",
      "saves",
      "shots",
      "goals",
      "gamesPlayed",
    ] as (keyof AverageSummary)[]) {
      summaries.sort(
        (a, b) => b.summary.average[field] - a.summary.average[field]
      );
      const rank = summaries.findIndex((a) => a.id === teamId) + 1;
      rankings.summary.average[field] = rank;
    }

    return rankings;
  }
  static async getPlayerRanking(playerId: number) {
    const players = await PlayerService.getAllPlayers();
    let summaries: OfficeRanking[] = [];
    let rankings: OfficeRanking = {
      id: playerId,
      summary: {
        average: { assists: 0, points: 0, saves: 0, shots: 0, goals: 0 },
        total: {
          assists: 0,
          goals: 0,
          shots: 0,
          saves: 0,
          points: 0,
          gamesPlayed: 0,
          wins: 0,
          losses: 0,
        },
      },
    };
    for (let player of players) {
      if (!player.id) {
        continue;
      }
      const stats = await StatService.getStatsByPlayer(player);
      const games = await GameService.getGamesByPlayerId(player.id);
      let summary = StatSummaryService.generateSummary(stats, games, player.id);
      summaries.push({ id: player.id || 0, summary: summary });
    }
    for (let field of [
      "assists",
      "points",
      "saves",
      "shots",
      "goals",
      "gamesPlayed",
      "wins",
    ] as (keyof TotalSummary)[]) {
      summaries.sort((a, b) => b.summary.total[field] - a.summary.total[field]);
      const rank = summaries.findIndex((a) => a.id === playerId) + 1;
      rankings.summary.total[field] = rank;
    }
    for (let field of [
      "assists",
      "points",
      "saves",
      "shots",
      "goals",
      "gamesPlayed",
    ] as (keyof AverageSummary)[]) {
      summaries.sort(
        (a, b) => b.summary.average[field] - a.summary.average[field]
      );
      const rank = summaries.findIndex((a) => a.id === playerId) + 1;
      rankings.summary.average[field] = rank;
    }

    return rankings;
  }
}
