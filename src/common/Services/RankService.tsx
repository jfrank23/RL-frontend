import axios from "axios";
import { Rank } from "../models/Rank";
import { Team } from "../models/Team";
import { backendUrl } from "../variables/urls";

export default class RankService {
  static async getAllRanks(): Promise<Rank[]> {
    let response = await axios.get(`${backendUrl}/ranks`);
    console.log(response.data);
    return response.data;
  }

  static async getRanksByTeam(team: Team): Promise<Rank[]> {
    let response = await axios.get(`${backendUrl}/ranks/team/${team.id}`);
    console.log(response.data);
    return response.data;
  }

  static async createRank(rank: Rank) {
    await axios.post(`${backendUrl}/rank`, rank);
  }
}
