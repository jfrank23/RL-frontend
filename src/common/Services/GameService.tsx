import axios from "axios";
import { Game } from "../models/Game";
import { backendUrl } from "../variables/urls";
import RankService from "./RankService";
import StatService from "./StatService";
import TeamService from "./TeamService";

export default class GameService {
  static async createGame(game: Game) {
    let blueTeamId: number = await TeamService.addTeam(game.blueTeam.team);
    let redTeamId: number = await TeamService.addTeam(game.redTeam.team);
    let gameApiObject = {
      blueTeam: blueTeamId,
      redTeam: redTeamId,
      gameTime: game.gameTime,
      redScore: game.redScore,
      blueScore: game.blueScore,
    };
    let response = await axios.post(`${backendUrl}/games`, gameApiObject);
    let createdGameId = response.data[0].game_id;

    const newRanks = await RankService.generateNewRank(
      blueTeamId,
      redTeamId,
      game.blueScore,
      game.redScore
    );

    await RankService.createRank({
      gameId: createdGameId,
      rank: newRanks[0],
      teamId: blueTeamId,
    });
    await RankService.createRank({
      gameId: createdGameId,
      rank: newRanks[1],
      teamId: redTeamId,
    });
    for (let stat of game.stats) {
      stat.gameId = createdGameId;
      if (game.blueTeam.team.some((player) => player.id === stat.playerId)) {
        stat.teamId = blueTeamId;
        StatService.createStat(stat);
      } else {
        stat.teamId = redTeamId;
        StatService.createStat(stat);
      }
    }
  }

  static async getAllGames(): Promise<Game[]> {
    let dbGames = (await axios.get(`${backendUrl}/games`)).data;

    const mapped = dbGames.map(async (dbGame: dbGame) => {
      let blueTeam = await TeamService.getTeamById(dbGame.blue_team);
      let orangeTeam = await TeamService.getTeamById(dbGame.red_team);
      let stats = await StatService.getStatsByGame(dbGame.game_id);
      return {
        blueScore: dbGame.blue_score,
        redScore: dbGame.red_score,
        gameTime: dbGame.game_time,
        id: dbGame.game_id,
        blueTeam: blueTeam,
        redTeam: orangeTeam,
        stats: stats,
      } as Game;
    });
    const finalData = await Promise.all<Game>(mapped);
    return finalData;
  }

  static async getGamesByTeam(teamId: number): Promise<Game[]> {
    let dbGames = (await axios.get(`${backendUrl}/games/team/${teamId}`)).data;

    const mapped = dbGames.map(async (dbGame: dbGame) => {
      let blueTeam = await TeamService.getTeamById(dbGame.blue_team);
      let orangeTeam = await TeamService.getTeamById(dbGame.red_team);
      let stats = await StatService.getStatsByGame(dbGame.game_id);
      return {
        blueScore: dbGame.blue_score,
        redScore: dbGame.red_score,
        gameTime: dbGame.game_time,
        id: dbGame.game_id,
        blueTeam: blueTeam,
        redTeam: orangeTeam,
        stats: stats,
      } as Game;
    });
    const finalData = await Promise.all<Game>(mapped);
    return finalData;
  }

  static async getGamesByPlayerId(playerId: number): Promise<Game[]> {
    const teams = await TeamService.getTeamsByPlayerId(playerId);
    let games: Game[] = [];
    for (let team of teams) {
      if (team.id) {
        const gamesForTeam = await GameService.getGamesByTeam(team.id);
        games = games.concat(gamesForTeam);
      }
    }
    return games;
  }

  static async getGamesById(gameId: number): Promise<Game> {
    let dbGames = (await axios.get(`${backendUrl}/games/${gameId}`)).data;

    const mapped = dbGames.map(async (dbGame: dbGame) => {
      let blueTeam = await TeamService.getTeamById(dbGame.blue_team);
      let orangeTeam = await TeamService.getTeamById(dbGame.red_team);
      let stats = await StatService.getStatsByGame(dbGame.game_id);
      return {
        blueScore: dbGame.blue_score,
        redScore: dbGame.red_score,
        gameTime: dbGame.game_time,
        id: dbGame.game_id,
        blueTeam: blueTeam,
        redTeam: orangeTeam,
        stats: stats,
      } as Game;
    });
    const finalData = await Promise.all<Game>(mapped);
    return finalData[0];
  }
}

interface dbGame {
  blue_team: number;
  red_team: number;
  game_id: number;
  blue_score: number;
  red_score: number;
  game_time: Date;
}
