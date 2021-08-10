import axios from "axios";
import { Player } from "../models/Player";
import { Team } from "../models/Team";
import { backendUrl } from "../variables/urls";
import PlayerService from "./PlayerService";

export default class TeamService {
  static async getAllTeams(): Promise<Team[]> {
    let response = await axios.get(`${backendUrl}/teams`);
    let players = await PlayerService.getAllPlayers();
    for (let rawTeam of response.data) {
    }

    console.log(response.data);
    return Promise.all([]);
  }
}
