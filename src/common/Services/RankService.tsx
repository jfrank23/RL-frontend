import axios from "axios";
import { Rank } from "../models/Rank";
import { backendUrl } from "../variables/urls";
import TeamService from "./TeamService";

export default class RankService {
  static async getAllRanks(): Promise<Rank[]> {
    let response = await axios.get(`${backendUrl}/ranks`);
    return response.data.map(mapDbToRank);
  }

  static async getRanksByTeam(teamId: number): Promise<Rank[]> {
    let response = await axios.get(`${backendUrl}/ranks/team/${teamId}`);
    return response.data.map(mapDbToRank);
  }

  static async createRank(rank: Rank) {
    await axios.post(`${backendUrl}/ranks`, rank);
  }

  static async getMostRecentRankByTeam(teamId: number): Promise<Rank> {
    let response = await axios.get(`${backendUrl}/ranks/team/recent/${teamId}`);
    return mapDbToRank(response.data);
  }

  static async getAllTeamsRecentRanks(): Promise<Rank[]> {
    let ranks: Rank[] = [];
    const teams = await TeamService.getAllTeams();
    for (let team of teams) {
      if (team.id) {
        const rank = await RankService.getMostRecentRankByTeam(team.id);
        ranks.push(rank);
      }
    }
    return ranks;
  }

  static async generateNewRank(
    blueTeamId: number,
    orangeTeamId: number,
    blueScore: number,
    orangeScore: number
  ) {
    let newOrangeRank: number;
    let newBlueRank: number;
    const recentRankBlueObj = await this.getMostRecentRankByTeam(blueTeamId);
    const recentRankOrangObj = await this.getMostRecentRankByTeam(orangeTeamId);
    let mostRecentRankBlue = recentRankBlueObj.rank;
    let mostRecentRankOrange = recentRankOrangObj.rank;
    if (!mostRecentRankBlue) {
      mostRecentRankBlue = 1200;
    }
    if (!mostRecentRankOrange) {
      mostRecentRankOrange = 1200;
    }
    var expectedScoreBlue =
      1 / (1 + Math.pow(10, (mostRecentRankOrange - mostRecentRankBlue) / 400));
    var expectedScoreOrange =
      1 / (1 + Math.pow(10, (mostRecentRankBlue - mostRecentRankOrange) / 400));

    let k = 8;
    if (blueScore > orangeScore) {
      newBlueRank = mostRecentRankBlue + k * (1 - expectedScoreBlue);
      newOrangeRank = mostRecentRankOrange + k * (0 - expectedScoreOrange);
    } else {
      newBlueRank = mostRecentRankBlue + k * (0 - expectedScoreBlue);
      newOrangeRank = mostRecentRankOrange + k * (1 - expectedScoreOrange);
    }
    return [Math.round(newBlueRank), Math.round(newOrangeRank)];
  }
}

const mapDbToRank = (dbData: {
  rank: any;
  game_id: any;
  team_id: any;
  rank_id: any;
}) => {
  return {
    rank: dbData.rank,
    gameId: dbData.game_id,
    teamId: dbData.team_id,
    id: dbData.rank_id,
  } as Rank;
};
