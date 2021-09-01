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
} from "@material-ui/core";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Cell, Pie, PieChart, Sector } from "recharts";
import { Game } from "../common/models/Game";
import GameService from "../common/Services/GameService";

const gameSpecificStyles = makeStyles((theme: Theme) =>
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
    scoreContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    orangeScore: {
      border: "solid black 2.5px",
      padding: "1rem",
      color: "orange",
    },
    blueScore: {
      border: "solid black 2.5px",
      padding: "1rem",
      color: theme.palette.primary.main,
    },
    orangeText: {
      color: "orange",
    },
  })
);
const COLORS = ["#0c88fc", "#ffa500"];

const GameSpecific = () => {
  const classes = gameSpecificStyles();
  const { id } = useParams() as any;
  const [game, setGame] = useState<Game>();
  const [innerCircle, setInnerCircle] = useState<any>();
  const [outerCircle, setOuterCircle] = useState<any>();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    GameService.getGamesById(id).then((game) => {
      setGame(game);
      setInnerCircle([
        { name: "Group A", value: game.blueScore },
        { name: "Group B", value: game.redScore },
      ]);
      const blueId = game.blueTeam.team.map((player) => player.id);
      const redId = game.redTeam.team.map((player) => player.id);
      let redCount = 1;
      let blueCount = 1;
      let outerCircleData = [];
      for (let stat of game.stats) {
        if (blueId.includes(Number(stat.playerId)) && stat.goals) {
          outerCircleData.push({
            name: `A${blueCount}`,
            value: stat.goals,
            id: stat.playerId,
          });
          blueCount += 1;
        } else if (redId.includes(Number(stat.playerId)) && stat.goals) {
          outerCircleData.push({
            name: `B${redCount}`,
            value: stat.goals,
            id: stat.playerId,
          });
          redCount += 1;
        }
      }
      setOuterCircle(
        outerCircleData.sort((a, b) => (a.name > b.name ? 1 : -1))
      );
    });
  }, []);
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
    const players = game?.blueTeam.team.concat(game.redTeam.team);
    const player = players?.find((p) => p.id == payload.id);

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={"#00000"}>
          {player?.firstName}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`${payload.value}`}</text>
      </g>
    );
  };
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <div>
      <Typography variant="h3" className={classes.pageName}>
        Game Details
      </Typography>

      <Paper className={classes.paper}>
        <Typography variant="h4" className={classes.sectionHeading}>
          Score
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <div className={classes.scoreContainer}>
            <div>
              <Typography color="primary">Blue Score</Typography>
            </div>
            <div>
              <Typography className={classes.blueScore}>
                {game?.blueScore}
              </Typography>
            </div>
          </div>
          <div className={classes.scoreContainer}>
            <div>
              <Typography className={classes.orangeText}>
                Orange Score
              </Typography>
            </div>
            <div>
              <Typography className={classes.orangeScore}>
                {game?.redScore}
              </Typography>
            </div>
          </div>
        </Grid>
        <Divider className={classes.divider} />
        <Typography
          color="primary"
          variant="h4"
          className={classes.sectionHeading}
        >
          Blue Team
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          {game?.blueTeam.team.map((player) => {
            const stat = game.stats.find((stat) => stat.playerId == player.id);
            return (
              <Grid item>
                <Card>
                  <CardContent>
                    <Typography variant="h6">
                      {player.firstName} {player.lastName}
                    </Typography>
                    <Typography>
                      <b>Goals: {stat?.goals}</b>
                    </Typography>
                    <Typography>
                      <b>Assists: {stat?.assists}</b>
                    </Typography>
                    <Typography>
                      <b>Shots: {stat?.shots}</b>
                    </Typography>
                    <Typography>
                      <b>Saves: {stat?.saves} </b>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <Divider className={classes.divider} />
        <Typography
          variant="h4"
          className={clsx(classes.sectionHeading, classes.orangeText)}
        >
          Orange Team
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          {game?.redTeam.team.map((player) => {
            const stat = game.stats.find((stat) => stat.playerId == player.id);
            return (
              <Grid item>
                <Card>
                  <CardContent>
                    <Typography variant="h6">
                      {player.firstName} {player.lastName}
                    </Typography>
                    <Typography>
                      <b>Goals: {stat?.goals}</b>
                    </Typography>
                    <Typography>
                      <b>Assists: {stat?.assists}</b>
                    </Typography>
                    <Typography>
                      <b>Shots: {stat?.shots}</b>
                    </Typography>
                    <Typography>
                      <b>Saves: {stat?.saves} </b>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <Divider className={classes.divider} />
        <Typography variant="h4" className={classes.sectionHeading}>
          Goal Breakdown
        </Typography>
        <Grid container justifyContent="space-around" alignItems="center">
          <PieChart width={500} height={500}>
            <Pie
              data={innerCircle}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={90}
              fill="#8884d8"
            >
              {innerCircle?.map((entry: any, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Pie
              data={outerCircle}
              dataKey="value"
              cx="50%"
              cy="50%"
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              innerRadius={100}
              outerRadius={180}
              onMouseEnter={onPieEnter}
              fill="#82ca9d"
            >
              {outerCircle?.map((entry: any, index: number) => (
                <Cell
                  key={`cell-${index + innerCircle.length}`}
                  fill={entry.name.includes("A") ? COLORS[0] : COLORS[1]}
                />
              ))}
            </Pie>
          </PieChart>
        </Grid>
      </Paper>
    </div>
  );
};

export default GameSpecific;
