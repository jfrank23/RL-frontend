import { Button, Grid, Paper, Typography } from "@material-ui/core";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridSelectionModel,
} from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Player } from "../common/models/Player";
import PlayerService from "../common/Services/PlayerService";
import { teamGenStyles } from "./TeamGenStyles";

let selectedPlayers: any = [];
let num_players = 0;

function NumberList(props: any) {
  const n = props.teams;
  const listItems = n.map((n: any) => <li key={n.toString()}>{n}</li>);
  return <ul> {listItems} </ul>;
}

const TeamGenerator = () => {
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);

  useEffect(() => {
    PlayerService.getAllPlayers().then((players) => {
      setAllPlayers(players);
    });
  });
  const rows: GridRowsProp = [
    ...allPlayers.map((player) => ({
      id: player.id,
      playerId: player.id,
      firstName: player.firstName,
      lastName: player.lastName,
    })),
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

  let team1: string[] = [];
  let team2: string[] = [];

  const classes = teamGenStyles();
  function handleCheckbox(e: GridSelectionModel) {
    selectedPlayers = [];
    for (let i = 0; i < e.length; i++) {
      selectedPlayers.push(e[i]);
    }
    num_players = selectedPlayers.length;
  }
  const handleNumberSelected = () => {
    if (num_players >= 2) {
      return "Selected " + num_players + " players";
    } else {
      return "Please select at least two players";
    }
  };

  const handleGenerate = () => {
    team1 = [];
    team2 = [];

    if (num_players > 8) {
      num_players = 8;
    }
    if (num_players < 2) {
      num_players = -1;
    }
    if (num_players === -1) {
      team1.push("Not enough players");
      team2.push("Not enough players");
    } else {
      for (let i = 0; i < allPlayers.length; i++) {
        if (!selectedPlayers.includes(allPlayers[i].id)) {
          allPlayers.splice(i, 1);
          i -= 1;
        }
      }
      while (allPlayers.length > 2 * Math.floor(num_players / 2)) {
        allPlayers.splice(Math.floor(Math.random() * allPlayers.length), 1);
      }
      for (let i = 0; i < allPlayers.length; i++) {
        if (Math.random() < 0.5) {
          if (team1.length === Math.floor(num_players / 2)) {
            team2.push(allPlayers[i].firstName);
          } else {
            team1.push(allPlayers[i].firstName);
          }
        } else {
          if (team2.length === Math.floor(num_players / 2)) {
            team1.push(allPlayers[i].firstName);
          } else {
            team2.push(allPlayers[i].firstName);
          }
        }
      }
    }
    ReactDOM.render(
      <NumberList teams={team2} />,
      document.getElementById("team2")
    );
    ReactDOM.render(
      <NumberList teams={team1} />,
      document.getElementById("team1")
    );
  };
  return (
    <div>
      <Typography variant="h3" className={classes.pageName}>
        Generate a Team
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paper_left}>
            <div
              style={{ height: "100%", width: "100%" }}
              className={classes.root}
            >
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
                onSelectionModelChange={(e) => handleCheckbox(e)}
              />
            </div>
            <Typography variant="h6" className={classes.title}>
              {handleNumberSelected()}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerate}
            >
              Generate
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper_right}>
            <h1>
              {Math.floor(num_players / 2)} V {Math.floor(num_players / 2)}
            </h1>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Paper className={classes.teams}>
                  <Typography variant="h6" className={classes.title}>
                    Team 1
                  </Typography>
                  <Typography
                    variant="h6"
                    id="team1"
                    className={classes.title}
                  ></Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.teams}>
                  <Typography variant="h6" className={classes.title}>
                    Team 2
                  </Typography>
                  <Typography
                    variant="h6"
                    id="team2"
                    className={classes.title}
                  ></Typography>
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
