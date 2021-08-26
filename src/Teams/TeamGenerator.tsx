import React, { Component } from "react";
import { Player } from "../common/models/Player";
import {
    Paper,
    Typography,
    Button,
} from "@material-ui/core";

import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';
import { teamGenStyles } from "./TeamGenStyles";
import { ENGINE_METHOD_PKEY_ASN1_METHS } from "constants";
import { render } from "@testing-library/react";

class Test extends React.Component{
    render(){
        return <h1>Hello, {this.props}</h1>;
    }
}

const TeamGenerator = () => {
    const players: Player[] = [
        {id: 456, firstName: 'A', lastName: 'Lu' }, 
        {id: 123, firstName: 'B', lastName: 'Franklin' },
        {id: 273, firstName: 'C', lastName: 'Yang' },
        {id: 1493, firstName: 'D', lastName: 'Franzo' },
        {id: 812, firstName: 'E', lastName: 'Szymanski' },
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
        { field: 'playerId', headerName: 'Player ID', width: 200 },
        { field: 'firstName', headerName: 'First Name', width: 200 },
        { field: 'lastName', headerName: 'Last Name', width: 200 },
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
    return (
        <div>
            <Typography variant="h3" className={classes.title}>Generate a Team</Typography>
            <Paper className={classes.paper}>
                <div style={{height: 400, width:'100%'}}>
                    <DataGrid
                        checkboxSelection
                        rows={rows}
                        columns={columns}
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
            <h1 style={{display:'inline'}}>{ Math.floor(num_players/2) } V { Math.floor(num_players/2) }</h1>
            </Paper>
            <Paper className={classes.paper}>
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