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

    await RankService.createRank({
      gameId: createdGameId,
      rank: 1200, //TODO update
      teamId: blueTeamId,
    });
    await RankService.createRank({
      gameId: createdGameId,
      rank: 1200, //TODO Update
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
}
