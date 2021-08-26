//import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';
import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import SearchIcon from "@material-ui/icons/Search";
import * as moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Game } from "../common/models/Game";
import { Rank } from "../common/models/Rank";
import { Team } from "../common/models/Team";
import GameService from "../common/Services/GameService";
import RankService from "../common/Services/RankService";
import TeamService from "../common/Services/TeamService";
import "./TeamsPage.css";

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
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
      borderRight: `1px solid ${
        theme.palette.type === "light" ? "#f0f0f0" : "#303030"
      }`,
    },
  })
)(TableCell);

const StyledCell = withStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRight: `1px solid ${
        theme.palette.type === "light" ? "#f0f0f0" : "#303030"
      }`,
    },
  })
)(TableCell);

//------------------Table---------------------------

function TeamPlayers(team?: Team) {
  const history = useHistory();

  return (
    <React.Fragment>
      {team?.team.map((player: any) => (
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

function TeamRow(props: { teamRow: any }) {
  const teamRow = props.teamRow;
  const history = useHistory();
  const [team, setTeam] = useState<Team>();
  const [recentMatch, setRecentMatch] = useState<Game>();
  const classes = useRowStyles();
  useEffect(() => {
    TeamService.getTeamById(teamRow.teamId).then((team) => {
      setTeam(team);
    });
    GameService.getGamesById(teamRow.gameId).then((match) => {
      setRecentMatch(match);
    });
  }, []);
  let date = moment
    .default(recentMatch?.gameTime)
    .format("MMM DD,YYYY hh:mm a");

  return (
    <React.Fragment>
      <TableRow hover key={teamRow.teamId} className={classes.root}>
        <StyledCell align="center" component="th" scope="row">
          {teamRow.rank}
        </StyledCell>
        <StyledCell align="center">{TeamPlayers(team)}</StyledCell>
        <StyledCell align="center">
          <div
            onClick={() => history.push(`/games/${recentMatch?.id}`)}
            className="txtlink"
          >
            {date}
          </div>
        </StyledCell>
        <TableCell align="center">
          <IconButton
            aria-label="team specific"
            size="small"
            onClick={() => history.push(`/teams/${teamRow.teamId}`)}
          >
            {<SearchIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const Teams = () => {
  const [allRanks, setAllRanks] = useState<Rank[]>([]);
  const [allTeams, setAllTeams] = useState<Team[]>([]);
  const recentRanks: Rank[] = [];
  useEffect(() => {
    RankService.getAllRanks().then((ranks) => {
      setAllRanks(ranks);
    });
    TeamService.getAllTeams().then((teams) => {
      setAllTeams(teams);
    });
  }, []);
  useEffect(() => {
    allRanks.map((teamRow) => {
      console.log(teamRow.teamId);
      RankService.getMostRecentRankByTeam(teamRow.teamId).then((recentRank) => {
        console.log(recentRank);
      });
    });
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, allRanks.length - page * rowsPerPage);
  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const headCells = [
    { id: "rank", numberic: true, label: "ELO" },
    { id: "teamPlayers", numberic: false, label: "Team Players" },
    { id: "recentMatch", numberic: true, label: "Most Recent Match" },
    { id: "details", numberic: false, label: "Details" },
  ];

  return (
    <div>
      <Typography variant="h3" style={{ marginLeft: "5rem" }}>
        Teams Page
      </Typography>
      <Paper
        style={{ marginLeft: "5rem", marginRight: "5rem", padding: "5rem" }}
      >
        <div style={{ height: "100%", width: "100%" }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={allRanks.length}
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
                {(rowsPerPage > 0
                  ? allRanks.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : allRanks
                ).map((rankTeam: any) => (
                  <TeamRow key={rankTeam.teamId} teamRow={rankTeam} />
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
      </Paper>
    </div>
  );
};

export default Teams;
