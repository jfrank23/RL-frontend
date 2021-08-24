import axios from "axios";
import { Player } from "../models/Player";
import { backendUrl } from "../variables/urls";

export default class PlayerService {
  static async getAllPlayers(): Promise<Player[]> {
    let response = await axios.get(`${backendUrl}/players`);
    return response.data.map(mapDbToPlayer);
  }

  static async getPlayerById(id: number): Promise<Player> {
    let response = await axios.get(`${backendUrl}/players/${id}`);
    return mapDbToPlayer(response.data);
  }

  static async updatePlayer(player: Player) {
    let response = await axios.put(`${backendUrl}/players`, player);
  }

  static async createPlayer(player: Player) {
    let response = await axios.post(`${backendUrl}/players`, player);
  }
}
function mapDbToPlayer(player: any): Player {
  return {
    firstName: player.first_name,
    lastName: player.last_name,
    id: player.player_id,
  } as Player;
}
