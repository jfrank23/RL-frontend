import React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';
import { makeStyles, TablePagination, Theme, Button, Typography, Paper } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import { useEffect, useState } from "react";
import { Player } from "../common/models/Player";
import PlayerService from "../common/Services/PlayerService";
import TeamService from "../common/Services/TeamService";

//-------------CSS--------------------
const useStyles = makeStyles((theme:Theme) => ({
  root: {
    '& .super-app-theme--header': {
      backgroundColor: theme.palette.success.dark,
      color: theme.palette.common.white,
    },
    '& .super-app-theme--cell': {
      backgroundColor: theme.palette.success.dark,
      color: theme.palette.common.white,
    },
    "& .MuiDataGrid-iconSeparator": {
      display: "none"
    },
    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
      borderRight: `1px solid ${
        theme.palette.type === 'light' ? '#f0f0f0' : '#303030'
      }`,
    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
      borderBottom: `1px solid ${
        theme.palette.type === 'light' ? '#f0f0f0' : '#303030'
      }`,
    }
  },
}));
//------------------------------------

const PlayersPage = () => {
  const classes = useStyles();
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);
  useEffect(() => {
    PlayerService.getAllPlayers().then((players) => {
      setAllPlayers(players);
    });
  }, [allPlayers]);

  const detailButton = (params:any) => {
    return (
      <strong>
          <IconButton aria-label="expand row" size="small" onClick={() => window.open()}>
              {<SearchIcon/>}
          </IconButton>
      </strong>
  )
  };
  
  const rows : GridRowsProp = [
    ... allPlayers.map((player) => ({
      id: player.id, 
      playerId: player.id, 
      firstName: player.firstName, 
      lastName: player.lastName,
    }))
  ];
  
  const columns: GridColDef[] = [
    { field: 'firstName', headerName: 'First Name', flex:1.25, headerAlign: 'center', headerClassName: 'super-app-theme--header', align: 'center' },
    { field: 'lastName', headerName: 'Last Name', flex:1.25, headerAlign: 'center', headerClassName: 'super-app-theme--header', align: 'center' },
    { field: 'gamesPlayed', headerName: 'Played', flex:1, headerAlign: 'center', headerClassName: 'super-app-theme--header', align: 'center' },
    { field: 'gamesWon', headerName: 'Won', flex:1, headerAlign: 'center', headerClassName: 'super-app-theme--header', align: 'center' },
    { field: 'recentMatch', headerName: 'Recent Match', flex:1.25, headerAlign: 'center', headerClassName: 'super-app-theme--header', align: 'center', sortable: false },
    { field: 'details', headerName: 'Detail', flex:0.75, headerAlign: 'center', headerClassName: 'super-app-theme--header', renderCell: detailButton, align: 'center', sortable: false},
  ];

  return (
    <div>
      <Typography variant="h3" style={{marginLeft: "5rem"}}>
        Players Page
      </Typography>
      <Paper style={{marginLeft: "5rem", marginRight: "5rem", padding: "5rem"}}>
        <div style={{height: '100%', width:'100%'}} className={classes.root}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 25]}
            disableColumnMenu
            autoHeight={true}
            pagination
          />
        </div>
      </Paper>
    </div>
  );
};



export default PlayersPage;
