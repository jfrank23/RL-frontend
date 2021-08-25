import React from "react";
import { Button, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
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
import GameService from "../common/Services/GameService";
import { useHistory } from "react-router-dom";
import * as moment from 'moment';

//---------CSS--------------
const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "set",
    },
  },
});

const StyledHeader = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.success.dark,
      color: theme.palette.common.white,
      borderRight: `1px solid ${
        theme.palette.type === 'light' ? '#f0f0f0' : '#303030'
      }`,
    },
  })
)(TableCell);

const StyledCell = withStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRight: `1px solid ${
        theme.palette.type === 'light' ? '#f0f0f0' : '#303030'
      }`,
    },
  })
)(TableCell);

//---------------Data--------------------------

const headCells = [
  { id: "date", numberic: true, label: "Date" },
  { id: "blueTeam", numberic: false, label: "Blue Team" },
  { id: "orangeTeam", numberic: false, label: "Orange Team" },
  { id: "blueScore", numberic: true, label: "Blue Score" },
  { id: "orangeScore", numberic: true, label: "Orange Score" },
  { id: "stats", numberic: false, label: "Stats" },
];

//------------------Table---------------------------

function TeamPlayers(team: any) {
  const history = useHistory();

  return (
    <React.Fragment>
      {team.team.map((player: any) => (
        <div
          onClick={() => history.push(`/PlayerSpecific/${player.id}`)}
          className="txtlink"
        >
          {player.firstName} {player.lastName}
        </div>
      ))}
    </React.Fragment>
  );
}

function Row(props: { row: any }) {
  const { row } = props;
  const classes = useRowStyles();
  let date = (moment.default(row.gameTime)).format('DD-MMM-YYYY HH:mm')

  return (
    <React.Fragment>
      <TableRow hover key={row.teamId} className={classes.root}>
        <StyledCell align="center" component="th" scope="row">
          {date}
        </StyledCell>
        <StyledCell align="center">
          {TeamPlayers(row.blueTeam)}
        </StyledCell>
        <StyledCell align="center">
          {TeamPlayers(row.redTeam)}
        </StyledCell>
        <StyledCell align="center">
          {row.blueScore}
        </StyledCell>
        <StyledCell align="center">
          {row.redScore}
        </StyledCell>
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

export function CustomGameTable(props: {game: Game[]}) {
  const allGames = props.game;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, allGames.length - page * rowsPerPage);
  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  return (
    <div style={{height: '100%', width:'100%'}}>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={allGames.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <TableContainer component={Paper}>
        <Table aria-label="games table">
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
            {(rowsPerPage > 0
              ? allGames.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : allGames
            ).map((game: any) => (
              <Row key={game.id} row={game} />
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

const Games = () => {
  const [allGames, setAllGames] = useState<Game[]>([]);
  
  useEffect(() => {
    GameService.getAllGames().then((games) => {
      setAllGames(games);
    });
  }, [allGames]);

  return (
    <div>
      <Typography variant="h3" style={{marginLeft: "5rem"}}>
        Games Page
      </Typography>
      <Paper style={{marginLeft: "5rem", marginRight: "5rem", padding: "5rem"}}>
        <CustomGameTable game={allGames}/>
      </Paper>
    </div>
  );
};

export default Games;