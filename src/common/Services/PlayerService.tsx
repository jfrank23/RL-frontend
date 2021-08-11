import axios from "axios";
import { Player } from "../models/Player";
import { backendUrl } from "../variables/urls";

export default class PlayerService {
  static async getAllPlayers(): Promise<Player[]> {
    let response = await axios.get(`${backendUrl}/players`);
    return response.data.map((player: any) => {
      return {
        firstName: player.first_name,
        lastName: player.last_name,
        id: player.player_id,
      } as Player;
    });
  }

  static async getPlayerById(id: number): Promise<Player> {
    let response = await axios.get(`${backendUrl}/players/${id}`);
    return {
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      id: response.data.player_id,
    };
  }

  static async updatePlayer(player: Player) {
    let response = await axios.put(`${backendUrl}/players`, player);
    console.log(response);
  }

  static async createPlayer(player: Player) {
    let response = await axios.post(`${backendUrl}/players`, player);
    console.log(response);
  }
}
