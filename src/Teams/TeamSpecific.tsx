import {
  Card,
  CardContent,
  CardHeader,
  createStyles,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Game } from "../common/models/Game";
import { Rank } from "../common/models/Rank";
import { Stat } from "../common/models/Stat";
import { OfficeRanking, StatSummary } from "../common/models/StatSummary";
import { Team } from "../common/models/Team";
import GameService from "../common/Services/GameService";
import OfficeRankService from "../common/Services/OfficeRankingService";
import RankService from "../common/Services/RankService";
import StatService from "../common/Services/StatService";
import StatSummaryService from "../common/Services/StatSummaryService";
import TeamService from "../common/Services/TeamService";
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

const TeamSpecific = () => {
  const classes = teamSpecificStyles();
  const history = useHistory();
  const { id } = useParams() as any;
  const [team, setTeam] = useState<Team>();
  const [games, setGames] = useState<Game[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [statSummary, setStatSummary] = useState<StatSummary>();
  const [officeRanking, setOfficeRanking] = useState<OfficeRanking>();
  const [ranks, setRanks] = useState<Rank[]>([]);

  useEffect(() => {
    TeamService.getTeamById(id).then((team) => setTeam(team));
  }, []);
  useEffect(() => {
    if (team?.id) {
      GameService.getGamesByTeam(team.id).then((games) => setGames(games));
      StatService.getStatsByTeam(team).then((stats) => setStats(stats));
      RankService.getRanksByTeam(team.id).then((ranks) => setRanks(ranks));
    }
  }, [team]);

  useEffect(() => {
    if (team?.id && games.length && stats.length && ranks.length) {
      setStatSummary(StatSummaryService.generateSummary(stats, games, team.id));
      OfficeRankService.getTeamRanking(team.id).then((ranking) =>
        setOfficeRanking(ranking)
      );
    }
  }, [games, stats, ranks]);

  return (
    <div>
      <Typography variant="h3" className={classes.pageName}>
        Team Details
      </Typography>
      <Paper className={classes.paper}>
        <Typography variant="h4" className={classes.sectionHeading}>
          Players
        </Typography>
        <div>
          {team?.team.map((player) => {
            return (
              <Typography
                variant="h6"
                onClick={() => history.push(`/playerSpecific/${player.id}`)}
                className={classes.txtlink}
              >
                {player.firstName} {player.lastName}
              </Typography>
            );
          })}
        </div>
        <Divider className={classes.divider} />
        <Typography variant="h4" className={classes.sectionHeading}>
          Team Stats
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
                <Typography variant="h6">Stats (Averages)</Typography>
                <Typography>
                  <b>Goals Scored:</b> {statSummary?.average.goals}
                </Typography>
                <Typography>
                  <b>Assists:</b> {statSummary?.average.assists}
                </Typography>
                <Typography>
                  <b>Shots:</b> {statSummary?.average.shots}
                </Typography>
                <Typography>
                  <b>Saves:</b> {statSummary?.average.saves}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <div>
          <Typography variant="h4" className={classes.sectionHeading}>
            Elo Rank
          </Typography>
        </div>
        <h2>Games Played:</h2>
      </Paper>
    </div>
  );
};

export default TeamSpecific;
