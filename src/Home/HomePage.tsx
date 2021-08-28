import { Button } from "@material-ui/core";
import Example from "./examplePass";

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Game } from "../common/models/Game";
import { Player } from "../common/models/Player";
import { Stat } from "../common/models/Stat";
import GameService from "../common/Services/GameService";
import PlayerService from "../common/Services/PlayerService";
import StatService from "../common/Services/StatService";
import StatSummaryService from "../common/Services/StatSummaryService";
import { Fragment } from "react";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Card from "./Card";
import { Grid } from "@material-ui/core";
import { DataGrid, GridColDef, GridRowsProp } from "@material-ui/data-grid";
import { makeStyles, Paper, Theme, Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Label,
} from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
];

const COLORS = ["#ff9e1f", "#217eff"];

const useStyles = makeStyles((theme: Theme) => ({
  gridContainer: {
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  table: {
    minWidth: 650,
  },
  root: {
    "& .super-app-theme--header": {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },
    "& .super-app-theme--cell": {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },
    "& .MuiDataGrid-iconSeparator": {
      display: "none",
    },
    "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
      borderRight: `1px solid ${
        theme.palette.type === "light" ? "#f0f0f0" : "#303030"
      }`,
    },
    "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
      borderBottom: `1px solid ${
        theme.palette.type === "light" ? "#f0f0f0" : "#303030"
      }`,
    },
  },
}));

function createData(
  position: number,
  name: string,
  calories: string,
  fat: number,
  carbs: number,
  protein: number,
  details: number
) {
  return { position, name, calories, fat, carbs, protein, details };
}

const rows = [
  createData(1, "Lionel Messi", "Lionel Messi", 90, 15, 1880, 1),
  createData(3, "Lionel Messi", "Lionel Messi", 90, 15, 1880, 1),
  createData(4, "Lionel Messi", "Lionel Messi", 90, 15, 1880, 1),
];

const Home = () => {
  // <div>
  //   <h1>Home</h1>
  //   <Button variant="contained" color="primary">
  //     I am a button
  //   </Button>
  //   <Example input1="jordan"></Example>
  // </div>

  const classes = useStyles();
  const history = useHistory();
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);
  const [allStats, setAllStats] = useState<Stat[]>([]);
  const [allGames, setAllGames] = useState<Game[]>([]);

  useEffect(() => {
    PlayerService.getAllPlayers().then((players) => {
      setAllPlayers(players);
    });
    StatService.getAllStats().then((stats) => setAllStats(stats));
    GameService.getAllGames().then((games) => setAllGames(games));
  }, []);

  const detailButton = (params: any) => {
    return (
      <strong>
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => history.push(`/playerSpecific/${params?.id}`)}
        >
          {<SearchIcon />}
        </IconButton>
      </strong>
    );
  };

  const rows: GridRowsProp = [
    ...allPlayers.map((player) => {
      const stats = allStats.filter((stat) => stat.playerId == player.id);
      const games = allGames.filter(
        (game) =>
          game.blueTeam.team.map((player) => player.id).includes(player.id) ||
          game.redTeam.team.map((player) => player.id).includes(player.id)
      );
      const summary = StatSummaryService.generateSummary(
        stats,
        games,
        player.id || 0
      );
      return {
        id: player.id,
        playerId: player.id,
        firstName: player.firstName,
        lastName: player.lastName,
        gamesPlayed: summary.total.gamesPlayed,
        gamesWon: summary.total.wins,
        gamesLost: summary.total.losses,
      };
    }),
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
    {
      field: "gamesPlayed",
      headerName: "Played",
      flex: 1,
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      align: "center",
    },
    {
      field: "gamesWon",
      headerName: "Won",
      flex: 1,
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      align: "center",
    },
    {
      field: "gamesLost",
      headerName: "Lost",
      flex: 1,
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      align: "center",
    },
    {
      field: "details",
      headerName: "Detail",
      flex: 0.75,
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      align: "center",
      renderCell: detailButton,
      sortable: false,
    },
  ];

  return (
    <div>
      <div>
        <Fragment>
          <Container maxWidth="sm">
            <Typography variant="h3" style={{ marginLeft: "5rem" }}>
              Welcome
            </Typography>
          </Container>

          <Typography variant="h3" style={{ marginLeft: "5rem" }}>
            Pie Chart
          </Typography>

          <Paper
            style={{ marginLeft: "5rem", marginRight: "5rem", padding: "5rem" }}
          >
            <Container maxWidth="sm">
              <PieChart width={500} height={300}>
                <Pie
                  data={data}
                  cx={100}
                  cy={100}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}

                  <Label value="label" position="center" />
                </Pie>
              </PieChart>
            </Container>
          </Paper>

          <Container maxWidth="sm">
            <h1> </h1>
          </Container>

          <Typography variant="h3" style={{ marginLeft: "5rem" }}>
            Leader Board
          </Typography>

          <Paper
            style={{ marginLeft: "5rem", marginRight: "5rem", padding: "5rem" }}
          >
            <div
              style={{ height: "100%", width: "100%" }}
              className={classes.root}
            >
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

          <Container maxWidth="sm">
            <h1> </h1>
          </Container>

          <Typography variant="h3" style={{ marginLeft: "5rem" }}>
            Stats
          </Typography>

          <Paper
            style={{ marginLeft: "5rem", marginRight: "5rem", padding: "5rem" }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={4}>
                <Card />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card />
              </Grid>
            </Grid>
          </Paper>

          <Container maxWidth="sm">
            <h1> </h1>
          </Container>
        </Fragment>
      </div>
    </div>
  );
};

export default Home;
