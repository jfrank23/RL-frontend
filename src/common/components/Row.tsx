import { withStyles, Theme, createStyles, makeStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import SearchIcon from "@material-ui/icons/Search";
import * as moment from "moment";
import React from "react";
import { useHistory } from "react-router-dom";

export const StyledCell = withStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRight: `1px solid ${
        theme.palette.type === "light" ? "#f0f0f0" : "#303030"
      }`,
    },
  })
)(TableCell);

export function TeamPlayers(team: any) {
  const history = useHistory();

  return (
    <React.Fragment>
      {team.team.map((player: any) => (
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

export const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "set",
    },
  },
});

export function Row(props: { row: any }) {
  const { row } = props;
  const classes = useRowStyles();
  const history = useHistory();
  let date = moment.default(row.gameTime).format("DD-MMM-YYYY HH:mm");

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
