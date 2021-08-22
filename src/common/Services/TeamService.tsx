import axios from "axios";
import { Player } from "../models/Player";
import { Team } from "../models/Team";
import { backendUrl } from "../variables/urls";
import PlayerService from "./PlayerService";

export default class TeamService {
  static async getAllTeams(): Promise<Team[]> {
    let response = await axios.get(`${backendUrl}/teams`);
    let players = await PlayerService.getAllPlayers();
    let teams: Team[] = [];
    for (let rawTeam of response.data) {
      let id = rawTeam.team_id;
      let playersOnTeam: Player[] = [];
      for (let playerId of [
        rawTeam.player1,
        rawTeam.player2,
        rawTeam.player3,
        rawTeam.player4,
      ]) {
        if (playerId) {
          let matchedPlayer = players.find(
            (player) => player.id === Number(playerId)
          );
          if (matchedPlayer) {
            playersOnTeam.push(matchedPlayer);
          }
        }
      }
      teams.push({ id: id, team: playersOnTeam });
    }
    return teams;
  }

  static async getTeamByPlayers(players: Player[]) {
    let allTeams = await TeamService.getAllTeams();
    let teamsInLen = allTeams.filter(
      (team) => team.team.length === players.length
    );
    let foundTeam = teamsInLen.find((team) => teamsAreEqual(team, players));
    return foundTeam;
  }

  static async getTeamById(teamId: number): Promise<Team> {
    let dbTeam = (await axios.get(`${backendUrl}/teams/${teamId}`)).data;
    let id = dbTeam.team_id;
    let playersOnTeam: Player[] = [];
    for (let playerId of [
      dbTeam.player1,
      dbTeam.player2,
      dbTeam.player3,
      dbTeam.player4,
    ]) {
      if (playerId) {
        let matchedPlayer = await PlayerService.getPlayerById(playerId);
        if (matchedPlayer) {
          playersOnTeam.push(matchedPlayer);
        }
      }
    }
    return { id: id, team: playersOnTeam };
  }

  static async addTeam(players: Player[]) {
    let existingTeam = await this.getTeamByPlayers(players);
    if (!existingTeam) {
      let listOfIds = players.map((player) => player.id);
      let response = await axios.post(`${backendUrl}/teams`, listOfIds);
      return response.data[0].team_id;
    } else {
      return existingTeam.id;
    }
  }
}

function teamsAreEqual(team: Team, players: Player[]): boolean {
  let correct = 0;
  for (let player of players) {
    for (let playerInTeam of team.team) {
      if (playerInTeam.id === player.id) {
        correct += 1;
      }
    }
  }
  return correct === players.length;
}
