import { Button } from "@material-ui/core";
import Example from "./examplePass";

import { Fragment } from "react";
import Card from "./Card";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
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

const COLORS = ["#ff9e1f", "#217eff"];

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  table: {
    minWidth: 650,
  },
});

function createData(
  position: number,
  name: string,
  calories: string,
  fat: number,
  carbs: number,
  protein: number,
  details: number
) {
  return { position, name, calories, fat, carbs, protein, details };
}

const rows = [
  createData(1, "Lionel Messi", "Lionel Messi", 90, 15, 1880, 1),
  createData(3, "Lionel Messi", "Lionel Messi", 90, 15, 1880, 1),
  createData(4, "Lionel Messi", "Lionel Messi", 90, 15, 1880, 1),
];

const Home = () => {
  // <div>
  //   <h1>Home</h1>
  //   <Button variant="contained" color="primary">
  //     I am a button
  //   </Button>
  //   <Example input1="jordan"></Example>
  // </div>

  const classes = useStyles();
  return (
    <Fragment>
      <Container maxWidth="sm">
        <h1>Welcome</h1>
      </Container>

      <Container maxWidth="sm">
        <h2>Pie Chart</h2>
      </Container>

      <Container maxWidth="sm">
        <PieChart width={200} height={300}>
          <Pie
            data={data}
            cx={100}
            cy={100}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}

            <Label value="label" position="center" />
          </Pie>
        </PieChart>
      </Container>

      <Container maxWidth="sm">
        <h2> Leader Board</h2>
      </Container>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Position</TableCell>
              <TableCell align="right">Defense</TableCell>
              <TableCell align="right">Offense</TableCell>
              <TableCell align="right">Win Percentage</TableCell>
              <TableCell align="right">Games Played</TableCell>
              <TableCell align="right">Elo Score</TableCell>
              <TableCell align="right">Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell align="right">{row.position}</TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">{row.details}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Container maxWidth="sm">
        <h1> </h1>
      </Container>

      <Container maxWidth="sm">
        <h2>Stats</h2>
      </Container>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Card />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card />
        </Grid>
      </Grid>

      <Container maxWidth="sm">
        <h1> </h1>
      </Container>
    </Fragment>
  );
};

export default Home;
