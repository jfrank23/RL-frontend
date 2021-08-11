import axios from "axios";
import { Game } from "../models/Game";
import { Player } from "../models/Player";
import { Stat } from "../models/Stat";
import { Team } from "../models/Team";
import { backendUrl } from "../variables/urls";

export default class StatService {
  static async getAllStats(): Promise<Stat[]> {
    let response = await axios.get(`${backendUrl}/stats`);
    console.log(response.data);
    return response.data;
  }

  static async getStatsByPlayer(player: Player): Promise<Stat[]> {
    let response = await axios.get(`${backendUrl}/stats/player/${player.id}`);
    console.log(response.data);
    return response.data;
  }

  static async getStatsByGame(game: Game): Promise<Stat[]> {
    let response = await axios.get(`${backendUrl}/stats/game/${game.id}`);
    console.log(response.data);
    return response.data;
  }

  static async getStatsByTeam(team: Team): Promise<Stat[]> {
    let response = await axios.get(`${backendUrl}/stats/team/${team.id}`);
    console.log(response.data);
    return response.data;
  }

  static async createStat(stat: Stat) {
    await axios.post(`${backendUrl}/stats`, stat);
  }
}
