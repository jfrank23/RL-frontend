import { DataGrid, GridRowsProp, GridColDef } from "@material-ui/data-grid";
import React from "react";
import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";

import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";
import "../Teams/TeamsPage.css";

import { Rank } from "../common/models/Rank";
import { Player } from "../common/models/Player";
import { Team } from "../common/models/Team";
import { Game } from "../common/models/Game";
import { Stat } from "../common/models/Stat";
import PlayerService from "../common/Services/PlayerService";
import TeamService from "../common/Services/TeamService";
import { idText } from "typescript";

//---------CSS--------------
const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

const StyledHeader = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.success.dark,
      color: theme.palette.common.white,
    },
  })
)(TableCell);

const players: Player[] = [
  { id: 45672, firstName: "Hoa", lastName: "Lu" },
  { id: 12351, firstName: "Jordan", lastName: "Franklin" },
  { id: 27313, firstName: "Ming", lastName: "Yang" },
  { id: 1493, firstName: "Joe", lastName: "Franzo" },
  { id: 812, firstName: "Simon", lastName: "Szymanski" },
];

const players1: Player[] = [
  { id: 45672, firstName: "Hoa", lastName: "Lu" },
  { id: 12351, firstName: "Jordan", lastName: "Franklin" },
  { id: 27313, firstName: "Ming", lastName: "Yang" },
];

const players2: Player[] = [
  { id: 1493, firstName: "Joe", lastName: "Franzo" },
  { id: 812, firstName: "Simon", lastName: "Szymanski" },
];

const players3: Player[] = [
  { id: 985, firstName: "John", lastName: "Bulward" },
  { id: 1493, firstName: "Joe", lastName: "Franzo" },
  { id: 812, firstName: "Simon", lastName: "Szymanski" },
];
const teams: Team[] = [
  { id: 123, team: players1 },
  { id: 912, team: players2 },
  { id: 652, team: players3 },
];

const stat0: Stat[] = [
  {
    id: 487,
    gameId: 496,
    playerId: 456,
    teamId: 684,
    goals: 3,
    assists: 4,
    saves: 0,
    shots: 10,
  },
];

const currentTime: Date = new Date();
console.log(currentTime);

const games: Game[] = [
  {
    id: 4962,
    blueTeam: { id: 123, team: players1 },
    redTeam: { id: 652, team: players3 },
    gameTime: new Date(2005, 8, 4),
    redScore: 3,
    blueScore: 4,
    stats: stat0,
  },
  {
    id: 8562,
    blueTeam: { id: 123, team: players1 },
    redTeam: { id: 912, team: players2 },
    gameTime: new Date(2020, 5, 22),
    redScore: 0,
    blueScore: 8,
    stats: stat0,
  },
];

const headCells = [
  { id: "blueTeam", numberic: false, label: "Blue Team" },
  { id: "redTeam", numberic: false, label: "Orange Team" },
  { id: "gameTime", numberic: true, label: "Game Time" },
  { id: "blueScore", numberic: true, label: "Blue Score" },
  { id: "redScore", numberic: true, label: "Orange Score" },
  { id: "stats", numberic: false, label: "Stats" },
];

//------------------Table---------------------------

function teamPlayers(team: any) {
  return (
    <React.Fragment>
      {team.team.map((player: any) => (
        <div onClick={() => window.open()} className="txtlink">
          {player.firstName} {player.lastName}
        </div>
      ))}
    </React.Fragment>
  );
}

function Row(props: { row: any }) {
  const { row } = props;
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow hover key={row.teamId} className={classes.root}>
        <TableCell align="center">
          {teams.map(
            (teamRow) => teamRow.id === row.blueTeam.id && teamPlayers(teamRow)
          )}
        </TableCell>
        <TableCell align="center">
          {teams.map(
            (teamRow) => teamRow.id === row.redTeam.id && teamPlayers(teamRow)
          )}
        </TableCell>
        <TableCell align="center">
          {currentTime.getDate()}-{currentTime.getMonth() + 1}-
          {currentTime.getFullYear()}
        </TableCell>
        <TableCell align="center">{row.blueScore}</TableCell>
        <TableCell align="center">{row.redScore}</TableCell>
        <TableCell align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => window.open()}
          >
            {<SearchIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const PlayerSpecific = () => {
  const { id } = useParams() as any;
  const [player, setPlayer] = useState<Player>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    PlayerService.getPlayerById(id).then((player) => setPlayer(player));
  }, []);

  return (
    <div>
      <h1>a name id: {id}</h1>
      <h2>General Player Stats</h2>
      <h2>Games Played:</h2>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={games.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow key="header">
              {headCells.map((headCell) => (
                <StyledHeader align="center" key={headCell.id}>
                  {headCell.label}
                </StyledHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {games.map((game) => (
              <Row key={game.id} row={game} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PlayerSpecific;
