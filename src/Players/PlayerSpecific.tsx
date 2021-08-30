import React from "react";
import {
  Card,
  CardContent,
  createStyles,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
  withStyles,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CustomGameTable } from "../common/components/CustomGameTable";
import "../Teams/TeamsPage.css";
import * as moment from "moment";
import SearchIcon from "@material-ui/icons/Search";
import { Rank } from "../common/models/Rank";
import { Player } from "../common/models/Player";
import { Team } from "../common/models/Team";
import { Game } from "../common/models/Game";
import { Stat } from "../common/models/Stat";
import { OfficeRanking, StatSummary } from "../common/models/StatSummary";
import PlayerService from "../common/Services/PlayerService";
import TeamService from "../common/Services/TeamService";
import GameService from "../common/Services/GameService";
import OfficeRankService from "../common/Services/OfficeRankingService";
import StatService from "../common/Services/StatService";
import StatSummaryService from "../common/Services/StatSummaryService";
import RankService from "../common/Services/RankService";

const teamSpecificStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    paper: {
      marginLeft: "5rem",
      marginRight: "5rem",
      padding: "5rem",
    },
    divider: {
      margin: "3rem 0rem",
    },
    sectionHeading: {
      marginBottom: theme.spacing(4),
    },
    pageName: {
      marginLeft: "5rem",
    },
    txtlink: {
      color: "blue",
      textDecoration: "none",
      cursor: "pointer",
    },
    nameContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
    },
  })
);

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
//------------------Teams Table---------------------------

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

// game row
export function Row(props: { row: any }) {
  const { row } = props;
  const classes = useRowStyles();
  const history = useHistory();
  let date = moment.default(row.gameTime).format("MMM DD,YYYY hh:mm a");

  return (
    <React.Fragment>
      <TableRow hover key={row.teamId} className={classes.root}>
        <StyledCell align="center" component="th" scope="row">
          {date}
        </StyledCell>
        <StyledCell align="center">{TeamPlayers(row.blueTeam)}</StyledCell>
        <StyledCell align="center">{TeamPlayers(row.redTeam)}</StyledCell>
        <StyledCell align="center">{row.blueScore}</StyledCell>
        <StyledCell align="center">{row.redScore}</StyledCell>
        <TableCell align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => history.push(`/games/${row.id}`)}
          >
            {<SearchIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

//--------------Driver fucntion --------------------
const PlayerSpecific = () => {
  const { id } = useParams() as any;
  const history = useHistory();
  const classes = teamSpecificStyles();
  const [player, setPlayer] = useState<Player>();
  const [games, setGames] = useState<Game[]>([]);
  const [teams, setTeams] = useState<Team[]>();
  const [stats, setStats] = useState<Stat[]>([]);
  const [Ranks, setRanks] = useState<Rank[]>([]);
  const [statSummary, setStatSummary] = useState<StatSummary>();
  const [officeRanking, setOfficeRanking] = useState<OfficeRanking>();
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

  useEffect(() => {
    GameService.getGamesByPlayerId(id).then((games) => setGames(games));
  }, [games]);

  useEffect(() => {
    RankService.getPlayerTeamsRecentRanks(id).then((ranks) => {
      setRanks(ranks.sort((a, b) => b.rank - a.rank));
    });
  }, []);

  useEffect(() => {
    TeamService.getTeamsByPlayerId(id).then((teams) => setTeams(teams));
  }, [teams]);

  useEffect(() => {
    PlayerService.getPlayerById(id).then((player) => setPlayer(player));
  }, []);

  useEffect(() => {
    if (player?.id) {
      StatService.getStatsByPlayer(player).then((stats) => setStats(stats));
    }
  }, [player]);

  useEffect(() => {
    if (player?.id && games.length && stats.length) {
      setStatSummary(
        StatSummaryService.generateSummary(stats, games, player.id)
      );
      OfficeRankService.getPlayerRanking(player.id).then((ranking) =>
        setOfficeRanking(ranking)
      );
    }
  }, [games, stats]);

  const headCells = [
    { id: "rank", numberic: true, label: "ELO" },
    { id: "teamPlayers", numberic: false, label: "Team Players" },
    { id: "recentMatch", numberic: true, label: "Most Recent Match" },
    { id: "details", numberic: false, label: "Details" },
  ];

  const gameHeadCells = [
    { id: "date", numberic: true, label: "Date" },
    { id: "blueTeam", numberic: false, label: "Blue Team" },
    { id: "orangeTeam", numberic: false, label: "Orange Team" },
    { id: "blueScore", numberic: true, label: "Blue Score" },
    { id: "orangeScore", numberic: true, label: "Orange Score" },
    { id: "stats", numberic: false, label: "Stats" },
  ];

  return (
    <div>
      <Typography variant="h3" className={classes.pageName}>
        {player?.firstName} {player?.lastName}
      </Typography>
      <Paper className={classes.paper}>
        <Typography variant="h4" className={classes.sectionHeading}>
          Player Stats
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid item>
            <Card>
              <CardContent>
                <Typography variant="h6">Record</Typography>
                <Typography>
                  <b>Games Played:</b> {statSummary?.total.gamesPlayed}
                </Typography>
                <Typography>
                  <b>Games Won:</b> {statSummary?.total.wins}
                </Typography>
                <Typography>
                  <b>Games Lost:</b> {statSummary?.total.losses}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card>
              <CardContent>
                <Typography variant="h6">Stats (Totals)</Typography>
                <Typography>
                  <b>Goals Scored:</b> {statSummary?.total.goals}
                </Typography>
                <Typography>
                  <b>Assists:</b> {statSummary?.total.assists}
                </Typography>
                <Typography>
                  <b>Shots:</b> {statSummary?.total.shots}
                </Typography>
                <Typography>
                  <b>Saves:</b> {statSummary?.total.saves}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card>
              <CardContent>
                <Typography variant="h6">Stats (Avg)</Typography>
                <Typography>
                  <b>Goals Scored:</b> {statSummary?.average.goals.toFixed(2)}
                </Typography>
                <Typography>
                  <b>Assists:</b> {statSummary?.average.assists.toFixed(2)}
                </Typography>
                <Typography>
                  <b>Shots:</b> {statSummary?.average.shots.toFixed(2)}
                </Typography>
                <Typography>
                  <b>Saves:</b> {statSummary?.average.saves.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card>
              <CardContent>
                <Typography variant="h6">Office Ranking (Total)</Typography>
                <Typography>
                  <b>Goals Scored:</b> {officeRanking?.summary.total.goals}
                </Typography>
                <Typography>
                  <b>Assists:</b> {officeRanking?.summary.total.assists}
                </Typography>
                <Typography>
                  <b>Shots:</b> {officeRanking?.summary.total.shots}
                </Typography>
                <Typography>
                  <b>Saves:</b> {officeRanking?.summary.total.saves}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card>
              <CardContent>
                <Typography variant="h6">Office Ranking (Avg)</Typography>
                <Typography>
                  <b>Goals Scored:</b> {officeRanking?.summary.average.goals}
                </Typography>
                <Typography>
                  <b>Assists:</b> {officeRanking?.summary.average.assists}
                </Typography>
                <Typography>
                  <b>Shots:</b> {officeRanking?.summary.average.shots}
                </Typography>
                <Typography>
                  <b>Saves:</b> {officeRanking?.summary.average.saves}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Typography variant="h4" className={classes.sectionHeading}>
          Games Played
        </Typography>
        <div style={{ height: "100%", width: "100%" }}>
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
            <Table aria-label="games table">
              <TableHead>
                <TableRow key="header">
                  {gameHeadCells.map((headCell) => (
                    <StyledHeader align="center" key={headCell.id}>
                      {headCell.label}
                    </StyledHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? games.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : games
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
        <Divider className={classes.divider} />
        <Typography variant="h4" className={classes.sectionHeading}>
          Teams
        </Typography>
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
      </Paper>
    </div>
  );
};

export default PlayerSpecific;
