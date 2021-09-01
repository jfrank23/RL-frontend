import { Button } from "@material-ui/core";
import Example from "./examplePass";

import SimpleCard from "./Card";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Game } from "../common/models/Game";
import { Player } from "../common/models/Player";
import { Stat } from "../common/models/Stat";
import GameService from "../common/Services/GameService";
import PlayerService from "../common/Services/PlayerService";
import StatService from "../common/Services/StatService";
import StatSummaryService from "../common/Services/StatSummaryService";
import { Fragment } from "react";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { useParams } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { DataGrid, GridColDef, GridRowsProp } from "@material-ui/data-grid";
import { makeStyles, Paper, Theme, Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { Leaderboard } from "./Leaderboard";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Label,
} from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
];

const COLORS = ["#0c88fc", "#ffa500"];

const useStyles = makeStyles((theme: Theme) => ({
  gridContainer: {
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  table: {
    minWidth: 650,
  },
  root: {
    "& .super-app-theme--header": {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },
    "& .super-app-theme--cell": {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },
    "& .MuiDataGrid-iconSeparator": {
      display: "none",
    },
    "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
      borderRight: `1px solid ${
        theme.palette.type === "light" ? "#f0f0f0" : "#303030"
      }`,
    },
    "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
      borderBottom: `1px solid ${
        theme.palette.type === "light" ? "#f0f0f0" : "#303030"
      }`,
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const { id } = useParams() as any;
  const history = useHistory();
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);
  const [allStats, setAllStats] = useState<Stat[]>([]);
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [game, setGame] = useState<Game>();
  const [innerCircle, setInnerCircle] = useState<any>();
  const [outerCircle, setOuterCircle] = useState<any>();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    PlayerService.getAllPlayers().then((players) => {
      setAllPlayers(players);
    });
    StatService.getAllStats().then((stats) => {
      setAllStats(stats);
    });
    GameService.getAllGames().then((games) => {
      setAllGames(games);
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
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <g>
        <text
          x={cx}
          y={cy - 230}
          dy={8}
          textAnchor="middle"
          fill={"#00000"}
          fontSize={25}
        >
          {"Win Percentage Per Side"}
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
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      </g>
    );
  };

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <div>
      <div>
        <Fragment>
          <Typography variant="h3" style={{ marginLeft: "5rem" }} align="left">
            Welcome
          </Typography>

          <Grid container justifyContent="space-around" alignItems="center">
            <Typography variant="h3" style={{ marginLeft: "5rem" }}>
              Pie Chart
            </Typography>
          </Grid>

          <Paper
            style={{ marginLeft: "5rem", marginRight: "5rem", padding: "5rem" }}
          >
            <Grid container justifyContent="space-around" alignItems="center">
              <Paper
                style={{
                  marginLeft: "5rem",
                  marginRight: "5rem",
                  padding: "5rem",
                }}
              >
                <PieChart width={500} height={500}>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    innerRadius={100}
                    outerRadius={180}
                    onMouseEnter={onPieEnter}
                    fill="#82ca9d"
                    paddingAngle={1}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </Paper>

              <Grid item>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      Overall:
                    </Typography>
                    <Typography variant="body2" component="p">
                      Games Played: 231
                    </Typography>
                    <Typography variant="body2" component="p">
                      Blue Wins: 124
                    </Typography>
                    <Typography variant="body2" component="p">
                      Orange Wins: 107
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>

          <Container maxWidth="sm">
            <h1> </h1>
          </Container>

          <Grid container justifyContent="space-around" alignItems="center">
            <Typography variant="h3" style={{ marginLeft: "5rem" }}>
              Leader Board
            </Typography>
          </Grid>

          <Paper
            style={{ marginLeft: "5rem", marginRight: "5rem", padding: "5rem" }}
          >
            <Leaderboard game={allGames} />
          </Paper>

          <Container maxWidth="sm">
            <h1> </h1>
          </Container>

          <Grid container justifyContent="space-around" alignItems="center">
            <Typography variant="h3" style={{ marginLeft: "5rem" }}>
              Stats
            </Typography>
          </Grid>

          <Paper
            style={{ marginLeft: "5rem", marginRight: "5rem", padding: "5rem" }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={4}>
                <SimpleCard />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <SimpleCard />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <SimpleCard />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <SimpleCard />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <SimpleCard />
              </Grid>
            </Grid>
          </Paper>

          <Container maxWidth="sm">
            <h1> </h1>
          </Container>
        </Fragment>
      </div>
    </div>
  );
};

export default Home;
