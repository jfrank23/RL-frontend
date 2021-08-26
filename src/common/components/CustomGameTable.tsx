import React from "react";
import { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import { Game } from "../models/Game";
import { Row } from "./Row";
import { createStyles, Theme, withStyles } from "@material-ui/core";

const headCells = [
  { id: "date", numberic: true, label: "Date" },
  { id: "blueTeam", numberic: false, label: "Blue Team" },
  { id: "orangeTeam", numberic: false, label: "Orange Team" },
  { id: "blueScore", numberic: true, label: "Blue Score" },
  { id: "orangeScore", numberic: true, label: "Orange Score" },
  { id: "stats", numberic: false, label: "Stats" },
];

const StyledHeader = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.success.dark,
      color: theme.palette.common.white,
      borderRight: `1px solid ${
        theme.palette.type === "light" ? "#f0f0f0" : "#303030"
      }`,
    },
  })
)(TableCell);

export function CustomGameTable(props: { game: Game[] }) {
  const allGames = props.game;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, allGames.length - page * rowsPerPage);
  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={allGames.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <TableContainer component={Paper}>
        <Table aria-label="games table">
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
              ? allGames.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : allGames
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
  );
}
