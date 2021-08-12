import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';
import { useEffect, useState } from "react";
import { Player } from "../common/models/Player";
import PlayerService from "../common/Services/PlayerService";
import TeamService from "../common/Services/TeamService";

const PlayersPage = () => (
  <div>
    <h1>Players Page</h1>
    <div style={{height:500, width:'100%'}}>
      <DataGrid 
        rows={rows}
        columns={columns}
        pageSize={10}
      />
    </div>
  </div>
);

const rows  : GridRowsProp = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'XGrid', col2: 'is Awesome' },
  { id: 3, col1: 'Material-UI', col2: 'is Amazing' },
];

const columns: GridColDef[] = [
  { field: 'col1', headerName: 'Player ID', width: 200 },
  { field: 'col2', headerName: 'First Name', width: 200 },
  { field: 'col3', headerName: 'Last Name', width: 200 },
  { field: 'col4', headerName: 'Games Played', width: 200 },
  { field: 'col5', headerName: 'Games Won', width: 200 },
  { field: 'col6', headerName: 'Details', width: 200 },
];

export default PlayersPage;
