import React, { Component, useState } from "react";
import { Player } from "../common/models/Player";
import {
    Paper,
    Typography,
    Button,
} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';

import { DataGrid, GridRowsProp, GridColDef, GridSelectionApi, GridSelectionModel } from '@material-ui/data-grid';
import { teamGenStyles } from "./TeamGenStyles";
import ReactDOM from "react-dom";

function NumberList(props: any){
    const n = props.teams;
    const listItems = n.map((n:any) =>
        <li key={n.toString()}>
            {n}
        </li>
);
    return (
        <ul> {listItems} </ul>
    );
}

const TeamGenerator = () => {
    const [pageSize, setPageSize] = React.useState<number>(10);
    let players: Player[] = [
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

    let selectedPlayerIDs:any[] = [];
    let playyyerrrz:any[] = [];
    let team1:string[] = [];
    let team2:string[] = [];

    let num_players = players.length;
    const classes = teamGenStyles();
    function handleCheckbox(e:GridSelectionModel){
        selectedPlayerIDs = e;
        console.log(selectedPlayerIDs);
        playyyerrrz = [];
        for(let i = 0; i < e.length; i++){
            
        }
    }

    const handleGenerate = () => {
        team1 = [];
        team2 = [];
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
            ReactDOM.render(
                <NumberList teams={team2} />,
                document.getElementById('team2')
            );
            ReactDOM.render(
                <NumberList teams={team1} />,
                document.getElementById('team1')
            );
        }

    };

    return (
        <div>
            <Typography variant="h3" className={classes.pageName}>Generate a Team</Typography>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Paper className={classes.paper_left}>
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
                                onSelectionModelChange={ (e) => handleCheckbox(e) }
                                
                            />
                        </div>
                        <Typography variant="h6" className={classes.title}>{ num_players } players selected</Typography>
                        <Typography variant="h6" className={classes.title}> { /*selectedPlayerIDs*/ }</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={ handleGenerate }
                        >
                            Generate
                        </Button>
                    </Paper> 
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper_right}>
                        <h1>{ Math.floor(num_players/2) } V { Math.floor(num_players/2) }</h1>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Paper className={classes.teams}>
                                    <Typography variant="h6"  className={classes.title}>Team 1</Typography>
                                    <Typography  variant="h6" id="team1" className={classes.title}></Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper className={classes.teams}>
                                    <Typography  variant="h6" className={classes.title}>Team 2</Typography>
                                    <Typography  variant="h6" id="team2" className={classes.title}></Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>

    );
};

export default TeamGenerator;