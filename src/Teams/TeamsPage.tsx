//import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';
import React from 'react';
import { Button } from '@material-ui/core';
import { useEffect, useState } from "react";
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import './TeamsPage.css'

import { Rank } from "../common/models/Rank";
import { Player } from "../common/models/Player";
import { Team } from "../common/models/Team";
import { Game } from "../common/models/Game";
import { Stat } from "../common/models/Stat";
import PlayerService from "../common/Services/PlayerService";
import TeamService from "../common/Services/TeamService";

//---------CSS--------------
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const StyledHeader = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.success.dark,
      color: theme.palette.common.white,
    },
  }),
)(TableCell);

//---------------Data--------------------------

const ranks: Rank[] = [
  {id: 1234, rank: 1100, teamId: 123, gameId: 956511},
  {id: 512, rank: 218, teamId: 678, gameId: 981235},
  {id: 542, rank: 435, teamId: 791, gameId: 981123},
  {id: 712, rank: 932, teamId: 912, gameId: 985121},
  {id: 823, rank: 521, teamId: 821, gameId: 981512},
];

const players: Player[] = [
  {id: 45672, firstName: 'Hoa', lastName: 'Lu' }, 
  {id: 12351, firstName: 'Jordan', lastName: 'Franklin' },
  {id: 27313, firstName: 'Ming', lastName: 'Yang' },
  {id: 1493, firstName: 'Joe', lastName: 'Franzo' },
  {id: 812, firstName: 'Simon', lastName: 'Szymanski' },
];

const players1: Player[] = [
  {id: 45672, firstName: 'Hoa', lastName: 'Lu' }, 
  {id: 12351, firstName: 'Jordan', lastName: 'Franklin' },
  {id: 27313, firstName: 'Ming', lastName: 'Yang' },
];

const players2: Player[] = [
  {id: 1493, firstName: 'Joe', lastName: 'Franzo' },
  {id: 812, firstName: 'Simon', lastName: 'Szymanski' },
];

const teams: Team[] = [
  {id: 123, team: players1},
  {id: 912, team: players2},
];

const game1 : Stat[] = [
  {playerId: 45672, goals: 3, assists: 4, saves: 5, shots: 10},
];

const currentTime : Date = new Date();
console.log(currentTime);
const games: Game[] = [
  {id: 956511, blueTeam: {id: 123, team: players1}, redTeam: {id: 912, team: players2}, gameTime: currentTime, redScore: 40, blueScore: 20, stats: game1},
];

const headCells = [
  {id: 'rank', numberic: true, label: 'ELO'},
  {id: 'teamPlayers', numberic: false, label: 'Team Players'},
  {id: 'recentMatch', numberic: true, label: 'Most Recent Match'},
  {id: 'details', numberic: false, label: 'Details'},
];

const sortedRank = ranks.sort((a, b) => b.rank - a.rank);

//------------------Table---------------------------

function teamPlayers(team: any) {
  return (
    <React.Fragment>
      {team.team.map((player:any) => (
        <div onClick={() => window.open()} className='txtlink'>{player.firstName} {player.lastName}</div>
      ))}
    </React.Fragment>
  );
}

function Row(props: {row: any}) {
  const {row} = props;
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow hover key={row.teamId} className={classes.root}>
        <TableCell align="center" component="th" scope="row">
          {row.rank}
        </TableCell>
        <TableCell align="center">
          {teams.map((teamRow) =>(
            teamRow.id===row.teamId &&
            teamPlayers(teamRow)
          ))}
        </TableCell>
        <TableCell align="center">{currentTime.getDate()}-{currentTime.getMonth()+1}-{currentTime.getFullYear()}</TableCell>
        <TableCell align="center">
          <IconButton aria-label="expand row" size="small" onClick={() => window.open()}>
            {<SearchIcon/>}
          </IconButton>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const Teams = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event:any, newPage:any) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event:any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  return (
    <div>
      <h1>Teams</h1>
      <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={ranks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow key='header'>
              {headCells.map((headCell) => (
                <StyledHeader align="center" key={headCell.id}>{headCell.label}</StyledHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ranks.map((rankTeam) => (
              <Row key={rankTeam.rank} row={rankTeam} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Teams