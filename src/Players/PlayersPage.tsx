import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';
import { TablePagination } from '@material-ui/core';
import { useEffect, useState } from "react";
import { Player } from "../common/models/Player";
import PlayerService from "../common/Services/PlayerService";
import TeamService from "../common/Services/TeamService";

const players: Player[] = [
  {id: 456, firstName: 'Hoa', lastName: 'Lu' }, 
  {id: 123, firstName: 'Jordan', lastName: 'Franklin' },
  {id: 273, firstName: 'Ming', lastName: 'Yang' },
  {id: 1493, firstName: 'Joe', lastName: 'Franzo' },
  {id: 812, firstName: 'Simon', lastName: 'Szymanski' },
];

const PlayersPage = () => {
  return (
    <div>
      <h1>Players Page</h1>
      <div style={{height: 400, width:'100%'}}>
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

const rows : GridRowsProp = [
  ... players.map((player) => ({
    id: player.id, 
    playerId: player.id, 
    firstName: player.firstName, 
    lastName: player.lastName,
  }))
];

const columns: GridColDef[] = [
  { field: 'playerId', headerName: 'Player ID', width: 200 },
  { field: 'firstName', headerName: 'First Name', width: 200 },
  { field: 'lastName', headerName: 'Last Name', width: 200 },
  { field: 'gamesPlayed', headerName: 'Games Played', width: 200 },
  { field: 'gamesWon', headerName: 'Games Won', width: 200 },
  { field: 'details', headerName: 'Details', width: 200 },
];

export default PlayersPage;
