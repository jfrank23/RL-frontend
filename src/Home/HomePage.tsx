import { Grid, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, Sector } from "recharts";
import TeamTable from "../common/components/TeamsTable";
import { Game } from "../common/models/Game";
import { Player } from "../common/models/Player";
import { Rank } from "../common/models/Rank";
import { Stat } from "../common/models/Stat";
import { OfficeRanking } from "../common/models/StatSummary";
import GameService from "../common/Services/GameService";
import OfficeRankService from "../common/Services/OfficeRankingService";
import PlayerService from "../common/Services/PlayerService";
import RankService from "../common/Services/RankService";
import StatService from "../common/Services/StatService";
import StatSummaryService from "../common/Services/StatSummaryService";
import StatCard, { StatCardPlayer } from "./StatCard";

const COLORS = ["#0c88fc", "#ffa500"];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridContainer: {
      paddingLeft: "20px",
      paddingRight: "20px",
    },
    table: {
      minWidth: 650,
    },
    paper: {
      marginLeft: "5rem",
      marginRight: "5rem",
      padding: "5rem",
    },
    leaderCards: {
      marginBottom: theme.spacing(4),
    },
    sectionHeading: {
      marginBottom: theme.spacing(0),
    },
    pageName: {
      marginLeft: "5rem",
    },
  })
);

const Home = () => {
  const classes = useStyles();
  const [games, setGames] = useState<Game[]>([]);
  const [innerCircle, setInnerCircle] = useState<any>([
    { name: "Group A", value: 0 },
    { name: "Group B", value: 0 },
  ]);
  const [ranks, setRanks] = useState<Rank[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [officeRankings, setOfficeRankings] = useState<OfficeRanking[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    GameService.getAllGames().then((games) => {
      setGames(games);
      let orangeWins = 0;
      let blueWins = 0;
      for (let game of games) {
        if (game.redScore > game.blueScore) {
          orangeWins += 1;
        } else {
          blueWins += 1;
        }
      }
      setInnerCircle([
        { name: "Group A", value: blueWins },
        { name: "Group B", value: orangeWins },
      ]);
    });
  }, []);
  useEffect(() => {
    RankService.getAllTeamsRecentRanks().then((ranks) => {
      setRanks(ranks.sort((a, b) => b.rank - a.rank).slice(0, 5));
    });
    StatService.getAllStats().then((stats) => {
      setStats(stats);
    });
    PlayerService.getAllPlayers().then((players) => {
      setPlayers(players);
    });
  }, []);

  useEffect(() => {
    OfficeRankService.getAllPlayerRankings().then((rankings) =>
      setOfficeRankings(rankings)
    );
  }, [players, ranks, stats]);

  const playerIsInGame = (game: Game, playerId: number) => {
    const blueTeamId = game.blueTeam.team.map((player) => player.id);
    const redTeamId = game.redTeam.team.map((player) => player.id);
    return blueTeamId.includes(playerId) || redTeamId.includes(playerId);
  };
  const generateSummaryAndName = (
    games: Game[],
    playerIsInGame: (game: Game, playerId: number) => boolean,
    player: Player,
    stats: Stat[]
  ) => {
    const gamesInvolved = games.filter((game) =>
      playerIsInGame(game, player.id || 0)
    );
    const statsInvolved = stats.filter((stat) => stat.playerId == player.id);
    const name = `${player?.firstName} ${player?.lastName}`;
    const summary = StatSummaryService.generateSummary(
      statsInvolved,
      gamesInvolved,
      player.id || 0
    );
    return { name, summary };
  };

  const getBiggestWinner = () => {
    const rankings = [...officeRankings];
    rankings.sort((a, b) => a.summary.total.wins - b.summary.total.wins);
    let statCardData: StatCardPlayer[] = [];
    for (let rank of rankings.slice(0, 5)) {
      const player = players.find((player) => player.id == rank.id);
      if (player?.id) {
        const { name, summary } = generateSummaryAndName(
          games,
          playerIsInGame,
          player,
          stats
        );
        statCardData.push({ playerName: name, value: summary.total.wins });
      }
    }
    return statCardData;
  };
  const getTopScorer = () => {
    const rankings = [...officeRankings];
    rankings.sort((a, b) => a.summary.total.goals - b.summary.total.goals);
    let statCardData: StatCardPlayer[] = [];
    for (let rank of rankings.slice(0, 5)) {
      const player = players.find((player) => player.id == rank.id);
      if (player?.id) {
        const { name, summary } = generateSummaryAndName(
          games,
          playerIsInGame,
          player,
          stats
        );
        statCardData.push({ playerName: name, value: summary.total.goals });
      }
    }
    return statCardData;
  };
  const getTopAssists = () => {
    const rankings = [...officeRankings];
    rankings.sort((a, b) => a.summary.total.assists - b.summary.total.assists);
    let statCardData: StatCardPlayer[] = [];
    for (let rank of rankings.slice(0, 5)) {
      const player = players.find((player) => player.id == rank.id);
      if (player?.id) {
        const { name, summary } = generateSummaryAndName(
          games,
          playerIsInGame,
          player,
          stats
        );
        statCardData.push({ playerName: name, value: summary.total.assists });
      }
    }
    return statCardData;
  };
  const getTopSaves = () => {
    const rankings = [...officeRankings];
    rankings.sort((a, b) => a.summary.total.saves - b.summary.total.saves);
    let statCardData: StatCardPlayer[] = [];
    for (let rank of rankings.slice(0, 5)) {
      const player = players.find((player) => player.id == rank.id);
      if (player?.id) {
        const { name, summary } = generateSummaryAndName(
          games,
          playerIsInGame,
          player,
          stats
        );
        statCardData.push({ playerName: name, value: summary.total.saves });
      }
    }
    return statCardData;
  };
  const getTopShots = () => {
    const rankings = [...officeRankings];
    rankings.sort((a, b) => a.summary.total.shots - b.summary.total.shots);
    let statCardData: StatCardPlayer[] = [];
    for (let rank of rankings.slice(0, 5)) {
      const player = players.find((player) => player.id == rank.id);
      if (player?.id) {
        const { name, summary } = generateSummaryAndName(
          games,
          playerIsInGame,
          player,
          stats
        );
        statCardData.push({ playerName: name, value: summary.total.shots });
      }
    }
    return statCardData;
  };
  const getTopPoints = () => {
    const rankings = [...officeRankings];
    rankings.sort((a, b) => a.summary.total.points - b.summary.total.points);
    let statCardData: StatCardPlayer[] = [];
    for (let rank of rankings.slice(0, 5)) {
      const player = players.find((player) => player.id == rank.id);
      if (player?.id) {
        const { name, summary } = generateSummaryAndName(
          games,
          playerIsInGame,
          player,
          stats
        );
        statCardData.push({ playerName: name, value: summary.total.points });
      }
    }
    return statCardData;
  };

  const getAvgScorer = () => {
    const rankings = [...officeRankings];
    rankings.sort((a, b) => a.summary.average.goals - b.summary.average.goals);
    let statCardData: StatCardPlayer[] = [];
    for (let rank of rankings.slice(0, 5)) {
      const player = players.find((player) => player.id == rank.id);
      if (player?.id) {
        const { name, summary } = generateSummaryAndName(
          games,
          playerIsInGame,
          player,
          stats
        );
        statCardData.push({ playerName: name, value: summary.average.goals });
      }
    }
    return statCardData;
  };
  const getAvgAssists = () => {
    const rankings = [...officeRankings];
    rankings.sort(
      (a, b) => a.summary.average.assists - b.summary.average.assists
    );
    let statCardData: StatCardPlayer[] = [];
    for (let rank of rankings.slice(0, 5)) {
      const player = players.find((player) => player.id == rank.id);
      if (player?.id) {
        const { name, summary } = generateSummaryAndName(
          games,
          playerIsInGame,
          player,
          stats
        );
        statCardData.push({ playerName: name, value: summary.average.assists });
      }
    }
    return statCardData;
  };
  const getAvgSaves = () => {
    const rankings = [...officeRankings];
    rankings.sort((a, b) => a.summary.average.saves - b.summary.average.saves);
    let statCardData: StatCardPlayer[] = [];
    for (let rank of rankings.slice(0, 5)) {
      const player = players.find((player) => player.id == rank.id);
      if (player?.id) {
        const { name, summary } = generateSummaryAndName(
          games,
          playerIsInGame,
          player,
          stats
        );
        statCardData.push({ playerName: name, value: summary.average.saves });
      }
    }
    return statCardData;
  };
  const getAvgShots = () => {
    const rankings = [...officeRankings];
    rankings.sort((a, b) => a.summary.average.shots - b.summary.average.shots);
    let statCardData: StatCardPlayer[] = [];
    for (let rank of rankings.slice(0, 5)) {
      const player = players.find((player) => player.id == rank.id);
      if (player?.id) {
        const { name, summary } = generateSummaryAndName(
          games,
          playerIsInGame,
          player,
          stats
        );
        statCardData.push({ playerName: name, value: summary.average.shots });
      }
    }
    return statCardData;
  };
  const getAvgPoints = () => {
    const rankings = [...officeRankings];
    rankings.sort(
      (a, b) => a.summary.average.points - b.summary.average.points
    );
    let statCardData: StatCardPlayer[] = [];
    for (let rank of rankings.slice(0, 5)) {
      const player = players.find((player) => player.id == rank.id);
      if (player?.id) {
        const { name, summary } = generateSummaryAndName(
          games,
          playerIsInGame,
          player,
          stats
        );
        statCardData.push({ playerName: name, value: summary.average.points });
      }
    }
    return statCardData;
  };

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`Wins: ${value}`}</text>
      </g>
    );
  };

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <div>
      <Typography variant="h3" className={classes.pageName}>
        Welcome to Rocket League Stats
      </Typography>
      <Paper className={classes.paper}>
        <Grid
          container
          justifyContent="space-around"
          alignItems="center"
          direction="column"
        >
          <Typography className={classes.sectionHeading} variant="h4">
            Wins Per Team Color
          </Typography>
          <PieChart width={500} height={500}>
            <Pie
              data={innerCircle}
              cx="50%"
              cy="50%"
              innerRadius={100}
              outerRadius={180}
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              onMouseEnter={onPieEnter}
              fill="#8884d8"
              paddingAngle={1}
              dataKey="value"
              label
            >
              {innerCircle?.map((entry: any, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </Grid>

        <Typography className={classes.sectionHeading} variant="h4">
          Leaderboard
        </Typography>

        <TeamTable Ranks={ranks} />
        <br />

        <Grid container>
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            className={classes.leaderCards}
          >
            <StatCard category="Wins" listItems={getBiggestWinner()}></StatCard>
            <StatCard
              category="Total Points"
              listItems={getTopPoints()}
            ></StatCard>
            <StatCard
              category="Average Points"
              listItems={getAvgPoints()}
            ></StatCard>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            className={classes.leaderCards}
          >
            <StatCard
              category="Total Goals"
              listItems={getTopScorer()}
            ></StatCard>
            <StatCard
              category="Total Assists"
              listItems={getTopAssists()}
            ></StatCard>
            <StatCard
              category="Total Saves"
              listItems={getTopSaves()}
            ></StatCard>
            <StatCard
              category="Total Shots"
              listItems={getTopShots()}
            ></StatCard>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            className={classes.leaderCards}
          >
            <StatCard
              category="Average Goals"
              listItems={getAvgScorer()}
            ></StatCard>
            <StatCard
              category="Average Assists"
              listItems={getAvgAssists()}
            ></StatCard>
            <StatCard
              category="Average Shots"
              listItems={getAvgShots()}
            ></StatCard>
            <StatCard
              category="Average Saves"
              listItems={getAvgSaves()}
            ></StatCard>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Home;
