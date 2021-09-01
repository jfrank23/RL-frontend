import {
  TablePagination,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  IconButton,
  createStyles,
  Theme,
  withStyles,
} from "@material-ui/core";
import * as moment from "moment";
import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRowStyles } from "./Row";
import { Game } from "../models/Game";
import { Team } from "../models/Team";
import GameService from "../Services/GameService";
import TeamService from "../Services/TeamService";
import SearchIcon from "@material-ui/icons/Search";
import { Rank } from "../models/Rank";

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

function TeamPlayers(team?: Team) {
  const history = useHistory();

  function refreshPage() {
    window.location.reload();
  }

  return (
    <React.Fragment>
      {team?.team.map((player: any) => (
        <div
          onClick={() => {
            history.push(`/PlayerSpecific/${player.id}`);
            refreshPage();
          }}
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
interface TeamTableInput {
  Ranks: Rank[];
}
const TeamTable = ({ Ranks }: TeamTableInput) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, Ranks.length - page * rowsPerPage);
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
    <div style={{ height: "100%", width: "100%" }}>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={Ranks.length}
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
              ? Ranks.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : Ranks
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
  );
};
export default TeamTable;
