import axios from "axios";
import { Game } from "../models/Game";
import { Player } from "../models/Player";
import { Stat } from "../models/Stat";
import { Team } from "../models/Team";
import { backendUrl } from "../variables/urls";

export default class StatService {
  static async getAllStats(): Promise<Stat[]> {
    let response = await axios.get(`${backendUrl}/stats`);
    return response.data.map(mapDbToStat);
  }

  static async getStatsByPlayer(player: Player): Promise<Stat[]> {
    let response = await axios.get(`${backendUrl}/stats/player/${player.id}`);
    return response.data.map(mapDbToStat);
  }

  static async getStatsByGame(gameId: number): Promise<Stat[]> {
    let response = await axios.get(`${backendUrl}/stats/game/${gameId}`);
    return response.data.map(mapDbToStat);
  }

  static async getStatsByTeam(team: Team): Promise<Stat[]> {
    let response = await axios.get(`${backendUrl}/stats/team/${team.id}`);
    return response.data.map(mapDbToStat);
  }

  static async createStat(stat: Stat) {
    await axios.post(`${backendUrl}/stats`, stat);
  }
}

interface dbStat {
  player_id: any;
  game_id: any;
  stat_id: any;
  team_id: any;
  assists: any;
  goals: any;
  saves: any;
  shots: any;
}

const mapDbToStat = (dbData: dbStat) => {
  return {
    playerId: dbData.player_id,
    gameId: dbData.game_id,
    id: dbData.stat_id,
    teamId: dbData.team_id,
    assists: dbData.assists,
    goals: dbData.goals,
    saves: dbData.saves,
    shots: dbData.shots,
  } as Stat;
};
