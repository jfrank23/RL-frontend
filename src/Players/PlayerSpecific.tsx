import { DataGrid, GridRowsProp, GridColDef } from "@material-ui/data-grid";
import { TablePagination } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Player } from "../common/models/Player";
import PlayerService from "../common/Services/PlayerService";
import TeamService from "../common/Services/TeamService";
import { Stat } from "../common/models/Stat";
import { Rank } from "../common/models/Rank";
import { Team } from "../common/models/Team";
import { Game } from "../common/models/Game";
import { useParams } from "react-router-dom";

// ********
//const { player } = useParams();
const player: Player = { id: 456, firstName: "Baltus", lastName: "Darsnatch" };

const pla1: Player[] = [
  { id: 456, firstName: "Hoa", lastName: "Lu" },
  { id: 123, firstName: "Jordan", lastName: "Franklin" },
  { id: 273, firstName: "Ming", lastName: "Yang" },
];

const pla2: Player[] = [
  { id: 1493, firstName: "Joe", lastName: "Franzo" },
  { id: 812, firstName: "Simon", lastName: "Szymanski" },
];

const pla3: Player[] = [
  { id: 985, firstName: "John", lastName: "Bulward" },
  { id: 1493, firstName: "Joe", lastName: "Franzo" },
  { id: 812, firstName: "Simon", lastName: "Szymanski" },
];

const stat0: Stat[] = [
  {
    id: 487,
    gameId: 496,
    playerId: 456,
    teamId: 684,
    goals: 3,
    assists: 4,
    saves: 0,
    shots: 10,
  },
];

const team1: Team = { id: 684, team: pla1 };
const team2: Team = { id: 458, team: pla2 };
const team3: Team = { id: 499, team: pla3 };

const games: Game[] = [
  {
    id: 496,
    blueTeam: team1,
    redTeam: team2,
    gameTime: new Date(2005, 8, 4),
    redScore: 3,
    blueScore: 4,
    stats: stat0,
  },
  {
    id: 852,
    blueTeam: team1,
    redTeam: team3,
    gameTime: new Date(2020, 5, 22),
    redScore: 0,
    blueScore: 8,
    stats: stat0,
  },
];

const PlayerSpecific = () => {
  return (
    <div>
      <h1>
        {player.firstName} {player.lastName}, ID: {player.id}
      </h1>
      <h2>Player Stats</h2>
      <h2>Games Played</h2>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </div>
    </div>
  );
};

const rows: GridRowsProp = [
  ...games.map((game) => ({
    id: game.id,
    gameId: game.id,
    blueTeam:
      game.blueTeam.team[0].firstName +
      "<br>" +
      game.blueTeam.team[1].firstName,
    redTeam: game.redTeam.id,
    gameTime: game.gameTime,
    blueScore: game.blueScore,
    redScore: game.redScore,
  })),
];

const columns: GridColDef[] = [
  { field: "gameId", headerName: "Game ID", width: 200 },
  { field: "blueTeam", headerName: "Blue Team", width: 300 },
  { field: "redTeam", headerName: "Orange Team", width: 220 },
  { field: "gameTime", headerName: "Game Time", width: 200 },
  { field: "blueScore", headerName: "Blue Score", width: 200 },
  { field: "redScore", headerName: "Orange Score", width: 220 },
  { field: "stats", headerName: "Stats", width: 200 },
];

export default PlayerSpecific;
