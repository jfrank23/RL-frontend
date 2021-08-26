import React, { Component } from "react";
import { Player } from "../common/models/Player";
import {
    Paper,
    Typography,
    Button,
} from "@material-ui/core";

import {
    withStyles,
    Theme,
    createStyles,
    makeStyles,
  } from "@material-ui/core/styles";
import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';
import { teamGenStyles } from "./TeamGenStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";


const TeamGenerator = () => {
    const [pageSize, setPageSize] = React.useState<number>(10);
    const players: Player[] = [
        {id: 456, firstName: 'A', lastName: 'Lu' }, 
        {id: 123, firstName: 'B', lastName: 'Franklin' },
        {id: 273, firstName: 'C', lastName: 'Yang' },
        {id: 1493, firstName: 'D', lastName: 'Franzo' },
        {id: 81155, firstName: 'E', lastName: 'Szymanski' },
        {id: 8132, firstName: 'F', lastName: 'Szymanski' },
        {id: 842, firstName: 'G', lastName: 'Szymanski' },
        {id: 812, firstName: 'H', lastName: 'Szymanski' },
        {id: 862, firstName: 'J', lastName: 'Szymanski' },
    ];
    
    const rows : GridRowsProp = [
        ... players.map((player) => ({
          id: player.id, 
          playerId: player.id, 
          firstName: player.firstName, 
          lastName: player.lastName,
        }))
    ];
    const columns: GridColDef[] = [
        {
            field: "firstName",
            headerName: "First Name",
            flex: 1.25,
            headerAlign: "center",
            headerClassName: "super-app-theme--header",
            align: "center",
          },
          {
            field: "lastName",
            headerName: "Last Name",
            flex: 1.25,
            headerAlign: "center",
            headerClassName: "super-app-theme--header",
            align: "center",
          },
    ];


    var team1:string[] = [];
    var team2:string[] = [];
    var num_players = players.length;

    const classes = teamGenStyles();

    const handleGenerate = () => {
        if(num_players > 8){
            num_players = 8;
        }
        while(players.length > num_players){
            players.splice(Math.floor(Math.random()*players.length), 1);
        }
        for (let i = 0; i < players.length; i++){
            if(Math.random() < 0.5){
                if(team1.length === Math.floor(num_players/2)){
                    team2.push(players[i].firstName);
                }else {
                    team1.push(players[i].firstName);
                }
            } else {
                if(team2.length === Math.floor(num_players/2)){
                    team1.push(players[i].firstName);
                }else {
                    team2.push(players[i].firstName);
                }
            }
        }
        return [team1, team2];
    };
    if(num_players > 8){
        num_players = 8;
    }
    for (let i = 0; i < players.length; i++){
        if(Math.random() < 0.5){
            if(team1.length === Math.floor(num_players/2)){
                team2.push(players[i].firstName);
            }else {
                team1.push(players[i].firstName);
            }
        } else {
            if(team2.length === Math.floor(num_players/2)){
                team1.push(players[i].firstName);
            }else {
                team2.push(players[i].firstName);
            }
        }
    }
    return (
        <div>
            <Typography variant="h3" className={classes.title}>Generate a Team</Typography>
            <Paper className={classes.paper}>
                <div style={{ height: "100%", width: "100%" }} className={classes.root}>
                <DataGrid
                    checkboxSelection
                    rows={rows}
                    columns={columns}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 25]}
                    disableColumnMenu
                    autoHeight={true}
                    pagination
                    onSelectionModelChange={e => console.log(e)}
                />
                </div>

                <Typography variant="h6" className={classes.title}>{ num_players } players selected</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleGenerate}
                >
                    Generate
                </Button>
            </Paper>
            
            <Paper className={classes.paper}>
                <h1>{ Math.floor(num_players/2) } V { Math.floor(num_players/2) }</h1>
                <Paper className={classes.teams}>
                    <Typography variant="h6" className={classes.title}>Team 1</Typography>
                    <Typography variant="h6" className={classes.title}>{ team1 }</Typography>
                </Paper>
                <Paper className={classes.teams}>
                    <Typography variant="h6" className={classes.title}>Team 2</Typography>
                    <Typography variant="h6" className={classes.title} >{ team2 }</Typography>
                </Paper>
            </Paper>

            
        </div>

    );
};

export default TeamGenerator;