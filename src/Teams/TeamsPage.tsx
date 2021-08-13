import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import { useEffect, useState } from "react";
import { Rank } from "../common/models/Rank";
import PlayerService from "../common/Services/PlayerService";
import TeamService from "../common/Services/TeamService";

const ranks: Rank[] = [
  {id: 123, rank: 3, teamId: 123, gameId: 456511},
  {id: 512, rank: 2, teamId: 678, gameId: 981235},
  {id: 542, rank: 4, teamId: 791, gameId: 981123},
  {id: 712, rank: 1, teamId: 912, gameId: 985121},
  {id: 823, rank: 5, teamId: 821, gameId: 981512},
];

const Teams = () => {
  return (
    <div>
      <h1>Teams Page</h1>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5,10,25]}
          disableSelectionOnClick
          sortModel={[{field: 'rank', sort: 'asc'}]}
        />
      </div>
    </div>
  );
};

const columns : GridColDef[] = [
  {field: 'rank', headerName: 'Rank', width: 200, sortable: false},
  {field: 'teamId', headerName: 'Team ID', width: 200, sortable: false},
  {field: 'gameId', headerName: 'Most recent game', width: 200, sortable: false},
  {field: 'details', 
  headerName: 'Details', 
  renderCell: (params) => (
    <strong>
      <Button variant="contained" color="primary" size="small">Details</Button>
    </strong>
  ),
    width: 150, sortable: false},
];

const rows : GridRowsProp = [
  ... ranks.map((team) => ({
    id: team.teamId,
    rank: team.rank,
    teamId: team.teamId,
    gameId: team.gameId
  }))
];

export default Teams