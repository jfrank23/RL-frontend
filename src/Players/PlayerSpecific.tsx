import { DataGrid, GridRowsProp, GridColDef } from "@material-ui/data-grid";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  createStyles,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";

import { useHistory, useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";

import { CustomGameTable } from "../common/components/CustomGameTable";
import "../Teams/TeamsPage.css";

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
import { idText } from "typescript";

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

const PlayerSpecific = () => {
  const { id } = useParams() as any;
  const history = useHistory();
  const classes = teamSpecificStyles();
  const [player, setPlayer] = useState<Player>();
  const [games, setGames] = useState<Game[]>([]);
  const [teams, setTeams] = useState<Team[]>();
  const [stats, setStats] = useState<Stat[]>([]);
  const [statSummary, setStatSummary] = useState<StatSummary>();
  const [officeRanking, setOfficeRanking] = useState<OfficeRanking>();

  useEffect(() => {
    GameService.getGamesByPlayerId(id).then((games) => setGames(games));
  }, [games]);

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
        <CustomGameTable
          game={games.sort(
            (a, b) =>
              new Date(b.gameTime).getTime() - new Date(a.gameTime).getTime()
          )}
        />
        <Divider className={classes.divider} />
        <Typography variant="h4" className={classes.sectionHeading}>
          Teams
        </Typography>
      </Paper>
    </div>
  );
};

export default PlayerSpecific;
