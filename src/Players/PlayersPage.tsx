import { makeStyles, Paper, Theme, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { DataGrid, GridColDef, GridRowsProp } from "@material-ui/data-grid";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Game } from "../common/models/Game";
import { Player } from "../common/models/Player";
import { Stat } from "../common/models/Stat";
import GameService from "../common/Services/GameService";
import PlayerService from "../common/Services/PlayerService";
import StatService from "../common/Services/StatService";
import StatSummaryService from "../common/Services/StatSummaryService";

//-------------CSS--------------------
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    "& .super-app-theme--header": {
      backgroundColor: theme.palette.success.dark,
      color: theme.palette.common.white,
    },
    "& .super-app-theme--cell": {
      backgroundColor: theme.palette.success.dark,
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
//------------------------------------

const PlayersPage = () => {
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
      <Typography variant="h3" style={{ marginLeft: "5rem" }}>
        Players Page
      </Typography>
      <Paper
        style={{ marginLeft: "5rem", marginRight: "5rem", padding: "5rem" }}
      >
        <div style={{ height: "100%", width: "100%" }} className={classes.root}>
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
